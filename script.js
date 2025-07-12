// Toggle Light/Dark Mode
const toggleButton = document.getElementById('themeToggle');

// Check for user's preferred theme on load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  document.body.classList.add('light-mode');
  toggleButton.textContent = '🌙';
} else {
  toggleButton.textContent = '☀️';
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleButton.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
});

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
const cakeSections = document.querySelectorAll('.menu-section[data-category]'); // Target sections with data-category

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');

    cakeSections.forEach(section => {
      // Get the section's data-category, or a default if none (like for Extras/Reviews)
      const sectionCategory = section.getAttribute('data-category');

      if (category === 'all') {
        // Show all sections that originally have a data-category
        section.style.display = 'block';
      } else if (sectionCategory === category) {
        // Show only the matching category section
        section.style.display = 'block';
      } else {
        // Hide non-matching sections, including those without a category if 'all' isn't selected
        section.style.display = 'none';
      }
    });

    // Handle sections without a data-category (like 'Extras' and 'Reviews')
    // They should always be visible regardless of category filters, unless 'all' is not active
    const extrasSection = document.getElementById('extras');
    const reviewsSection = document.getElementById('reviews');

    if (category === 'all') {
      if (extrasSection) extrasSection.style.display = 'block';
      if (reviewsSection) reviewsSection.style.display = 'block';
    } else {
        // For specific categories, still show extras and reviews
        if (extrasSection) extrasSection.style.display = 'block';
        if (reviewsSection) reviewsSection.style.display = 'block';
    }
  });
});

// Initial filter setting to 'All' on page load
document.addEventListener('DOMContentLoaded', () => {
    const allButton = document.querySelector('.filter-btn[data-category="all"]');
    if (allButton) {
        allButton.click(); // Simulate a click on 'All' to show all sections
    }
});


// Search Functionality
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cakeCards = document.querySelectorAll('.cake-card');

  cakeCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    // Only filter cake cards within sections that are currently visible by category filter
    const parentSection = card.closest('.menu-section');
    if (parentSection && parentSection.style.display !== 'none') {
      card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    } else if (!parentSection) { // If a card is not inside a menu-section (shouldn't happen with current structure)
      card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    }
  });
});

// Animate on Scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Optional: remove 'visible' class when out of view if you want re-animation on scroll up
      // entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.1 }); // Trigger earlier

fadeInElements.forEach(el => observer.observe(el));


// Order Modal Functionality
const orderButtons = document.querySelectorAll('.order-button');
const orderModal = document.getElementById('order-modal');
const closeModalBtn = document.querySelector('.close-btn');
const modalCakeName = document.getElementById('modal-cake-name');
const whatsappLink = document.querySelector('.whatsapp-float'); // Get the WhatsApp link in the modal

orderButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cakeName = button.getAttribute('data-cake-name');
    modalCakeName.textContent = cakeName;

    // Construct the WhatsApp message with the cake name
    const whatsappMessage = encodeURIComponent(`Hello Hussein Bakes, I'd like to order the "${cakeName}" cake.`);
    whatsappLink.href = `https://wa.me/254710975805?text=${whatsappMessage}`;

    orderModal.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
});

closeModalBtn.addEventListener('click', () => {
  orderModal.classList.remove('visible');
  document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    orderModal.classList.remove('visible');
    document.body.style.overflow = '';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && orderModal.classList.contains('visible')) {
    orderModal.classList.remove('visible');
    document.body.style.overflow = '';
  }
});
