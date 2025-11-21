(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();class y{constructor(s=10){this.totalItems=s,this.items=[],this.currentIndex=0,this.bestValue=0,this.gameOver=!1,this.result=null,this.pickedValue=null,this.history=[],this.stats={gamesPlayed:0,wins:0,history:[],bestFoundCount:0,totalOptimalityGap:0},this.init()}init(){const s=new Set;for(;s.size<this.totalItems;)s.add(Math.floor(Math.random()*1e3)+1);this.items=Array.from(s);for(let i=this.items.length-1;i>0;i--){const o=Math.floor(Math.random()*(i+1));[this.items[i],this.items[o]]=[this.items[o],this.items[i]]}this.bestValue=Math.max(...this.items),this.currentIndex=0,this.gameOver=!1,this.result=null,this.pickedValue=null,this.history=[]}getCurrentItem(){return this.currentIndex>=this.totalItems?null:this.items[this.currentIndex]}pass(){return this.gameOver||this.currentIndex>=this.totalItems-1?!1:(this.history.push({value:this.items[this.currentIndex],action:"pass",index:this.currentIndex}),this.currentIndex++,!0)}pick(){if(this.gameOver)return!1;const s=this.items[this.currentIndex];this.pickedValue=s,this.history.push({value:s,action:"pick",index:this.currentIndex});const i=s===this.bestValue;return this.endGame(i?"win":"lose"),!0}endGame(s){this.gameOver=!0,this.result=s;const i=this.items.indexOf(this.bestValue),o=this.currentIndex,a=this.bestValue-(this.pickedValue||0);this.stats.gamesPlayed++,s==="win"&&this.stats.wins++,this.stats.totalOptimalityGap+=a,this.stats.history.push({result:s,picked:this.pickedValue,best:this.bestValue,pickedIndex:o,bestIndex:i,gap:a})}reset(){this.init()}getHistoryValues(){return this.history.map(s=>s.value)}}const f=document.querySelector("#app");let t=new y(10);const b={en:{title:"Optimal Stopping Game",gameTitle:"Optimal Stopping Algorithm",quote:`"The art of knowing when to stop looking and commit to a choice - a mathematical approach to life's biggest decisions."`,itemsLeft:"Items Left",pass:"Pass",pick:"Pick",youWin:"You Win! 🎉",youLose:"You Lose 😢",youPicked:"You picked",bestWas:"Best was",pickedAt:"Picked at position",playAgain:"Play Again"},th:{title:"เกมหยุดที่เหมาะสม",gameTitle:"อัลกอริทึมหยุดที่เหมาะสม",quote:'"ศิลปะของการรู้ว่าเมื่อไหร่ควรหยุดมองหาและตัดสินใจเลือก - แนวทางทางคณิตศาสตร์สำหรับการตัดสินใจที่สำคัญที่สุดในชีวิต"',itemsLeft:"เหลืออีก",pass:"ผ่าน",pick:"เลือก",youWin:"คุณชนะ! 🎉",youLose:"คุณแพ้ 😢",youPicked:"คุณเลือก",bestWas:"ค่าที่ดีที่สุดคือ",pickedAt:"ลำดับที่เลือก",playAgain:"เล่นอีกครั้ง"}};let p="en",g=!1;function m(e){const s=e.totalItems,i=Math.round(s*.37),o=e.currentIndex;if(o<i)return{action:"pass",reason:"Learning phase (Observe first 37%)"};const n=e.getHistoryValues().slice(0,i),c=Math.max(...n,0),u=e.getCurrentItem();return u>c?{action:"pick",reason:`Value ${u} > Best seen (${c})`}:o===s-1?{action:"pick",reason:"Last chance!"}:{action:"pass",reason:`Value ${u} not better than ${c}`}}function d(){const e=b[p],s=t.getCurrentItem(),i=t.gameOver,o=t.stats.gamesPlayed>0?Math.round(t.stats.wins/t.stats.gamesPlayed*100):0,a=t.stats.gamesPlayed>0?Math.round(t.stats.totalOptimalityGap/t.stats.gamesPlayed):0,n=t.stats.history.reduce((r,l)=>r+l.pickedIndex,0),c=t.stats.gamesPlayed>0?(n/t.stats.gamesPlayed).toFixed(1):0,u=t.stats.history.slice().reverse().map((r,l)=>`
    <div class="history-item" style="flex-direction: column; gap: 0.2rem;">
      <div style="display: flex; justify-content: space-between; width: 100%;">
        <span>#${t.stats.gamesPlayed-l}</span>
        <span class="${r.result==="win"?"history-win":"history-lose"}">
          ${r.result==="win"?"WIN":"LOSE"}
        </span>
      </div>
      <div style="display: flex; justify-content: space-between; width: 100%; font-size: 0.85em; opacity: 0.7;">
         <span>Passes: ${r.pickedIndex}</span>
         <span>Gap: ${r.gap}</span>
      </div>
    </div>
  `).join("");let h='<div class="progress-container">';for(let r=0;r<t.totalItems;r++){let l="step";r===t.currentIndex&&!i&&(l+=" active"),r<t.currentIndex&&(l+=" passed"),i&&r===t.currentIndex&&(l+=" picked"),h+=`<div class="${l}"></div>`}h+="</div>";const v=p==="en"?"🇹🇭 TH":"🇬🇧 EN";f.innerHTML=`
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="header-row">
          <h1>${e.title}</h1>
          <button id="langBtn" class="lang-btn" title="Switch Language">${v}</button>
        </div>

        <div class="assistant-panel">
          <div class="assistant-title">🤖 AI Assistant</div>
          ${g&&!i?`
            <div>Strategy: <strong>37% Rule</strong></div>
            <div class="recommendation">
               Suggestion: <span class="${m(t).action==="pick"?"rec-pick":"rec-pass"}">
                 ${m(t).action==="pick"?e.pick:e.pass}
               </span>
               <div style="font-size: 0.8em; opacity: 0.8; margin-top:0.2em">(${m(t).reason})</div>
            </div>
          `:`
            <div style="opacity: 0.7; font-size: 0.9em;">
              ${i?"Game Over":"Enable to see suggestions"}
            </div>
          `}
           <div class="toggle-container">
            <label>
              <input type="checkbox" id="assistantToggle" ${g?"checked":""}> 
              ${p==="en"?"Enable":"เปิดใช้งาน"}
            </label>
          </div>
        </div>

        <div class="stats-panel">
          <h3>📊 Statistics</h3>
          <div class="stat-row">
            <span>Played:</span>
            <span class="stat-value">${t.stats.gamesPlayed}</span>
          </div>
          <div class="stat-row">
            <span>Wins:</span>
            <span class="stat-value">${t.stats.wins}</span>
          </div>
          <div class="stat-row">
            <span>Win Rate:</span>
            <span class="stat-value">${o}%</span>
          </div>
          <div class="stat-row" title="Lower is better">
            <span>Avg. Gap:</span>
            <span class="stat-value">${a}</span>
          </div>
          <div class="stat-row">
            <span>Avg. Passes:</span>
            <span class="stat-value">${c}</span>
          </div>
          
          <div class="history-list">
            ${u}
          </div>
        </div>
      </aside>

      <!-- Game Area -->
      <main class="game-area">
        <h2 class="game-title">${e.gameTitle}</h2>
        <blockquote class="game-quote">${e.quote}</blockquote>
        
        ${h}
        
        <div class="stats">
          ${e.itemsLeft}: ${t.totalItems-t.currentIndex} / ${t.totalItems}
        </div>

        <div class="card-area">
          <div class="card ${t.currentIndex>0?"deal-anim":""}" key="${t.currentIndex}">
            <div class="card-content">
              ${s!==null?s:"?"}
            </div>
          </div>
        </div>

        <br>

        <div class="controls">
          <button id="passBtn" class="pass-btn" ${i?"disabled":""}>${e.pass}</button>
          <button id="pickBtn" class="pick-btn" ${i?"disabled":""}>${e.pick}</button>
        </div>
      </main>
    </div>

    ${i?I(e):""}
  `,k()}function I(e){return`
    <div class="result-overlay fade-in">
      <div class="result-box scale-up">
        <h2>${t.result==="win"?e.youWin:e.youLose}</h2>
        <p>${e.youPicked}: <strong>${t.pickedValue||"-"}</strong></p>
        <p>${e.bestWas}: <strong>${t.bestValue}</strong></p>
        <p>${e.pickedAt}: <strong>${t.currentIndex+1}</strong></p>
        <button id="restartBtn">${e.playAgain}</button>
      </div>
    </div>
  `}function k(){const e=document.getElementById("passBtn"),s=document.getElementById("pickBtn"),i=document.getElementById("restartBtn"),o=document.getElementById("assistantToggle"),a=document.getElementById("langBtn");e&&(e.onclick=()=>{t.pass()&&d()}),s&&(s.onclick=()=>{t.pick()&&d()}),i&&(i.onclick=()=>{t.reset(),d()}),o&&(o.onchange=n=>{g=n.target.checked,d()}),a&&(a.onclick=()=>{p=p==="en"?"th":"en",d()})}d();
