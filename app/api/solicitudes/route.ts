import { env } from 'cloudflare:workers';
import { validateRequest, isOwner, csvCell } from '../../../lib/requests.mjs';
export const dynamic = 'force-dynamic';
const privateHeaders = { 'Cache-Control':'no-store' };
function json(data:unknown,status=200){return Response.json(data,{status,headers:privateHeaders});}
export async function POST(request:Request) {
  if(request.headers.get('origin')!==new URL(request.url).origin) return json({error:'Abre el formulario desde nuestra página.'},403);
  if(!request.headers.get('content-type')?.startsWith('application/json')) return json({error:'Formato no válido.'},415);
  if(Number(request.headers.get('content-length')||0)>12000) return json({error:'La solicitud es demasiado extensa.'},413);
  let data;
  try { const body=await request.text(); if(body.length>12000)return json({error:'La solicitud es demasiado extensa.'},413);data=validateRequest(JSON.parse(body)); }
  catch(error){return json({error:error instanceof Error?error.message:'Revisa el formulario.'},400);}
  try {
    if(!env.DB)throw new Error('Missing DB');
    await env.DB.prepare('INSERT INTO school_requests (id, created_at, school, contact, phone, email, performance, students, companions, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING')
      .bind(data.id,new Date().toISOString(),data.escuela,data.nombre,data.telefono,data.email,data.funcion,data.estudiantes,data.acompanantes,data.comentarios).run();
    return json({ok:true,reference:data.id},201);
  }catch{ return json({error:'No se pudo guardar tu solicitud. Intenta nuevamente o llama al 939-207-1580.'},503); }
}
export async function GET(request:Request) {
  if(!isOwner(request.headers))return json({error:'Acceso exclusivo de producción.'},403);
  try {
    if(!env.DB)throw new Error('Missing DB');
    const rows=(await env.DB.prepare('SELECT * FROM school_requests ORDER BY created_at DESC LIMIT 5000').all()).results;
    const columns=['id','created_at','school','contact','phone','email','performance','students','companions','comments'];
    const labels=['Referencia','Fecha UTC','Escuela','Contacto','Teléfono','Correo','Función','Estudiantes','Acompañantes','Comentarios'];
    const csv='\uFEFF'+[labels.map(csvCell).join(','),...rows.map(row=>columns.map(key=>csvCell(row[key])).join(','))].join('\r\n');
    return new Response(csv,{headers:{...privateHeaders,'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="solicitudes-escolares.csv"'}});
  } catch{return json({error:'No se pudo cargar el registro.'},503);}
}
