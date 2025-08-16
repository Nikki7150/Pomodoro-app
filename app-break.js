const bells = new Audio('end-bell.wav'); 
const beep = document.getElementById('beep-sound');
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const minuteDiv = document.querySelector('.minutes');///
const secondDiv = document.querySelector('.seconds');///

let myInterval; 
let totalSeconds; 
let isRunning = false; 

const initTimer = () => {
  const sessionAmount = Number.parseInt(minuteDiv.textContent);
  totalSeconds = sessionAmount * 60;
};

const updateTimerDisplay = () => {
  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  minuteDiv.textContent = minutesLeft;
  secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
};

const appTimer = () => {
  if (isRunning) {
    alert('Session already running.');
    return;
  }

  if (totalSeconds === undefined) {
    initTimer();
  }

  beep.play();
  isRunning = true;

  myInterval = setInterval(() => {
    if (totalSeconds <= 0) {
    clearInterval(myInterval);
    bells.play();
    isRunning = false;

    // Show focus container
    const focusContainer = document.getElementById('focus-container');
    focusContainer.innerHTML = `
      <h2>Time's Up!</h2>
      <h3>Take a focus?</h3>
      <hr />
      <button id="yes-focus">Yes</button>
      <button id="no-focus">No</button>
    `;
    focusContainer.style.color = 'rgb(84, 73, 73)';
    focusContainer.style.background = 'rgb(231, 227, 227, 0.5)';
    focusContainer.style.border = '2px solid #dcdee7';

    // Click handlers
    document.getElementById('yes-focus').addEventListener('click', () => {
      window.location.href = 'index.html'; // link to your focus page
    });
    document.getElementById('no-focus').addEventListener('click', () => {
      focusContainer.style.display = 'none';
      minuteDiv.textContent = '1';
      secondDiv.textContent = '00';
      totalSeconds = undefined; // reset for next start
    });

    return;
  }

    totalSeconds--;
    updateTimerDisplay();
  }, 1000);
};

startBtn.addEventListener('click', appTimer);

pauseBtn.addEventListener('click', () => {
  if (!isRunning) return;

  clearInterval(myInterval);
  isRunning = false;
});

resetBtn.addEventListener('click', () => {
  if(confirm("Are you sure you want to reset the timer?")) {
    clearInterval(myInterval);
    isRunning = false;
    minuteDiv.textContent = '1';
    secondDiv.textContent = '00';
    totalSeconds = undefined;
  }
});

