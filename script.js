// Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;
    
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navLinks.style.display = menuOpen ? 'flex' : 'none';
      hamburger.setAttribute('aria-expanded', menuOpen);
      
      // Make mobile menu responsive
      if (menuOpen) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.flexDirection = 'column';
        navLinks.style.backgroundColor = 'var(--card)';
        navLinks.style.padding = '2rem';
        navLinks.style.borderTop = '1px solid rgba(157, 78, 221, 0.1)';
        navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        navLinks.style.gap = '1.5rem';
      } else {
        navLinks.style = '';
      }
    });
    
    // Close menu on resize if it's open
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && menuOpen) {
        menuOpen = false;
        navLinks.style.display = 'flex';
        navLinks.style = '';
      } else if (window.innerWidth <= 768 && !menuOpen) {
        navLinks.style.display = 'none';
      }
    });
    
    // Initial check for mobile
    if (window.innerWidth <= 768) {
      navLinks.style.display = 'none';
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          if (menuOpen) {
            menuOpen = false;
            navLinks.style.display = 'none';
            navLinks.style = '';
          }
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function revealOnScroll() {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial state for reveal elements
    revealElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    
    // Initial check
    revealOnScroll();