export async function GET(url: string) {
  const response = await fetch(url, {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }

  return response.json();
}
