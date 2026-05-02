exports.handler = async (event) => {
  const API_KEY = process.env.API_KEY;
  const API_HOST = "v3.football.api-sports.io";

  const params = { ...(event.queryStringParameters || {}) };
  const endpoint = params.endpoint;
  if (!endpoint) return { 
    statusCode: 200, 
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify({ error: "Missing endpoint", received: params }) 
  };

  delete params.endpoint;
  const qs = new URLSearchParams(params).toString();
  const url = `https://${API_HOST}/${endpoint}${qs ? "?" + qs : ""}`;

  try {
    const res = await fetch(url, {
      headers: { "x-apisports-key": API_KEY }
    });
    const text = await res.text();

    // Debug: return the URL and first 300 chars of response
    if (text.includes("<!doctype") || text.includes("404")) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ debug_url: url, http_status: res.status, raw: text.slice(0, 300) })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
