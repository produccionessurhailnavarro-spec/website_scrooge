import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateRequest,isOwner,escapeHtml,csvCell,performances} from '../lib/requests.mjs';
const good={id:'cb52041f-2a3c-4091-8529-d035d4c34f2e',escuela:' Escuela de prueba ',nombre:'Contacto',telefono:'939-000-0000',email:'contacto@example.com',funcion:performances[0],estudiantes:20,acompanantes:1,comentarios:'',website:''};
test('accepts valid request and normalizes strings',()=>assert.equal(validateRequest(good).escuela,'Escuela de prueba'));
test('rejects invalid fields, unknown performance, spam and counts',()=>{for(const change of [{email:'bad'},{estudiantes:0},{estudiantes:1.5},{acompanantes:-1},{funcion:'unknown'},{website:'spam'},{id:'x'},{comentarios:'x'.repeat(2001)},{telefono:'abc'},{escuela:''}])assert.throws(()=>validateRequest({...good,...change}));});
test('rejects anonymous and other accounts from private record',()=>{assert.equal(isOwner(new Headers()),false);assert.equal(isOwner(new Headers({'oai-authenticated-user-id':'someone','oai-authenticated-user-email':'other@example.com'})),false);assert.equal(isOwner(new Headers({'oai-authenticated-user-id':'owner','oai-authenticated-user-email':'producciones.surhailnavarro@gmail.com'})),true);});
test('escapes stored text and protects CSV against spreadsheet formulas',()=>{assert.equal(escapeHtml('<script>"'), '&lt;script&gt;&quot;');assert.equal(csvCell('=HYPERLINK("x")'),'"\'=HYPERLINK(""x"")"');});
