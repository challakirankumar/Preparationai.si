/* PreparationAI — interactions (page is fully readable without this file) */
try{
const o=document.getElementById('orbit');
const tl=[...o.querySelectorAll('.tile')];let k=0;tl.forEach(function(x){x.addEventListener('pointerenter',function(){const ob=o.getBoundingClientRect(),xb=x.getBoundingClientRect();x.classList.toggle('lr',xb.left+xb.width/2>ob.left+ob.width/2);x.classList.toggle('tp',xb.top+xb.height/2<ob.top+ob.height/2)})});
function nx(){tl.forEach(x=>{x.classList.remove('on');x.closest('.node').classList.remove('on')});const x=tl[k%tl.length];const ob=o.getBoundingClientRect(),xb=x.getBoundingClientRect();x.classList.toggle('lr',xb.left+xb.width/2>ob.left+ob.width/2);x.classList.toggle('tp',xb.top+xb.height/2<ob.top+ob.height/2);x.classList.add('on');x.closest('.node').classList.add('on');k++}
nx();setInterval(()=>{if(!o.matches(':hover'))nx()},2600);
const S=[["Take a mock test","An AI-built paper that mirrors the real exam.","Mock test · Mathematics","Scored in real time",[["Algebra",78],["Trigonometry",64],["Probability",41],["Calculus",28]],"Result saved. Your topic-level report is ready."],
["See your gaps","Topic-level analytics, not just one score.","Topic strength","Where you stand right now",[["Algebra",78],["Trigonometry",64],["Probability",41],["Calculus",28]],"Priority: Calculus and Probability carry the biggest score gain."],
["Watch the fix","A targeted video for the exact weak topic.","Recommended for you","Matched to your weakest topic",[["Calculus basics",28],["Probability",41]],"Suggested video: Closing the Calculus gap, matched to the questions you missed."],
["Retake and improve","Track the same topics as they climb.","After one week","Same topics, new attempt",[["Algebra",86],["Trigonometry",74],["Probability",63],["Calculus",55]],"Calculus up 27 points. The next focus topic is already queued."]];
const st=document.getElementById('steps');
const d=document.getElementById('demo');
function show(i){[...st.children].forEach((c,j)=>c.classList.toggle('on',i===j));const s=S[i];d.classList.remove('live');
document.getElementById('dt').textContent=s[2];document.getElementById('ds').textContent=s[3];
const bars=document.getElementById('bars');bars.innerHTML=s[4].map(b=>`<div class="bar ${b[1]<50?'low':''}"><b><span>${b[0]}</span><span>${b[1]}%</span></b><i><u data-w="${b[1]}"></u></i></div>`).join('');
document.getElementById('fix').textContent=s[5];
requestAnimationFrame(()=>requestAnimationFrame(()=>{bars.querySelectorAll('u').forEach(u=>u.style.width=u.dataset.w+'%');d.classList.add('live')}))}
st.addEventListener('click',e=>{const c=e.target.closest('.step');if(c)show(+c.dataset.i)});
st.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.step');if(c){e.preventDefault();show(+c.dataset.i)}}});
show(1);
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.glass');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.tilt');if(c&&!c.contains(e.relatedTarget))c.style.transform=''});
document.querySelectorAll('.cp').forEach(b=>b.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.c).then(()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy',1500)}).catch(()=>{})});
const pg=document.getElementById('pg');addEventListener('scroll',()=>{pg.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'},{passive:true});
const all=document.querySelectorAll('.rv');if(!('IntersectionObserver' in window)){all.forEach(e=>e.classList.add('in'))}else{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
all.forEach(el=>io.observe(el))}

}catch(err){document.querySelectorAll('.rv').forEach(function(e){e.classList.add('in')})}
