const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-api-key': 'klO5E53y2Y7FuibOUexNL4dBDMk7B6ko8uskWNHG',
};

export async function renderAsset(jsonBody) {
  const response = await fetch('https://api.shotstack.io/stage/render', {
    method: 'POST',
    body: jsonBody,
    headers: headers,
  });
  return response.json();
}

export async function checkRenderStatus(renderId) {
  const response = await fetch(
    'https://api.shotstack.io/stage/render/' + renderId,
    { method: 'GET', headers: headers }
  );
  return response.json();
}

export async function getAsset(renderId) {
  const response = await fetch(
    'https://api.shotstack.io/serve/stage/assets/render/' + renderId,
    {
      method: 'GET',
      headers: headers,
    }
  );
  return response.json();
}
