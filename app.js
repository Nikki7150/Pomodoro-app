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

    /*// Show break container
    const breakContainer = document.getElementById('break-container');
    breakContainer.innerHTML = `
      <h2>Time's Up!</h2>
      <h3>Take a break?</h3>
      <hr />
      <button id="yes-break">Yes</button>
      <button id="no-break">No</button>
    `;
    breakContainer.style.display = 'block';

    // Click handlers
    document.getElementById('yes-break').addEventListener('click', () => {
      window.location.href = 'break.html'; // link to your break page
    });
    document.getElementById('no-break').addEventListener('click', () => {
      breakContainer.style.display = 'none';
      minuteDiv.textContent = '1';
      secondDiv.textContent = '00';
      totalSeconds = undefined; // reset for next start
    });*/

    const popup =  document.getElementById('popup');
    popup.classList.add('active'); 

    document.getElementById('yes-btn').addEventListener('click', () => {
      window.location.href = 'break.html'; // link to break page
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

var quoteList = [
  '"Taking a break can lead to break throughs." - Russell Dobda', 
  '"You don\'t have to see the whole staircase. You just have to take the first step." - Martin Luther King Jr.', 
  '"The most effective way to do it, is to do it." - Amelia Earhart', 
  '"Be so good they can\'t ignore you." - Steve Martin', 
  '"The secret of making progress is to get started." - Mark Twain', 
  '"Success is not the key to happiness. Happiness is the key to success." - Albert Schweitzer', 
  '"The only way to do great work is to love what you do." - Steve Jobs'
];

var quote = document.getElementById('quote-text');
var count = 0;
var reset = document.getElementById('reset');

if (reset) {
  reset.addEventListener('click', displayquote);
}

  function displayquote () {
    quote.innerHTML = quoteList[count];
    count++;
    if (count == quoteList.length) {
      count = 0;
    }
  }
