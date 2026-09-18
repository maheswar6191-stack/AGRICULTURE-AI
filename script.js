const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

$("#menuBtn").addEventListener("click",()=>$("#mobileNav").classList.toggle("show"));
$$(".mobile-nav a").forEach(a=>a.addEventListener("click",()=>$("#mobileNav").classList.remove("show")));

$("#themeBtn").addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  $("#themeBtn").textContent=document.body.classList.contains("dark")?"☾":"☼";
});

const cropInfo={
 Rice:{season:"Kharif",water:"High",soil:"Clayey / loamy",tip:"Maintain appropriate moisture during key growth stages and avoid unnecessary prolonged flooding."},
 Wheat:{season:"Rabi",water:"Medium",soil:"Loam / clay loam",tip:"Pay close attention to moisture at crown-root initiation and other critical stages."},
 Cotton:{season:"Kharif",water:"Medium",soil:"Deep black / loam",tip:"Scout regularly for sucking pests and bollworm symptoms using integrated pest management."},
 Groundnut:{season:"Kharif",water:"Medium",soil:"Sandy loam",tip:"Avoid excess irrigation and keep the field weed-free during early crop growth."},
 Tomato:{season:"Suitable local season",water:"Medium",soil:"Fertile loam",tip:"Prefer consistent irrigation and avoid frequent wetting of foliage."},
 Maize:{season:"Regional",water:"Medium",soil:"Fertile loam",tip:"Protect the crop from moisture stress around flowering and grain filling."}
};

$("#adviceBtn").addEventListener("click",()=>{
 const crop=$("#crop").value, soil=$("#soil").value, stage=$("#stage").value, issue=$("#issue").value, d=cropInfo[crop];
 const btn=$("#adviceBtn"); btn.disabled=true; btn.innerHTML="Preparing advisory…";
 setTimeout(()=>{
   $("#adviceOutput").innerHTML=`<div class="advice-result">
   <span class="health-label">✦ AI-ASSISTED RECOMMENDATION</span>
   <h3>${crop} field plan</h3>
   <p>For <b>${crop}</b> at the <b>${stage}</b> stage on <b>${soil.toLowerCase()}</b> soil, prioritize ${d.water.toLowerCase()} water management and regular field observation. Reported issue: <b>${issue}</b>. Use soil-test information and local agronomy guidance before making fertilizer or pesticide decisions.</p>
   <div class="advice-grid"><div class="advice-mini"><small>SEASON</small><b>${d.season}</b></div><div class="advice-mini"><small>WATER NEED</small><b>${d.water}</b></div><div class="advice-mini"><small>SOIL FIT</small><b>${d.soil}</b></div></div>
   <div class="tip"><b>Field note:</b> ${d.tip}</div></div>`;
   btn.disabled=false; btn.innerHTML="Generate advisory <span>✦</span>";
 },500);
});

const healthData={
 yellow:["Possible nutrient or water stress","Check soil moisture and compare older vs. newer leaves. A soil test can help before fertilizer application."],
 spots:["Possible fungal or bacterial leaf disease","Inspect affected leaves, improve airflow where possible and confirm the cause locally before using any treatment."],
 wilt:["Possible water, root or vascular stress","Check moisture, drainage and roots. Recent heat or heavy rain can also affect wilting."],
 holes:["Possible insect feeding","Inspect leaf undersides and growing points; record the pest and consider integrated pest management."],
 curl:["Possible sucking-pest, heat or viral symptoms","Inspect for insects and recent heat stress. If viral disease is suspected, seek local expert confirmation."],
 stunted:["Possible nutrient, root or environmental stress","Review soil conditions, drainage, nutrition and recent weather before changing the fertilizer program."]
};
let selected="yellow";
$$(".symptom").forEach(b=>b.addEventListener("click",()=>{ $$(".symptom").forEach(x=>x.classList.remove("active"));b.classList.add("active");selected=b.dataset.key; }));
$("#healthBtn").addEventListener("click",()=>{
 const [title,desc]=healthData[selected];
 $("#healthResult").innerHTML=`<div class="health-label">PRELIMINARY SCREENING</div><h3>${title}</h3><p>${desc}</p><div class="health-bottom"><span>Confidence: preliminary</span><span>•</span><span>Field observation required</span></div>`;
});

const market=[
 ["Wheat","₹2,650","quintal","+2.1%","up"],["Rice","₹2,380","quintal","+1.4%","up"],["Cotton","₹7,150","quintal","−0.8%","down"],["Groundnut","₹6,200","quintal","+3.2%","up"],["Maize","₹2,180","quintal","+0.9%","up"]
];
function renderMarket(filter=""){
 $("#marketRows").innerHTML=market.filter(x=>x[0].toLowerCase().includes(filter.toLowerCase())).map(x=>`<div class="market-row"><b>${x[0]}</b><span>${x[1]}</span><span>${x[2]}</span><span class="signal ${x[4]}">${x[3]}</span></div>`).join("")||'<div class="market-row"><span>No commodity found.</span></div>';
}
renderMarket();
$("#marketSearch").addEventListener("input",e=>renderMarket(e.target.value));

$("#waterBtn").addEventListener("click",()=>{
 const area=Number($("#area").value), depth=Number($("#depth").value);
 $("#waterResult").innerHTML=area>0&&depth>0?`Estimated volume: <b>${(area*depth).toLocaleString()} L</b><br><small>Formula: area (m²) × depth (mm) = litres.</small>`:"Please enter both values.";
});

function ask(){
 const q=$("#question").value.trim(); if(!q)return;
 $("#chat").insertAdjacentHTML("beforeend",`<div class="chat-bubble user">${q.replace(/[<>]/g,"")}</div>`);
 let ans="Start with the crop, growth stage, soil type and recent field observations. For high-impact decisions, verify the recommendation with a qualified local agriculture professional.";
 const l=q.toLowerCase();
 if(l.includes("wheat"))ans="For wheat, monitor moisture at crown-root initiation and other critical stages. Use a soil-test-based nutrient plan rather than a fixed fertilizer schedule.";
 else if(l.includes("rice"))ans="For rice, focus on appropriate water management and crop-stage observation. Local soil, rainfall and irrigation conditions should guide the final schedule.";
 else if(l.includes("cotton"))ans="For cotton, scout regularly for sucking pests and bollworm symptoms. Integrated pest management should be considered before chemical control.";
 else if(l.includes("soil"))ans="A soil test is one of the best starting points for crop and nutrient decisions. Record pH and available N, P and K where testing is available.";
 setTimeout(()=>{$("#chat").insertAdjacentHTML("beforeend",`<div class="chat-bubble bot">${ans}</div>`);$("#chat").scrollTop=$("#chat").scrollHeight},250);
 $("#question").value="";
}
$("#chatBtn").addEventListener("click",ask);$("#question").addEventListener("keydown",e=>{if(e.key==="Enter")ask()});

$$(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>{$$(".desktop-nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active")}));
