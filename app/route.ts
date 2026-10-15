import siteHtml from './site-content';
export async function GET() {
  return new Response(siteHtml, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=60' } });
}
