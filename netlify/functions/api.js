exports.handler = async (event) => {
  const API_KEY = process.env.API_KEY;
  const API_HOST = "v3.football.api-sports.io";

  const path = event.queryStringParameters?.path;
  if (!path) return { statusCode: 400, body: JSON.stringify({ error: "Missing path" }) };

  const url = `https://${API_HOST}${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const text = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        status: res.status,
        ok: res.ok,
        raw: text.slice(0, 500)
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: err.message })
    };
  }
};
