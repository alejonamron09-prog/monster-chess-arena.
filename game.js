const roster = [
 {id:'ember',name:'Embercub',art:'🦁',cost:60,hp:70,atk:24,desc:'Apoy • balanced'},
 {id:'moss',name:'Mossback',art:'🐢',cost:75,hp:110,atk:14,desc:'Tank • matibay'},
 {id:'volt',name:'Voltkit',art:'🐯',cost:85,hp:60,atk:34,desc:'Mabilis • high damage'},
 {id:'tide',name:'Tidefin',art:'🐬',cost:70,hp:80,atk:22,desc:'Tubig • versatile'},
 {id:'shade',name:'Shadelet',art:'🦇',cost:90,hp:55,atk:38,desc:'Anino • fragile'},
 {id:'sprout',name:'Spriggan',art:'🌱',cost:65,hp:85,atk:18,desc:'Kalikasan • support'}
];
let coins=250, board=Array(16).fill(null), selected=null, round=1, busy=false;
const $=id=>document.getElementById(id);
function render(){
 $('coins').textContent=coins;
 $('round').textContent='ROUND '+round;
 const boardEl=$('board'); boardEl.innerHTML='';
 board.forEach((unit,i)=>{
  const tile=document.createElement('button'); tile.className='tile '+(unit?(unit.owner==='player'?'player':'enemy'):'empty');
  tile.setAttribute('aria-label',unit?`${unit.name}, ${unit.hp} HP`:`Tile ${i+1}`);
  if(unit){tile.innerHTML=`<span class="owner">${unit.owner==='player'?'🔵':'🔴'}</span><span>${unit.art}</span><span class="hp"><i style="width:${Math.max(0,unit.hp/unit.maxHp*100)}%"></i></span>`;}
  else tile.innerHTML='<span style="opacity:.18;font-size:1rem">＋</span>';
  tile.addEventListener('click',()=>tileTap(i)); boardEl.appendChild(tile);
 });
 $('selectedLabel').textContent=selected?'Napili: '+selected.name:'Pumili ng monster';
 const shop=$('shop');shop.innerHTML='';
 roster.forEach(m=>{
  const card=document.createElement('article');card.className='monster-card';
  card.innerHTML=`<div class="monster-art">${m.art}</div><b>${m.name}</b><div class="stats">❤️ ${m.hp} · ⚔️ ${m.atk}<br>${m.desc}</div><button class="recruit" ${coins<m.cost?'disabled':''}>Recruit 🪙${m.cost}</button>`;
  card.querySelector('button').addEventListener('click',()=>{selected=m;$('message').textContent=`Napili ang ${m.name}. I-tap ang bakanteng tile sa unang dalawang row para ilagay ito.`;render();});
  shop.appendChild(card);
 });
}
function tileTap(i){
 if(busy)return;
 if(board[i]?.owner==='player'){selected=roster.find(m=>m.id===board[i].id)||null;$('message').textContent='Napili ang unit sa board. Sa susunod na update, magkakaroon ng move/upgrade.';render();return;}
 if(i>=8){$('message').textContent='Ilagay ang iyong monsters sa asul na bahagi (unang 2 row).';return;}
 if(!selected){$('message').textContent='Pumili muna ng monster sa Recruit Shop.';return;}
 if(board[i]){ $('message').textContent='May unit na sa tile na ito.';return; }
 if(coins<selected.cost){$('message').textContent='Kulang ang coins. Manalo sa battle para kumita.';return;}
 coins-=selected.cost;board[i]={...selected,owner:'player',maxHp:selected.hp};selected=null;
 $('message').textContent='Na-deploy ang monster! Maglagay ng hanggang 4 na unit at simulan ang laban.';render();
}
function spawnAI(){
 const open=[...Array(8)].map((_,i)=>i+8).filter(i=>!board[i]);
 for(let k=0;k<Math.min(3,open.length);k++){
  const m=roster[(round+k+1)%roster.length];const i=open[Math.floor(Math.random()*open.length)];
  if(i!==undefined){board[i]={...m,owner:'enemy',maxHp:m.hp};open.splice(open.indexOf(i),1);}
 }
}
function battle(){
 if(busy)return;
 const allies=board.filter(u=>u?.owner==='player');
 if(!allies.length){$('message').textContent='Mag-recruit muna ng kahit isang monster bago lumaban.';return;}
 if(board.some(u=>u?.owner==='enemy')){ $('message').textContent='May kalaban pa sa board. Pindutin ang Bagong Laro para magsimula ulit.';return; }
 spawnAI();busy=true;render();$('message').textContent='Nagsisimula ang auto-battle...';
 let tick=0;
 const timer=setInterval(()=>{
  const a=board.filter(u=>u?.owner==='player'&&u.hp>0),e=board.filter(u=>u?.owner==='enemy'&&u.hp>0);
  if(!a.length||!e.length||tick++>12){
   clearInterval(timer);busy=false;
   const win=a.length>0;
   board=board.map(u=>u&&u.hp<=0?null:u);
   if(win){coins+=90;$('message').textContent='🏆 Panalo! +90 coins. Ayusin ulit ang squad para sa susunod na round.';}
   else {$('message').textContent='💥 Natalo ka sa round na ito. Pindutin ang Bagong Laro para subukan ulit.';}
   round++;render();return;
  }
  const aliveA=board.map((u,i)=>({u,i})).filter(x=>x.u?.owner==='player'&&x.u.hp>0);
  const aliveE=board.map((u,i)=>({u,i})).filter(x=>x.u?.owner==='enemy'&&x.u.hp>0);
  aliveA.forEach(({u})=>{const target=aliveE[Math.floor(Math.random()*aliveE.length)];if(target)target.u.hp-=u.atk;});
  aliveE.forEach(({u})=>{const target=aliveA[Math.floor(Math.random()*aliveA.length)];if(target)target.u.hp-=u.atk;});
  render();
 },650);
}
function reset(){board=Array(16).fill(null);selected=null;busy=false;round=1;coins=250;$('message').textContent='Bagong laro! Mag-recruit ng monsters at ilagay sila sa asul na bahagi.';render();}
$('battleBtn').addEventListener('click',battle);$('resetBtn').addEventListener('click',reset);
document.querySelectorAll('.buy').forEach(b=>b.addEventListener('click',()=>alert(`${b.dataset.item}: demo lamang. Walang totoong payment na gagawin sa prototype.`)));
render();