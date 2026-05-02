exports.handler = async (event) => {
  const API_KEY = process.env.API_KEY;
  const API_HOST = "v3.football.api-sports.io";

  const params = event.queryStringParameters || {};
  const endpoint = params.endpoint;
  if (!endpoint) return { statusCode: 400, body: JSON.stringify({ error: "Missing endpoint" }) };

  delete params.endpoint;
  const qs = new URLSearchParams(params).toString();
  const url = `https://${API_HOST}/v3/${endpoint}${qs ? "?" + qs : ""}`;

  try {
    const res = await fetch(url, {
      headers: { "x-apisports-key": API_KEY }
    });
    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
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
