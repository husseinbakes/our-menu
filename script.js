// Toggle dark/light mode
const toggleBtn = document.getElementById("toggle-mode");
const body = document.body;
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach((el) => fadeInObserver.observe(el));

// Modal logic
const modal = document.getElementById("orderModal");
const modalTitle = document.getElementById("modalTitle");
const orderButtons = document.querySelectorAll(".order-btn");
const closeBtn = document.querySelector(".close-btn");

// Open modal with cake name
orderButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const cakeName = btn.getAttribute("data-cake");
    modalTitle.textContent = `Order: ${cakeName}`;
    modal.classList.remove("hidden");
  })
);

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
