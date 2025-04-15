export async function GET(request: Request) {

  const message = "Welcome to the API!";

  return new Response(JSON.stringify({ message }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}