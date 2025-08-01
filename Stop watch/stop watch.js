let interval;
let seconds = 0;
let targetSeconds = 0;

let h = 0, m = 0, s = 0;

function updateDisplayTime() {
  document.getElementById("displayTime").textContent = 
    `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  targetSeconds = h * 3600 + m * 60 + s;
}

function changeTime(unit) {
  if (unit === 'hour') {
    h = (h + 1) % 13; // wrap after 12
  } else if (unit === 'minute') {
    m = (m + 1) % 60;
  } else if (unit === 'second') {
    s = (s + 1) % 60;
  }
  updateDisplayTime();
}

function updateHands() {
  const sec = seconds % 60;
  const min = Math.floor(seconds / 60) % 60;
  const hr = Math.floor(seconds / 3600) % 12;

  document.getElementById('second').style.transform = `rotate(${sec * 6}deg)`;
  document.getElementById('minute').style.transform = `rotate(${min * 6 + sec * 0.1}deg)`;
  document.getElementById('hour').style.transform = `rotate(${hr * 30 + min * 0.5}deg)`;

  const countdownElem = document.getElementById('countdown');
  const remaining = targetSeconds - seconds;

  if (remaining >= 0) {
    countdownElem.textContent = `Time Left: ${remaining} seconds`;
  } else {
    countdownElem.textContent = '';
    document.getElementById('message').textContent = '⏰ Time\'s up!';
    clearInterval(interval);
    interval = null;
  }
}

function startTimer() {
  if (interval || targetSeconds === 0) return;
  document.getElementById('message').textContent = '';
  interval = setInterval(() => {
    seconds++;
    updateHands();
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  h = m = s = 0;
  targetSeconds = 0;
  updateDisplayTime();
  updateHands();
  document.getElementById('countdown').textContent = '';
  document.getElementById('message').textContent = '';
}

// Create minute bars dynamically
window.onload = () => {
  updateDisplayTime();
  const watch = document.getElementById('watch');
  for (let i = 0; i < 60; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.transform = `rotate(${i * 6}deg)`;
    watch.appendChild(bar);
  }
};
