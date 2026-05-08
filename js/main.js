document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Product filter
  var filterButtons = document.querySelectorAll('.filter-btn');
  var productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      productCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          setTimeout(function () { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(function () { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Scroll animations
  var fadeElements = document.querySelectorAll('.section-title, .category-card, .product-card, .policy-card, .contact-item, .about-text, .about-image');

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // Contact form - sends via WhatsApp
  var contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(contactForm);
    var name = formData.get('name');
    var email = formData.get('email');
    var phone = formData.get('phone');
    var message = formData.get('message');

    var whatsappMsg = 'Hi MissTee Fashions!%0A%0A'
      + 'Name: ' + encodeURIComponent(name) + '%0A'
      + 'Email: ' + encodeURIComponent(email) + '%0A'
      + (phone ? 'Phone: ' + encodeURIComponent(phone) + '%0A' : '')
      + 'Message: ' + encodeURIComponent(message);

    window.open('https://wa.me/263734499823?text=' + whatsappMsg, '_blank');
    contactForm.reset();
  });

  // Smooth scroll for category cards
  document.querySelectorAll('.category-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      var category = card.getAttribute('data-category');
      var productsSection = document.getElementById('products');

      productsSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(function () {
        filterButtons.forEach(function (btn) {
          if (btn.getAttribute('data-filter') === category) {
            btn.click();
          }
        });
      }, 600);
    });
  });
});
