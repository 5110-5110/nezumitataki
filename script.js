const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 15;
let activeHole = null;
let timerId = null;
let moleTimerId = null;

function startGame() {
    // リセット
    score = 0;
    timeLeft = 15;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = true;

    // 1秒ごとにカウントダウン
    timerId = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerId);
            clearInterval(moleTimerId);
            clearHoles();
            alert(`ゲーム終了！ あなたのスコアは ${score} 点です！`);
            startBtn.disabled = false;
        }
    }, 1000);

    // ネズミを定期的に出現させる
    moleTimerId = setInterval(showMole, 600);
}

function showMole() {
    clearHoles();
    // 0〜8のランダムな穴を選ぶ
    const randomIndex = Math.floor(Math.random() * holes.length);
    activeHole = holes[randomIndex];
    
    // 🐭 ネズミが出現！
    activeHole.textContent = '🐭'; 
}

function clearHoles() {
    holes.forEach(hole => hole.textContent = '');
}

// 穴をクリックしたときの処理
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === activeHole && hole.textContent !== '') {
            score += 10;
            scoreDisplay.textContent = score;
            
            // 💫 捕まえたらぐるぐるする演出
            hole.textContent = '💫'; 
            activeHole = null;
        }
    });
});

startBtn.addEventListener('click', startGame);
