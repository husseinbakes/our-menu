// Toggle Light/Dark Mode
const toggleButton = document.getElementById('themeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleButton.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const cakeSections = document.querySelectorAll('.menu-section');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');

    cakeSections.forEach(section => {
      const sectionCategory = section.getAttribute('data-category');
      if (category === 'all' || sectionCategory === category) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cakeCards = document.querySelectorAll('.cake-card');

  cakeCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(searchTerm) ? 'block' : 'none';
  });
});

// Animate on Scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

fadeInElements.forEach(el => observer.observe(el));