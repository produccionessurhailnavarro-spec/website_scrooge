export const ownerEmail = 'producciones.surhailnavarro@gmail.com';
export function isOwner(headers) {
  return Boolean(headers.get('oai-authenticated-user-id')) && headers.get('oai-authenticated-user-email')?.toLowerCase() === ownerEmail;
}
export const performances = [
  'Teatro El Sol · 2 de diciembre de 2026 · consultar horario',
  'Teatro El Sol · 3 de diciembre de 2026 · consultar horario',
  'Teatro Balboa · 9 de diciembre de 2026 · 9:00 a. m.',
  'Teatro Balboa · 10 de diciembre de 2026 · 9:00 a. m.',
  'Consulta general',
];
export function validateRequest(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Completa los datos del formulario.');
  if (data.website) throw new Error('No se pudo procesar la solicitud.');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.id || '')) throw new Error('Vuelve a abrir el formulario e intenta nuevamente.');
  const limits = { escuela: [1,180], nombre: [1,120], telefono: [7,40], email:[5,254], comentarios:[0,2000] };
  const clean = { id: data.id };
  for(const [key,[min,max]] of Object.entries(limits)) {
    if (typeof data[key] !== 'string') throw new Error('Revisa los datos del formulario.');
    clean[key]=data[key].trim();
    if(clean[key].length<min || clean[key].length>max) throw new Error('Revisa los campos y la longitud de los comentarios.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) throw new Error('Escribe un correo electrónico válido.');
  if (!/^[+()\d\s.\-]+$/.test(clean.telefono)) throw new Error('Escribe un teléfono válido.');
  if (!performances.includes(data.funcion)) throw new Error('Selecciona una función del listado.');
  clean.funcion=data.funcion;
  for(const [key,min,max] of [['estudiantes',1,5000],['acompanantes',0,1000]]) {
    if(typeof data[key]!=='number'||!Number.isInteger(data[key])||data[key]<min||data[key]>max) throw new Error('Revisa la cantidad de estudiantes y acompañantes.');
    clean[key]=data[key];
  }
  return clean;
}
export function escapeHtml(value) { return String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
export function csvCell(value) {let s=String(value??'');if(/^[\s]*[=+@\-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
