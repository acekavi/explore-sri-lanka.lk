const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("open");
});