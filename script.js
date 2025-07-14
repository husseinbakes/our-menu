document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "🌙" : "☀️";
  });

  // Set current year in footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Order Modal Logic
  const modal = document.getElementById("order-modal");
  const modalCakeName = document.getElementById("modal-cake-name");
  const whatsappLink = document.getElementById("whatsappLink");
  const closeBtn = document.querySelector(".close-btn");

  document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
      const cakeName = button.getAttribute("data-cake-name");
      modalCakeName.textContent = cakeName;
      if (whatsappLink) {
        const encodedName = encodeURIComponent(cakeName);
        whatsappLink.href = `https://wa.me/254710975805?text=I'm%20interested%20in%20ordering%20the%20${encodedName}%20cake.`;
      }
      modal.classList.add("show");
    });
  });

  closeBtn?.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  // Smooth scroll back to top
  document.querySelector(".back-to-top")?.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Image Slider (for each slider)
  document.querySelectorAll(".image-slider").forEach(slider => {
    const wrapper = slider.querySelector(".image-wrapper");
    const slides = wrapper.querySelectorAll(".image-slide");
    const prevBtn = slider.querySelector(".prev-btn");
    const nextBtn = slider.querySelector(".next-btn");
    const dotsContainer = slider.querySelector(".slider-dots");
    let currentIndex = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlider();
      });
      dotsContainer?.appendChild(dot);
    });

    const updateSlider = () => {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      dotsContainer.querySelectorAll(".dot").forEach((dot, i) =>
        dot.classList.toggle("active", i === currentIndex)
      );
    };

    prevBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextBtn?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
  });

  // Search Functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      document.querySelectorAll(".cake-card").forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(filter) ? "" : "none";
      });
    });
  }

  // Category Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      document.querySelectorAll(".cake-card").forEach(card => {
        const matches = category === "all" || card.dataset.category === category;
        card.style.display = matches ? "block" : "none";
      });

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});