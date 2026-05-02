exports.handler = async (event) => {
  const API_KEY = "5a461ea9d5977e661177d550e671c60f";
  const API_HOST = "api-football-v1.p.rapidapi.com";

  const path = event.queryStringParameters?.path;
  if (!path) return { statusCode: 400, body: "Missing path" };

  const url = `https://${API_HOST}${path}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST
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
