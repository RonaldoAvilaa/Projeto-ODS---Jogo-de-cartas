const CORES = ["verde","azul","amarelo","vermelho"];
const COR = {
  verde:{cls:"c-verde",dot:"#33bd66",ico:"♻️",theme:"♻️",brand:"Reciclagem",nm:"Verde",sdg:"ODS 12"},
  azul:{cls:"c-azul",dot:"#2d97d6",ico:"💧",theme:"🌊",brand:"Água",nm:"Azul",sdg:"ODS 6"},
  amarelo:{cls:"c-amarelo",dot:"#efb627",ico:"☀️",theme:"⚡",brand:"Energia solar",nm:"Amarelo",sdg:"ODS 7"},
  vermelho:{cls:"c-vermelho",dot:"#df454a",ico:"📚",theme:"🎓",brand:"Educação",nm:"Vermelho",sdg:"ODS 4"},
  wild:{cls:"c-wild",dot:"#fff",ico:"🌍",theme:"🌈",brand:"Agenda 2030",nm:"Livre",sdg:"ODS"}
};

const TIPO_LABEL = {skip:"🚫",reverse:"🔄",draw2:"+2",wild:"🌍",wild4:"+4"};
const TIPO_ICO = {skip:"🚫",reverse:"🔄",draw2:"+2",wild:"🌍",wild4:"+4"};
const TIPO_TAG = {skip:"Bloqueio",reverse:"Inverter",draw2:"Compre +2",wild:"Multicor",wild4:"Compre +4"};
const SDG_TAG = {
  verde_num:"ODS 12 · Reciclagem",azul_num:"ODS 6 · Água",amarelo_num:"ODS 7 · Energia",vermelho_num:"ODS 4 · Educação",
  verde_sp:"ODS 12 · Consumo responsável",azul_sp:"ODS 14 · Oceanos",amarelo_sp:"ODS 7 · Energia solar",vermelho_sp:"ODS 4 · Aprendizagem"
};

const MSGS = {
  skip_verde:{ico:"🔥",t:"Queimada florestal",b:"O desmatamento bloqueou o caminho. O próximo jogador perde a vez.",f:"Cada árvore preservada ajuda a proteger o clima, a biodiversidade e a qualidade do ar.",o:"🌳 ODS 15: Vida terrestre"},
  skip_azul:{ico:"🏜️",t:"Seca extrema",b:"A falta de água potável bloqueou a rodada. O próximo jogador perde a vez.",f:"Economizar água em pequenas tarefas reduz o desperdício e protege rios e nascentes.",o:"💧 ODS 6: Água potável e saneamento"},
  skip_amarelo:{ico:"🌑",t:"Apagão",b:"Sem energia limpa, tudo parou. O próximo jogador perde a vez.",f:"A energia solar e outras fontes renováveis ajudam a diminuir emissões e ampliar o acesso à eletricidade.",o:"☀️ ODS 7: Energia limpa e acessível"},
  skip_vermelho:{ico:"📕",t:"Escola sem acesso",b:"A falta de acesso à educação bloqueou o caminho. O próximo jogador perde a vez.",f:"Educação de qualidade abre portas, reduz desigualdades e fortalece comunidades.",o:"📚 ODS 4: Educação de qualidade"},
  reverse_verde:{ico:"🌱",t:"Reflorestamento",b:"Plantar árvores reverte danos ao planeta. O sentido do jogo mudou.",f:"Florestas saudáveis capturam carbono, preservam água e abrigam milhares de espécies.",o:"🌱 ODS 13: Ação contra a mudança do clima"},
  reverse_azul:{ico:"💧",t:"Economia de água",b:"Cada gota conta. O sentido do jogo mudou.",f:"Fechar a torneira enquanto escova os dentes economiza muitos litros de água ao longo do ano.",o:"💧 ODS 6: Água potável e saneamento"},
  reverse_amarelo:{ico:"☀️",t:"Energia solar",b:"O sol renovou a partida. O sentido do jogo mudou.",f:"Fontes limpas de energia reduzem impactos ambientais e tornam cidades mais resilientes.",o:"☀️ ODS 7: Energia limpa e acessível"},
  reverse_vermelho:{ico:"🎓",t:"Aprendizagem em rede",b:"Conhecimento compartilhado muda trajetórias. O sentido do jogo mudou.",f:"Quando estudantes, famílias e escolas aprendem juntos, o desenvolvimento educacional ganha força.",o:"🎓 ODS 4: Educação de qualidade"},
  draw2_verde:{ico:"♻️",t:"Lixo não reciclado",b:"O próximo jogador compra 2 cartas.",f:"Separar papel, plástico, vidro e metal facilita a reciclagem e reduz resíduos nos aterros.",o:"♻️ ODS 12: Consumo e produção responsáveis"},
  draw2_azul:{ico:"🌊",t:"Oceanos poluídos",b:"O próximo jogador compra 2 cartas.",f:"Evitar plástico descartável ajuda a proteger a vida marinha e a qualidade das águas.",o:"🌊 ODS 14: Vida na água"},
  draw2_amarelo:{ico:"⚡",t:"Desperdício de energia",b:"O próximo jogador compra 2 cartas.",f:"Apagar luzes e usar lâmpadas eficientes reduz consumo e desperdício.",o:"☀️ ODS 7: Energia limpa e acessível"},
  draw2_vermelho:{ico:"📝",t:"Tarefa acumulada",b:"O próximo jogador compra 2 cartas.",f:"Investir em leitura, tecnologia e professores preparados ajuda a construir oportunidades reais.",o:"📚 ODS 4: Educação de qualidade"},
  wild:{ico:"🌍",t:"Escolha sustentável",b:"Você pode mudar a cor da mesa.",f:"Os 17 Objetivos de Desenvolvimento Sustentável foram adotados pela ONU para orientar metas globais até 2030.",o:"🌍 Agenda 2030"},
  wild4:{ico:"💧",t:"Desperdício de água",b:"Escolha uma cor. O próximo jogador compra 4 cartas e perde a vez.",f:"Banhos mais curtos, torneiras fechadas e reuso consciente ajudam a preservar água potável.",o:"💧 ODS 6: Água potável e saneamento"}
};

const WIN_FACTS = [
  "Os 17 ODS foram adotados por 193 países em 2015 para orientar ações globais até 2030.",
  "Reciclar reduz a extração de recursos naturais e diminui o volume de resíduos descartados.",
  "A educação de qualidade amplia oportunidades e ajuda comunidades a criarem soluções sustentáveis.",
  "Cidades com áreas verdes ajudam a reduzir calor, melhorar o ar e aumentar a qualidade de vida.",
  "Proteger oceanos também protege alimentação, clima e economia para milhões de pessoas.",
  "Reciclagem, água potável, energia limpa e educação estão conectadas: aprender ajuda a cuidar melhor do planeta."
];

let G = {};
let toastTimer = null;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function mkCard(cor,tipo){return{cor,tipo,id:Math.random().toString(36).slice(2)}}
function embaralhar(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function criarBaralho(){
  const d=[];
  CORES.forEach(c=>{
    d.push(mkCard(c,0));
    for(let n=1;n<=9;n++){d.push(mkCard(c,n));d.push(mkCard(c,n))}
    ["skip","reverse","draw2"].forEach(t=>{d.push(mkCard(c,t));d.push(mkCard(c,t))});
  });
  for(let i=0;i<4;i++)d.push(mkCard("wild","wild"));
  for(let i=0;i<4;i++)d.push(mkCard("wild","wild4"));
  return embaralhar(d);
}

function initGame(){
  if(G.botTimer)clearTimeout(G.botTimer);
  G={baralho:criarBaralho(),descarte:[],maos:[[],[],[]],jogador:0,dir:1,corAtual:"verde",pendente:null,odsGritado:false,msgCb:null,botTimer:null,travado:false,fim:false};
  for(let i=0;i<7;i++)for(let p=0;p<3;p++)G.maos[p].push(G.baralho.pop());
  let pri;
  do{pri=G.baralho.pop()}while(pri.cor==="wild");
  G.descarte.push(pri);
  G.corAtual=pri.cor;
  showScreen("game");
  render();
  toast("Partida iniciada","Combine por cor, número ou ação.");
}

function goStart(){showScreen("start")}
function showScreen(n){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("s-"+n).classList.add("active");
}

function playerName(p){
  return ["Você","Bot Recicla","Bot Planta"][p];
}

function podeJogar(carta){
  if(G.jogador!==0||G.travado)return false;
  const topo=G.descarte[G.descarte.length-1];
  if(carta.cor==="wild")return true;
  return carta.cor===G.corAtual||carta.tipo===topo.tipo;
}
function botPodeJogar(carta){
  const topo=G.descarte[G.descarte.length-1];
  if(carta.cor==="wild")return true;
  return carta.cor===G.corAtual||carta.tipo===topo.tipo;
}
function proxJogador(de){return(de+G.dir+3)%3}
function avancar(de){G.jogador=proxJogador(de)}
function comprarCartas(p,n){
  for(let i=0;i<n;i++){
    if(G.baralho.length===0)reshuffleBaralho();
    if(G.baralho.length>0)G.maos[p].push(G.baralho.pop());
  }
}
function reshuffleBaralho(){
  if(G.descarte.length<2)return;
  const topo=G.descarte.pop();
  G.baralho=embaralhar([...G.descarte]);
  G.descarte=[topo];
}

function humanPlay(idx,el){
  if(G.jogador!==0||G.travado)return;
  const carta=G.maos[0][idx];
  if(!carta||!podeJogar(carta))return;
  G.travado=true;
  animateCardToDiscard(carta,el,()=>{
    G.maos[0].splice(idx,1);
    G.descarte.push(carta);
    aplicarCarta(carta,0);
  });
}

function humanDraw(){
  if(G.jogador!==0||G.travado)return;
  comprarCartas(0,1);
  avancar(0);
  render();
  toast("Você comprou uma carta","Agora é a vez do próximo jogador.");
  runBot();
}

function aplicarCarta(carta,p){
  G.travado=true;
  render();
  popDiscard();
  const next=proxJogador(p);
  if(carta.tipo==="skip"){
    showMsg("skip_"+carta.cor,()=>{
      G.jogador=(next+G.dir+3)%3;
      G.travado=false;
      render();checkWin(p);runBot();
    });return;
  }
  if(carta.tipo==="reverse"){
    showMsg("reverse_"+carta.cor,()=>{
      G.dir*=-1;
      avancar(p);
      G.travado=false;
      render();checkWin(p);runBot();
    });return;
  }
  if(carta.tipo==="draw2"){
    showMsg("draw2_"+carta.cor,()=>{
      comprarCartas(next,2);
      G.jogador=(next+G.dir+3)%3;
      G.travado=false;
      render();checkWin(p);runBot();
    });return;
  }
  if(carta.tipo==="wild"){
    if(p===0){
      showMsg("wild",()=>{
        G.pendente="wild";
        document.getElementById("m-color").classList.add("on");
      });
    }else{
      showMsg("wild",()=>{
        G.corAtual=melhorCorBot(p);
        avancar(p);G.travado=false;render();checkWin(p);runBot();
      });
    }
    return;
  }
  if(carta.tipo==="wild4"){
    if(p===0){
      showMsg("wild4",()=>{
        G.pendente="wild4";
        document.getElementById("m-color").classList.add("on");
      });
    }else{
      showMsg("wild4",()=>{
        G.corAtual=melhorCorBot(p);
        comprarCartas(next,4);
        G.jogador=(next+G.dir+3)%3;
        G.travado=false;render();checkWin(p);runBot();
      });
    }
    return;
  }
  G.corAtual=carta.cor;
  avancar(p);
  G.travado=false;
  render();checkWin(p);runBot();
}

function pickColor(cor){
  document.getElementById("m-color").classList.remove("on");
  G.corAtual=cor;
  if(G.pendente==="wild4"){
    const next=proxJogador(0);
    comprarCartas(next,4);
    G.jogador=(next+G.dir+3)%3;
  }else{
    avancar(0);
  }
  G.pendente=null;
  G.travado=false;
  render();checkWin(0);runBot();
}

function callODS(){
  if(G.jogador!==0)return;
  G.odsGritado=true;
  document.getElementById("ods-btn").style.display="none";
  toast("ODS!","Você avisou que está com uma carta.");
}

function runBot(){
  if(G.fim)return;
  if(G.jogador===0)return;
  if(G.botTimer)clearTimeout(G.botTimer);
  G.botTimer=setTimeout(()=>botTurn(G.jogador),850);
}
function botTurn(p){
  if(G.jogador!==p||G.travado||p===0)return;
  const mao=G.maos[p];
  let melhor=null,melhorIdx=-1,pri=0;
  for(let i=0;i<mao.length;i++){
    const c=mao[i];
    if(!botPodeJogar(c))continue;
    const pr=prioBot(c);
    if(pr>pri){pri=pr;melhor=c;melhorIdx=i}
  }
  if(melhorIdx>=0){
    G.travado=true;
    animateCardToDiscard(melhor,botSourceEl(p),()=>{
      mao.splice(melhorIdx,1);
      G.descarte.push(melhor);
      aplicarCarta(melhor,p);
    },{fromBot:true,player:p});
  }else{
    comprarCartas(p,1);
    avancar(p);
    G.travado=false;
    render();checkWin(p);runBot();
  }
}
function prioBot(c){
  if(c.tipo==="wild4")return 6;
  if(c.tipo==="wild")return 5;
  if(c.tipo==="draw2")return 4;
  if(c.tipo==="skip"||c.tipo==="reverse")return 3;
  if(c.cor===G.corAtual)return 2;
  return 1;
}
function melhorCorBot(p){
  const counts={verde:0,azul:0,amarelo:0,vermelho:0};
  G.maos[p].forEach(c=>{if(counts[c.cor]!==undefined)counts[c.cor]++});
  return [...CORES].sort((a,b)=>counts[b]-counts[a])[0];
}

function animateCardToDiscard(carta,sourceEl,done,opts={}){
  const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target=document.getElementById("discard-slot");
  if(!sourceEl||prefersReduced){done();return}
  const botBox=opts.fromBot?document.getElementById("bot"+opts.player+"-box"):null;
  if(botBox)botBox.classList.add("throwing");
  sourceEl.classList.add("is-playing");
  const from=sourceEl.getBoundingClientRect();
  const to=target.getBoundingClientRect();
  const clone=document.createElement("div");
  clone.innerHTML=cardHTML(carta,false);
  const fly=clone.firstElementChild;
  fly.classList.add("fly-card");
  if(opts.fromBot)fly.classList.add("from-bot");
  const startW=opts.fromBot?78:from.width;
  const startH=opts.fromBot?112:from.height;
  fly.style.left=(from.left+from.width/2-startW/2)+"px";
  fly.style.top=(from.top+from.height/2-startH/2)+"px";
  fly.style.width=startW+"px";
  fly.style.height=startH+"px";
  document.body.appendChild(fly);
  const dx=(to.left+to.width/2)-(from.left+from.width/2);
  const dy=(to.top+to.height/2)-(from.top+from.height/2);
  const spin=opts.fromBot?(opts.player===1?16:-16):(Math.random()>.5?8:-8);
  const scale=opts.fromBot?1.12:1.08;
  requestAnimationFrame(()=>{
    fly.style.transform=`translate(${dx}px, ${dy}px) rotate(${spin}deg) scale(${scale})`;
    fly.style.opacity=".96";
  });
  const duration=opts.fromBot?610:360;
  setTimeout(()=>{
    fly.remove();
    sourceEl.classList.remove("is-playing");
    if(botBox)botBox.classList.remove("throwing");
    done();
  },duration);
}
function botSourceEl(p){
  const hand=document.getElementById("bot"+p+"-hand");
  return hand.querySelector(".c")||document.getElementById("bot"+p+"-box");
}
function popDiscard(){
  const el=document.querySelector("#discard-slot .c");
  if(el)el.classList.add("land-pop");
}

function checkWin(p){
  if(G.maos[p].length!==0)return false;
  G.fim=true;
  const ganhou=p===0;
  document.getElementById("win-ico").textContent=ganhou?"🏆":"🌧️";
  document.getElementById("win-h").textContent=ganhou?"Você venceu!":playerName(p)+" venceu!";
  document.getElementById("win-sub").textContent=ganhou?"Ótima partida. Você zerou sua mão de forma sustentável.":"Não foi dessa vez. A próxima rodada já vem com revanche.";
  document.getElementById("win-fact").textContent=WIN_FACTS[Math.floor(Math.random()*WIN_FACTS.length)];
  if(G.botTimer)clearTimeout(G.botTimer);
  setTimeout(()=>showScreen("win"),520);
  return true;
}

function showMsg(key,cb){
  const m=MSGS[key];
  if(!m){if(cb)cb();return}
  G.msgCb=cb;
  document.getElementById("mi").textContent=m.ico;
  document.getElementById("mt").textContent=m.t;
  document.getElementById("mb").textContent=m.b;
  document.getElementById("mf").textContent="💡 "+m.f;
  document.getElementById("mo").textContent=m.o;
  document.getElementById("m-msg").classList.add("on");
}
function closeMsg(){
  document.getElementById("m-msg").classList.remove("on");
  const cb=G.msgCb;G.msgCb=null;
  if(cb)cb();
}
function openHelp(){
  document.getElementById("m-help").classList.add("on");
}
function closeHelp(){
  document.getElementById("m-help").classList.remove("on");
}
function toast(t,b){
  const el=document.getElementById("toast");
  document.getElementById("toast-t").textContent=t;
  document.getElementById("toast-b").textContent=b;
  el.classList.add("show");
  if(toastTimer)clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>el.classList.remove("show"),3200);
}

function render(){
  renderBots();
  renderCenter();
  renderPlayerHand();
  renderTurn();
  renderODSBtn();
}
function renderBots(){
  [1,2].forEach(b=>{
    const box=document.getElementById("bot"+b+"-box");
    box.style.visibility="visible";
    const cont=G.maos[b].length;
    document.getElementById("bot"+b+"-lbl").textContent=playerName(b);
    document.getElementById("bot"+b+"-hand").innerHTML=Array.from({length:Math.min(cont,10)},(_,i)=>
      `<div class="c sm c-bk deal-anim" style="animation-delay:${i*.025}s"></div>`
    ).join("");
    document.getElementById("bot"+b+"-cnt").textContent=cont+(cont===1?" carta":" cartas");
    box.className="bot-box"+(G.jogador===b?" myturn":"");
  });
}
function renderCenter(){
  const topo=G.descarte[G.descarte.length-1];
  document.getElementById("discard-slot").innerHTML=topo?cardHTML(topo,false):"";
  const cor=COR[G.corAtual];
  const dot=document.getElementById("cdot");
  dot.style.background=cor.dot;
  dot.style.color=cor.dot;
  dot.title="Cor atual: "+cor.nm;
  document.getElementById("color-name").textContent=cor.nm+" · "+cor.brand;
  document.getElementById("ods-seal-icon").textContent=cor.ico;
  document.getElementById("goal-name").textContent=cor.sdg+" · "+cor.brand;
  document.querySelectorAll(".ods-goal").forEach(g=>g.classList.toggle("active",g.dataset.cor===G.corAtual));
  document.getElementById("deck-cnt").textContent=G.baralho.length+" cartas";
  document.getElementById("dir-txt").textContent=G.dir===1?"▶ Horário":"◀ Anti-horário";
  document.getElementById("draw-slot").className="draw-slot"+(G.jogador===0&&!G.travado?"":" off");
}
function renderPlayerHand(){
  const mao=G.maos[0];
  document.getElementById("player-lbl").textContent="Você";
  document.getElementById("player-hand").innerHTML=mao.map((c,i)=>{
    const jogavel=podeJogar(c);
    return `<div onclick="humanPlay(${i},this)" class="c ${COR[c.cor].cls} ${jogavel?"playable":"dimmed"} deal-anim" style="animation-delay:${i*.025}s" title="${cardTitle(c)}">${cardInnerHTML(c)}</div>`;
  }).join("");
  document.getElementById("player-box").className="player-chip"+(G.jogador===0?" myturn":"");
}
function renderTurn(){
  document.getElementById("turn-txt").textContent=G.jogador===0?"SUA VEZ":"VEZ DO "+playerName(G.jogador).toUpperCase();
  let status="";
  if(G.jogador===0&&!G.travado)status="Jogue uma carta destacada ou compre.";
  if(G.jogador!==0)status="Aguarde a jogada do bot.";
  if(G.travado)status="Resolvendo a jogada...";
  document.getElementById("status-txt").textContent=status;
}
function renderODSBtn(){
  const btn=document.getElementById("ods-btn");
  if(G.jogador===0&&G.maos[0].length===1&&!G.odsGritado){btn.style.display="block"}
  else{
    btn.style.display="none";
    if(G.maos[0].length!==1)G.odsGritado=false;
  }
}

function centerVal(c){
  if(typeof c.tipo==="number")return c.tipo;
  return TIPO_ICO[c.tipo]||c.tipo;
}
function cornerVal(c){
  if(typeof c.tipo==="number")return c.tipo;
  return TIPO_LABEL[c.tipo]||c.tipo;
}
function cardTag(c){
  if(c.cor==="wild")return "Agenda 2030";
  const k=c.cor+"_"+(typeof c.tipo==="number"?"num":"sp");
  return SDG_TAG[k]||"";
}
function cardTitle(c){
  const tipo=typeof c.tipo==="number"?"Número "+c.tipo:TIPO_TAG[c.tipo];
  return COR[c.cor].nm+" · "+tipo+" · "+cardTag(c);
}
function cardInnerHTML(c){
  const sp=typeof c.tipo==="string"?" sp":"";
  const wild=c.cor==="wild"?" w":"";
  return `<div class="coval"></div><span class="cc tl">${cornerVal(c)}</span><span class="cbrand">${COR[c.cor].brand}</span><span class="ctheme">${COR[c.cor].theme}</span><div class="cv${sp}${wild}">${centerVal(c)}</div><span class="cc br">${cornerVal(c)}</span><span class="cmini">${COR[c.cor].ico}</span><span class="ctag">${cardTag(c)}</span>`;
}
function cardHTML(carta,clicavel){
  const jogavel=clicavel&&podeJogar(carta);
  return `<div class="c ${COR[carta.cor].cls}${clicavel?(jogavel?" playable":" dimmed"):""}">${cardInnerHTML(carta)}</div>`;
}