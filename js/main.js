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

  // Product image lightbox (tap to zoom)
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(imgEl, card) {
    lightboxImg.src = imgEl.src;
    lightboxImg.alt = imgEl.alt || '';

    var name = card.querySelector('h3');
    var price = card.querySelector('.product-price');
    var caption = name ? name.textContent : '';
    if (price) {
      caption += '<span class="lb-price">' + price.textContent + '</span>';
    }
    lightboxCaption.innerHTML = caption;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  document.querySelectorAll('.product-card .product-image').forEach(function (imgWrap) {
    imgWrap.addEventListener('click', function () {
      var imgEl = imgWrap.querySelector('img');
      var card = imgWrap.closest('.product-card');
      if (imgEl && card) {
        openLightbox(imgEl, card);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      // Close when clicking the dark backdrop (not the image itself)
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});
