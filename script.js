// Modern JavaScript for Enhanced User Experience




// Scroll Animations
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.elements.forEach(el => observer.observe(el));
  }
}

// Navbar Scroll Effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.classList.add('navbar-scrolled');
      } else {
        this.navbar.classList.remove('navbar-scrolled');
      }
    });
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Parallax Effect
class ParallaxEffect {
  constructor() {
    this.heroVideo = document.querySelector('.hero-video-bg');
    this.init();
  }

  init() {
    if (!this.heroVideo) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      this.heroVideo.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
  }
}

// Enhanced Button Interactions
class ButtonEffects {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
}

// Premium Gallery Functions
let premiumCurrentSlide = 0;
const premiumSlides = [
  'assets/Noviembre/NOVIEMBRE/RPZ09663.jpg',
  'assets/Noviembre/NOVIEMBRE/RPZ09668.jpg',
  'assets/Noviembre/NOVIEMBRE/RPZ09672.jpg',
  'assets/Noviembre/NOVIEMBRE/RPZ09674.jpg'
];

function premiumGo(n) {
  premiumCurrentSlide = n;
  const mainImg = document.getElementById('premiumMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = premiumSlides[n];
      mainImg.style.opacity = '1';
    }, 200);
  }
  
  // Update active thumbnail
  document.querySelectorAll('.premium-thumb').forEach((thumb, index) => {
    thumb.style.opacity = index === n ? '1' : '0.6';
    thumb.style.transform = index === n ? 'scale(1.1)' : 'scale(1)';
  });
}

function premiumNext() {
  premiumCurrentSlide = (premiumCurrentSlide + 1) % premiumSlides.length;
  premiumGo(premiumCurrentSlide);
}

function premiumPrev() {
  premiumCurrentSlide = (premiumCurrentSlide - 1 + premiumSlides.length) % premiumSlides.length;
  premiumGo(premiumCurrentSlide);
}

// Auto-advance premium gallery
setInterval(premiumNext, 5000);

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  // Initialize custom classes
  new ScrollAnimations();
  new NavbarScroll();
  new SmoothScroll();
  new ParallaxEffect();
  new ButtonEffects();
  
  // Initialize premium gallery
  premiumGo(0);
});

// Add ripple effect CSS
const rippleCSS = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);