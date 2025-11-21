import './style.css'
import { OptimalStoppingGame } from './game.js'

const app = document.querySelector('#app');
let game = new OptimalStoppingGame(10);

// Simple Localization Dictionary
const i18n = {
  en: {
    title: "Find The Best(Biggest One) Choice with The 37% Rule",
    current: "Current Item",
    itemsLeft: "Items Left",
    pass: "Pass",
    pick: "Pick",
    win: "You found the best diamond! 💎",
    lose: "You missed the best one.",
    bestWas: "The best value was",
    yourValue: "You picked",
    playAgain: "Play Again"
  },
  th: {
    title: "ค้นหาตัวเลือกที่ดีที่สุด (มากที่สุด) ด้วยกฎ 37%",
    current: "ลำดับที่",
    itemsLeft: "เหลืออีก",
    pass: "ผ่าน",
    pick: "เลือก",
    win: "คุณเจอเพชรที่ดีที่สุด! 💎",
    lose: "คุณพลาดเพชรที่ดีที่สุดไป",
    bestWas: "ค่าที่ดีที่สุดคือ",
    yourValue: "คุณเลือก",
    playAgain: "เล่นอีกครั้ง"
  }
};

let currentLang = 'en'; // Default

// Initial Render
let showAssistant = false;

function getRecommendation(game) {
  // 37% Rule Implementation
  const N = game.totalItems;
  const lookPhase = Math.round(N * 0.37); // e.g. 4 for 10
  const currentIdx = game.currentIndex;

  // Phase 1: Look (Pass everything)
  if (currentIdx < lookPhase) {
    return { action: 'pass', reason: 'Learning phase (Observe first 37%)' };
  }

  // Phase 2: Leap (Pick if better than best seen in look phase)
  const history = game.getHistoryValues();
  const lookPhaseValues = history.slice(0, lookPhase);
  const bestInLook = Math.max(...lookPhaseValues, 0);
  const currentVal = game.getCurrentItem();

  if (currentVal > bestInLook) {
    return { action: 'pick', reason: `Value ${currentVal} > Best seen (${bestInLook})` };
  }

  // If we are at the last item, we must pick
  if (currentIdx === N - 1) {
    return { action: 'pick', reason: 'Last chance!' };
  }

  return { action: 'pass', reason: `Value ${currentVal} not better than ${bestInLook}` };
}

function render() {
  const t = i18n[currentLang];
  const currentItem = game.getCurrentItem();
  const isGameOver = game.gameOver;

  // Calculate Stats
  const winRate = game.stats.gamesPlayed > 0
    ? Math.round((game.stats.wins / game.stats.gamesPlayed) * 100)
    : 0;

  // Advanced Stats Calculations
  const avgGap = game.stats.gamesPlayed > 0
    ? Math.round(game.stats.totalOptimalityGap / game.stats.gamesPlayed)
    : 0;

  // History HTML
  const historyHtml = game.stats.history.slice().reverse().map((h, i) => `
    <div class="history-item">
      <span>#${game.stats.gamesPlayed - i}</span>
      <span class="${h.result === 'win' ? 'history-win' : 'history-lose'}">
        ${h.result === 'win' ? 'WIN' : 'LOSE'}
      </span>
      <span style="font-size:0.8em; opacity:0.7">
        (Gap: ${h.gap})
      </span>
    </div>
  `).join('');

  // Progress Steps HTML
  let stepsHtml = '<div class="progress-container">';
  for (let i = 0; i < game.totalItems; i++) {
    let className = 'step';
    if (i === game.currentIndex && !isGameOver) className += ' active';
    if (i < game.currentIndex) className += ' passed';
    if (isGameOver && i === game.currentIndex) className += ' picked';
    stepsHtml += `<div class="${className}"></div>`;
  }
  stepsHtml += '</div>';

  const langBtnText = currentLang === 'en' ? '🇹🇭 TH' : '🇬🇧 EN';

  app.innerHTML = `
    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="header-row">
          <h1>${t.title}</h1>
          <button id="langBtn" class="lang-btn" title="Switch Language">${langBtnText}</button>
        </div>

        <div class="stats-panel">
          <h3>📊 Statistics</h3>
          <div class="stat-row">
            <span>Played:</span>
            <span class="stat-value">${game.stats.gamesPlayed}</span>
          </div>
          <div class="stat-row">
            <span>Wins:</span>
            <span class="stat-value">${game.stats.wins}</span>
          </div>
          <div class="stat-row">
            <span>Win Rate:</span>
            <span class="stat-value">${winRate}%</span>
          </div>
          <div class="stat-row" title="Lower is better">
            <span>Avg. Gap:</span>
            <span class="stat-value">${avgGap}</span>
          </div>
          
          <div class="history-list">
            ${historyHtml}
          </div>
        </div>

        <div class="assistant-panel">
          <div class="assistant-title">🤖 AI Assistant</div>
          ${showAssistant && !isGameOver ? `
            <div>Strategy: <strong>37% Rule</strong></div>
            <div class="recommendation">
               Suggestion: <span class="${getRecommendation(game).action === 'pick' ? 'rec-pick' : 'rec-pass'}">
                 ${getRecommendation(game).action === 'pick' ? t.pick : t.pass}
               </span>
               <div style="font-size: 0.8em; opacity: 0.8; margin-top:0.2em">(${getRecommendation(game).reason})</div>
            </div>
          ` : `
            <div style="opacity: 0.7; font-size: 0.9em;">
              ${isGameOver ? 'Game Over' : 'Enable to see suggestions'}
            </div>
          `}
           <div class="toggle-container">
            <label>
              <input type="checkbox" id="assistantToggle" ${showAssistant ? 'checked' : ''}> 
              ${currentLang === 'en' ? 'Enable' : 'เปิดใช้งาน'}
            </label>
          </div>
        </div>
      </aside>

      <!-- Game Area -->
      <main class="game-area">
        ${stepsHtml}
        
        <div class="stats">
          ${t.itemsLeft}: ${game.totalItems - game.currentIndex} / ${game.totalItems}
        </div>

        <div class="card-area">
          <div class="card ${game.currentIndex > 0 ? 'deal-anim' : ''}" key="${game.currentIndex}">
            <div class="card-content">
              ${currentItem !== null ? currentItem : '?'}
            </div>
          </div>
        </div>

        <br>

        <div class="controls">
          <button id="passBtn" class="pass-btn" ${isGameOver ? 'disabled' : ''}>${t.pass}</button>
          <button id="pickBtn" class="pick-btn" ${isGameOver ? 'disabled' : ''}>${t.pick}</button>
        </div>
      </main>
    </div>

    ${isGameOver ? renderResult(t) : ''}
  `;

  attachEvents();
}

function renderResult(t) {
  return `
    <div class="result-overlay fade-in">
      <div class="result-box scale-up">
        <h2>${game.result === 'win' ? t.win : t.lose}</h2>
        <p>${t.yourValue}: <strong>${game.pickedValue || '-'}</strong></p>
        <p>${t.bestWas}: <strong>${game.bestValue}</strong></p>
        <button id="restartBtn">${t.playAgain}</button>
      </div>
    </div>
  `;
}

function attachEvents() {
  const passBtn = document.getElementById('passBtn');
  const pickBtn = document.getElementById('pickBtn');
  const restartBtn = document.getElementById('restartBtn');
  const assistantToggle = document.getElementById('assistantToggle');
  const langBtn = document.getElementById('langBtn');

  if (passBtn) {
    passBtn.onclick = () => {
      if (game.pass()) {
        render();
      }
    };
  }

  if (pickBtn) {
    pickBtn.onclick = () => {
      if (game.pick()) {
        render();
      }
    };
  }

  if (restartBtn) {
    restartBtn.onclick = () => {
      game.reset();
      render();
    };
  }

  if (assistantToggle) {
    assistantToggle.onchange = (e) => {
      showAssistant = e.target.checked;
      render();
    };
  }

  if (langBtn) {
    langBtn.onclick = () => {
      currentLang = currentLang === 'en' ? 'th' : 'en';
      render();
    };
  }
}

// Initial Render
render();
