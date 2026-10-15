const modal=document.querySelector('#reservation'),select=document.querySelector('#function-select'),form=document.querySelector('#request'),status=document.querySelector('#mail-status'),submit=form.querySelector('[type="submit"]');
let requestId=null,received=false;
document.querySelectorAll('[data-reserve]').forEach(button=>button.addEventListener('click',()=>{if(received){form.reset();submit.disabled=false;received=false;requestId=null;}select.selectedIndex=button.dataset.reserve==='sol'?0:button.dataset.reserve==='general'?4:2;status.textContent='';status.className='';modal.showModal();}));
document.querySelector('.close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close();}});
form.addEventListener('input',()=>{if(!received)requestId=null;});
form.addEventListener('submit',async event=>{
  event.preventDefault();if(submit.disabled)return;
  const f=new FormData(form);requestId ||= crypto.randomUUID();
  const data=Object.fromEntries(f);data.id=requestId;data.estudiantes=Number(f.get('estudiantes'));data.acompanantes=Number(f.get('acompanantes'));
  submit.disabled=true;submit.textContent='Enviando…';status.className='';status.textContent='Guardando tu solicitud…';
  try{
    const response=await fetch('/api/solicitudes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const result=await response.json();
    if(!response.ok||!result.ok)throw new Error(result.error||'No se pudo guardar tu solicitud. Intenta nuevamente.');
    received=true;status.className='success';status.textContent=`¡Solicitud recibida!\nReferencia: ${result.reference}\nProducción coordinará contigo para confirmar la función. Gracias por acercar a tus estudiantes al teatro.`;submit.textContent='Solicitud enviada ✓';status.focus();
  }catch(error){status.className='error';status.textContent=error.message==='Failed to fetch'?'No hay conexión. Revisa tu internet y vuelve a intentar.':error.message;submit.disabled=false;submit.textContent='Enviar solicitud ↗';status.focus();}
});
