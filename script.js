document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
      });
    });
    
    window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if(pageYOffset >= (sectionTop - 300)) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
    
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if(!name || !email || !subject || !message) {
          showFormMessage('Please fill in all fields', 'error');
          return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
          showFormMessage('Please enter a valid email address', 'error');
          return;
        }
        
        console.log('Form submitted with:', { name, email, subject, message });
        contactForm.reset();
        showFormMessage('Your message has been sent. Thank you!', 'success');
      });
    }
    
    function showFormMessage(message, type) {
      let messageElement = document.querySelector('.form-message');
      if(!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.appendChild(messageElement);
      }
      messageElement.textContent = message;
      messageElement.className = 'form-message ' + type;
      messageElement.style.padding = '10px';
      messageElement.style.marginTop = '15px';
      messageElement.style.borderRadius = '5px';
      messageElement.style.backgroundColor = type === 'error' ? '#ffebee' : '#e8f5e9';
      messageElement.style.color = type === 'error' ? '#c62828' : '#2e7d32';
      setTimeout(() => messageElement.remove(), 5000);
    }
    
    function animateProgressBars() {
      const progressBars = document.querySelectorAll('.progress');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1s ease-in-out';
          bar.style.width = width;
        }, 300);
      });
    }
    animateProgressBars();
    
    const cards = document.querySelectorAll('.project-card, .cert-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('animated');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
    
    const heroTitle = document.querySelector('.hero-heading h1');
    if(heroTitle) {
      const originalText = heroTitle.textContent;
      heroTitle.textContent = '';
      let i = 0;
      function typeEffect() {
        if(i < originalText.length) {
          heroTitle.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeEffect, 100);
        }
      }
      setTimeout(typeEffect, 500);
    }
    
    const modeToggle = document.getElementById('modeToggle');
    modeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = modeToggle.querySelector('i');
      if(document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
    
    const mouseTail = document.createElement('div');
    mouseTail.className = 'mouse-tail';
    document.body.appendChild(mouseTail);
    
    document.addEventListener('mousemove', (e) => {
      mouseTail.style.left = e.pageX - 10 + 'px';
      mouseTail.style.top = e.pageY - 10 + 'px';
      const hovered = document.querySelector(':hover');
      mouseTail.style.transform = hovered ? 'scale(1.5)' : 'scale(1)';
    });
    
    function createSparkle(x, y) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
    
    document.querySelectorAll('.project-card, .cert-card, .skill-list li').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.8) {
          createSparkle(e.pageX, e.pageY);
        }
      });
    });
    
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('show');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(el => fadeObserver.observe(el));
  });