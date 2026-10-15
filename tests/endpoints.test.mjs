import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import {DatabaseSync} from 'node:sqlite';
import {performances} from '../lib/requests.mjs';
const sqlite=new DatabaseSync(':memory:');
sqlite.exec(await fs.readFile(new URL('../drizzle/0000_magenta_jocasta.sql',import.meta.url),'utf8'));
globalThis.__testEnv={DB:{prepare(sql){let args=[];return {bind(...values){args=values;return this;},async run(){return sqlite.prepare(sql).run(...args);},async all(){return {results:sqlite.prepare(sql).all(...args)};},async first(){return sqlite.prepare(sql).get(...args);}};}}};
async function loadRoute(path){
  let source=await fs.readFile(new URL(path,import.meta.url),'utf8');
  source=source.replace("import { env } from 'cloudflare:workers';",'const env=globalThis.__testEnv;');
  source=source.replace(/from '\.\.\/.*?lib\/requests\.mjs'/,`from '${new URL('../lib/requests.mjs',import.meta.url).href}'`);
  const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}});
  return import('data:text/javascript;base64,'+Buffer.from(outputText).toString('base64'));
}
const api=await loadRoute('../app/api/solicitudes/route.ts');
const admin=await loadRoute('../app/solicitudes/route.ts');
const url='https://example.test';
const owner={'oai-authenticated-user-id':'trusted-test-owner','oai-authenticated-user-email':'producciones.surhailnavarro@gmail.com'};
test('persist request, retry without duplicate, private dashboard and CSV',async()=>{
  const data={id:crypto.randomUUID(),escuela:'<script>Escuela de prueba</script>',nombre:'=FORMULA',telefono:'939-000-0000',email:'test@example.com',funcion:performances[0],estudiantes:20,acompanantes:1,comentarios:'Notas de prueba',website:''};
  const post=()=>api.POST(new Request(url+'/api/solicitudes',{method:'POST',headers:{Origin:url,'Content-Type':'application/json'},body:JSON.stringify(data)}));
  assert.equal((await post()).status,201);assert.equal((await post()).status,201);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM school_requests').get().n,1);
  assert.equal((await api.GET(new Request(url+'/api/solicitudes'))).status,403);
  const csv=await api.GET(new Request(url+'/api/solicitudes',{headers:owner}));assert.equal(csv.status,200);assert.match(await csv.text(),/"'=FORMULA"/);
  const anonymous=await admin.GET(new Request(url+'/solicitudes'));assert.equal(anonymous.status,302);assert.match(anonymous.headers.get('location'),/signin-with-chatgpt/);
  assert.equal((await admin.GET(new Request(url+'/solicitudes',{headers:{...owner,'oai-authenticated-user-email':'other@example.com'}}))).status,403);
  const page=await admin.GET(new Request(url+'/solicitudes',{headers:owner}));const html=await page.text();assert.equal(page.status,200);assert.ok(html.includes('&lt;script&gt;Escuela de prueba&lt;/script&gt;'));assert.ok(html.includes('20 estudiantes'));
  const invalid=await api.POST(new Request(url+'/api/solicitudes',{method:'POST',headers:{Origin:url,'Content-Type':'application/json'},body:JSON.stringify({...data,estudiantes:0})}));assert.equal(invalid.status,400);
  const crossOrigin=await api.POST(new Request(url+'/api/solicitudes',{method:'POST',headers:{Origin:'https://other.test','Content-Type':'application/json'},body:JSON.stringify(data)}));assert.equal(crossOrigin.status,403);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM school_requests').get().n,1);
  sqlite.close();
});
