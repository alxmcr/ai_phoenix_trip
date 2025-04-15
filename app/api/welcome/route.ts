import '@/envConfig.ts'

const env = process.env.NODE_ENV || 'development';

export async function GET() {

  const message = "Welcome to the API!";

  return new Response(JSON.stringify({ env,   message }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}