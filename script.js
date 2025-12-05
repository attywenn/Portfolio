// Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;
    hamburger?.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.style.display = menuOpen ? 'block' : 'none';
      hamburger.setAttribute('aria-expanded', String(menuOpen));
    });

    // Smooth internal anchor scroll fallback for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if(!href || href === '#') return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          if(menuOpen){ menuOpen = false; mobileMenu.style.display = 'none'; hamburger.setAttribute('aria-expanded','false') }
        }
      });
    });

    // Simple reveal on scroll
    function revealOnScroll() {
      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        const offset = 110;
        if(rect.top < (window.innerHeight - offset)) el.classList.add('active');
      });
    }
    window.addEventListener('scroll', revealOnScroll, {passive:true});
    window.addEventListener('resize', revealOnScroll);
    // initial
    setTimeout(revealOnScroll, 150);

    /* Canvas particle background (subtle, performant) */
    (function(){
      const canvas = document.getElementById('bgCanvas');
      if(!canvas) return;
      const ctx = canvas.getContext('2d');
      let W = canvas.width = innerWidth;
      let H = canvas.height = innerHeight;
      const count = Math.max(60, Math.floor((W*H)/12000)); // responsive
      const particles = [];

      function rand(min,max){ return Math.random()*(max-min)+min }

      class P {
        constructor(){
          this.x = rand(0, W);
          this.y = rand(0, H);
          this.r = rand(0.6, 2.2);
          this.vx = rand(-0.2, 0.2);
          this.vy = rand(-0.2, 0.2);
          this.alpha = rand(0.18, 0.6);
        }
        update(){
          this.x += this.vx;
          this.y += this.vy;
          if(this.x < -20) this.x = W + 20;
          if(this.x > W + 20) this.x = -20;
          if(this.y < -20) this.y = H + 20;
          if(this.y > H + 20) this.y = -20;
        }
        draw(){
          ctx.beginPath();
          ctx.fillStyle = 'rgba(0,209,255,' + this.alpha + ')';
          ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
          ctx.fill();
        }
      }

      function init(){
        particles.length = 0;
        for(let i=0;i<count;i++) particles.push(new P());
      }

      function connect(){
        for(let i=0;i<particles.length;i++){
          for(let j=i+1;j<particles.length;j++){
            const a = particles[i], b = particles[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if(d < 140){
              ctx.strokeStyle = 'rgba(0,209,255,' + (0.05 + (0.14 * (1 - d/140))) + ')';
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      let rafId;
      function loop(){
        ctx.clearRect(0,0,W,H);
        for(const p of particles){ p.update(); p.draw(); }
        connect();
        rafId = requestAnimationFrame(loop);
      }

      // Resize handler with debounce
      let to;
      window.addEventListener('resize', () => {
        clearTimeout(to);
        to = setTimeout(() => {
          W = canvas.width = innerWidth;
          H = canvas.height = innerHeight;
          init();
        }, 120);
      });

      init();
      loop();
    })();