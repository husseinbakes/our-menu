// ===== CATEGORY FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const cakeCards = document.querySelectorAll('.cake-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    cakeCards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== SEARCH FILTERING =====
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    cakeCards.forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p.description')?.textContent.toLowerCase();

      if (name.includes(searchTerm) || (description && description.includes(searchTerm))) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ===== FADE-IN ON SCROLL =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== BACK TO TOP BUTTON =====
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'inline';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop?.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
