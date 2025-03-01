const timerElement = document.getElementById("timer-string");
let timeLeft = 0.2 * 60;
let intervalID = null;
let iteration = 1;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerElement.textContent = `${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(intervalID);
    iteration++;
    if (iteration % 2 === 0) {
      // break
      if (iteration % 8 === 0) {
        // long break
        timeLeft = 0.1 * 60;
        timerElement.textContent = "00:06";
      } else {
        // short break
        timeLeft = 0.05 * 60;
        timerElement.textContent = "00:03";
      }
    } else {
      // pomo
      timeLeft = 0.2 * 60;
      timerElement.textContent = "00:12";
    }
    intervalID = null;
  }

  timeLeft--;
}

function startTimer() {
  if (intervalID !== null) return;

  intervalID = setInterval(updateTimer, 1000);
}

function stopTimer() {
  if (intervalID === null) return;

  clearInterval(intervalID);
  intervalID = null;
}

updateTimer();
