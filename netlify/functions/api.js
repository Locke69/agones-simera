exports.handler = async (event) => {
  const koula = process.env.koula;
  const API_HOST = "v3.football.api-sports.io";

  const path = event.queryStringParameters?.path;
  if (!path) return { statusCode: 400, body: "Missing path" };

  const url = `https://${API_HOST}${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        "x-apisports-key": koula
      }
    });
    const data = await res.text();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
