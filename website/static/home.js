const timerElement = document.getElementById("timer-string");
let timeLeft = 25 * 60;
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
        timeLeft = 15 * 60;
        timerElement.textContent = "15:00";
      } else {
        // short break
        timeLeft = 5 * 60;
        timerElement.textContent = "05:00";
      }
    } else {
      // pomo
      timeLeft = 25 * 60;
      timerElement.textContent = "25:00";
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

function addTask(formData) {
  fetch("/", {
    method: "POST",
    body: formData,
  })
    .then((_res) => _res.json())
    .then((data) => {
      htmlString = "";
      for (const task of data) {
        htmlString += `
        <li>
          ${task.data}
          <button type="button" onclick="deleteTask(${task.id})">
            <span>&times;</span>
          </button>
        </li>`;
      }
      document.getElementById("data").innerHTML = htmlString;
      document.getElementById("task-form").reset();
    });
}

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);
    let formData = new FormData(event.target);
    addTask(formData);
  });

function deleteTask(taskId) {
  fetch("/delete-task", {
    method: "POST",
    body: JSON.stringify({ taskId: taskId }),
  })
    .then((_res) => _res.json())
    .then((data) => {
      htmlString = "";
      for (const task of data) {
        htmlString += `
          <li>
            ${task.data}
            <button type="button" onclick="deleteTask(${task.id})">
              <span>&times;</span>
            </button>
          </li>
        `;
      }
      document.getElementById("data").innerHTML = htmlString;
    });
}
