const API = '/api';
const state = { token: sessionStorage.getItem('access_token'), user: JSON.parse(sessionStorage.getItem('user') || 'null'), authMode: 'login' };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const labels = {pending:'Жаңа өтінім',confirmed:'Расталды',in_transit:'Жолда',delivered:'Жеткізілді',cancelled:'Бас тартылды'};
let toastTimer;
function toast(message, error=false){const el=$('#toast');el.textContent=message;el.style.background=error?'#9d3e3e':'#20384b';el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3200);}
function escapeHtml(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
async function api(path, options={}){
  const headers={'Content-Type':'application/json',...(options.headers||{})};
  if(state.token) headers.Authorization=`Bearer ${state.token}`;
  const response=await fetch(`${API}${path}`,{...options,headers});
  let data={};try{data=await response.json();}catch{}
  if(!response.ok){if(response.status===401&&state.token){logout(false);}throw new Error(data.detail||`HTTP ${response.status}`);}
  return data;
}
function saveSession(data){state.token=data.access_token;state.user=data.user;sessionStorage.setItem('access_token',state.token);sessionStorage.setItem('user',JSON.stringify(state.user));renderSession();}
function logout(show=true){state.token=null;state.user=null;sessionStorage.removeItem('access_token');sessionStorage.removeItem('user');renderSession();if(show)toast('Жүйеден шықтыңыз');}
function renderSession(){const logged=!!state.user;$('#loginOpen').classList.toggle('hidden',logged);$('#registerOpen').classList.toggle('hidden',logged);$('#requestGuest').classList.toggle('hidden',logged);$('#requestForm').classList.toggle('hidden',!logged);$('#account').classList.toggle('hidden',!logged);$('#admin').classList.toggle('hidden',!logged||state.user.role!=='admin');if(logged){$('#loginOpen').textContent=state.user.full_name.split(' ')[0];$('#loginOpen').classList.remove('hidden');$('#registerOpen').classList.add('hidden');loadMyRequests();if(state.user.role==='admin')loadAdminRequests();}}
function openAuth(mode){state.authMode=mode;const register=mode==='register';$('#authModal').classList.remove('hidden');$('#modalTitle').textContent=register?'Тіркелу':'Жүйеге кіру';$('#authSubmit').textContent=register?'Тіркелу':'Кіру';$('#registerNameWrap').classList.toggle('hidden',!register);$('#registerPhoneWrap').classList.toggle('hidden',!register);$('#authForm [name=full_name]').required=register;$('#authForm [name=phone]').required=register;$('#authSwitch').innerHTML=register?'Аккаунтыңыз бар ма? <button type="button" id="switchAuth">Кіру</button>':'Аккаунтыңыз жоқ па? <button type="button" id="switchAuth">Тіркелу</button>';$('#switchAuth').addEventListener('click',()=>openAuth(register?'login':'register'));$('#authForm').reset();}
function closeAuth(){$('#authModal').classList.add('hidden');}
async function submitAuth(event){event.preventDefault();const form=new FormData(event.currentTarget);const payload={email:form.get('email'),password:form.get('password')};const endpoint=state.authMode==='register'?'/auth/register':'/auth/login';if(state.authMode==='register'){payload.full_name=form.get('full_name');payload.phone=form.get('phone');}try{const result=await api(endpoint,{method:'POST',body:JSON.stringify(payload)});saveSession(result);closeAuth();toast(state.authMode==='register'?'Тіркелу сәтті аяқталды':'Сәтті кірдіңіз');}catch(error){toast(error.message==='email_already_registered'?'Бұл email тіркелген':error.message,true);}}
function requestCard(item,admin=false){const details=`<div><h3>${escapeHtml(item.request_number)} · ${escapeHtml(item.origin)} → ${escapeHtml(item.destination)}</h3><p>${escapeHtml(item.cargo_type)} · ${escapeHtml(item.weight_kg)} кг · ${escapeHtml(item.transport_date)}</p><p>${admin?`Клиент: ${escapeHtml(item.customer_name||'')} · `:''}Телефон: ${escapeHtml(item.phone)}</p>${item.comment?`<p>${escapeHtml(item.comment)}</p>`:''}${item.admin_note?`<p>Әкімші ескертпесі: ${escapeHtml(item.admin_note)}</p>`:''}</div>`;if(!admin)return `<article class="request-item">${details}<div class="request-controls"><span class="status ${item.status}">${labels[item.status]||item.status}</span>${['pending','confirmed'].includes(item.status)?`<button class="btn btn-outline" data-cancel="${item.id}">Бас тарту</button>`:''}</div></article>`;return `<article class="request-item">${details}<div class="request-controls"><span class="status ${item.status}">${labels[item.status]||item.status}</span><select data-status="${item.id}"><option value="">Мәртебені өзгерту</option>${Object.entries(labels).filter(([key])=>key!==item.status).map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select><input data-note="${item.id}" placeholder="Ескерту (міндетті емес)"><button class="btn btn-primary" data-update="${item.id}">Сақтау</button></div></article>`;}
async function loadMyRequests(){if(!state.user||state.user.role==='admin')return;try{const result=await api('/requests/my');$('#myRequests').innerHTML=result.items.length?result.items.map(item=>requestCard(item)).join(''):'<p class="empty-state">Әзірге өтінім жоқ.</p>';}catch(error){toast(error.message,true);}}
async function loadAdminRequests(){if(state.user?.role!=='admin')return;try{const result=await api('/requests/admin/all');$('#adminRequests').innerHTML=result.items.length?result.items.map(item=>requestCard(item,true)).join(''):'<p>Өтінімдер жоқ.</p>';}catch(error){toast(error.message,true);}}
async function submitRequest(event){event.preventDefault();const form=new FormData(event.currentTarget);const payload=Object.fromEntries(form.entries());payload.weight_kg=Number(payload.weight_kg);payload.comment=payload.comment.trim()||null;try{const result=await api('/requests',{method:'POST',body:JSON.stringify(payload)});toast(`Өтінім қабылданды: ${result.request_number}`);event.currentTarget.reset();await loadMyRequests();$('#account').scrollIntoView({behavior:'smooth'});}catch(error){toast(error.message,true);}}
async function cancelRequest(id){if(!confirm('Өтінімді тоқтатқыңыз келе ме?'))return;try{await api(`/requests/${id}/cancel`,{method:'POST'});toast('Өтінімнен бас тартылды');await loadMyRequests();}catch(error){toast(error.message,true);}}
async function updateRequest(id){const status=$(`[data-status="${id}"]`).value;if(!status){toast('Жаңа мәртебені таңдаңыз',true);return;}const admin_note=$(`[data-note="${id}"]`).value.trim()||null;try{await api(`/requests/${id}/status`,{method:'PATCH',body:JSON.stringify({status,admin_note})});toast('Өтінім мәртебесі жаңартылды');await loadAdminRequests();}catch(error){toast(error.message,true);}}
function bindEvents(){
  $('#loginOpen').addEventListener('click',()=>state.user?toast(`Сіз жүйеге кірдіңіз: ${state.user.full_name}`):openAuth('login'));
  $('#registerOpen').addEventListener('click',()=>openAuth('register'));
  $('#requestLogin').addEventListener('click',()=>openAuth('login'));
  $('#requestRegister').addEventListener('click',()=>openAuth('register'));
  $('#modalClose').addEventListener('click',closeAuth);
  $('#authModal').addEventListener('click',e=>{if(e.target.dataset.close)closeAuth();});
  $('#authForm').addEventListener('submit',submitAuth);
  $('#requestForm').addEventListener('submit',submitRequest);
  $('#logoutButton').addEventListener('click',()=>logout());
  $('#refreshAdmin').addEventListener('click',loadAdminRequests);
  $('#myRequests').addEventListener('click',e=>{const button=e.target.closest('[data-cancel]');if(button)cancelRequest(button.dataset.cancel);});
  $('#adminRequests').addEventListener('click',e=>{const button=e.target.closest('[data-update]');if(button)updateRequest(button.dataset.update);});
  const date=$('#requestForm [name="transport_date"]');if(date){date.min=new Date().toISOString().slice(0,10);}
}
async function init(){bindEvents();renderSession();if(state.token){try{const user=await api('/auth/me');state.user=user;sessionStorage.setItem('user',JSON.stringify(user));renderSession();}catch{logout(false);}}}
document.addEventListener('DOMContentLoaded',init);
