function deleteTask(taskId) {
  fetch("/delete-task", {
    method: "POST",
    body: JSON.stringify({ taskId: taskId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  });
});
