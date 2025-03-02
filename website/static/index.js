document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none";
    });
  });
});
