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

    // show popup to take a break
    const popup =  document.getElementById('popup');
    popup.classList.add('active'); 

    document.getElementById('yes-btn').addEventListener('click', () => {
      window.location.href = 'index.html'; // link to focus page
    });
    document.getElementById('no-btn').addEventListener('click', () => {
      popup.classList.remove('active');
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

