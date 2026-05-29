/**
 * FLC Abogados Tributarios - main.js
 * Funcionalidades interactivas para Landing Page
 * - Menú móvil responsive
 * - FAQ Accordion
 * - Smooth scroll con offset
 * - Validación y envío de formulario
 * - Animaciones on-scroll
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // MENÚ MÓVIL
    // ========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ========================================
    // FAQ ACCORDION
    // ========================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle current
            this.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('active', !isExpanded);
            if (icon) {
                icon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            }
            
            // Close others (optional - remove if you want multiple open)
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    const otherContent = otherTrigger.nextElementSibling;
                    const otherIcon = otherTrigger.querySelector('i');
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherContent.classList.remove('active');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0)';
                    }
                }
            });
        });
    });
    
    // ========================================
    // SMOOTH SCROLL CON OFFSET
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular offset considerando navbar sticky
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });
    
    // ========================================
    // FORMULARIO DE CONTACTO
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const originalBtnDisabled = submitBtn.disabled;
            
            // Estado de envío
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            
            // Simular envío (reemplazar con fetch/axios a backend real)
            setTimeout(() => {
                // Mostrar confirmación
                alert('✓ Gracias por contactar a FLC Abogados Tributarios. Hemos recibido su solicitud y un especialista se comunicará con usted en menos de 24 horas hábiles.');
                
                // Resetear formulario
                this.reset();
                
                // Restaurar botón
                submitBtn.disabled = originalBtnDisabled;
                submitBtn.innerHTML = originalBtnText;
                
                // Scroll suave al mensaje de éxito (opcional)
                // window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 1500);
        });
    }
    
    // ========================================
    // ANIMACIONES ON-SCROLL (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase 'fade-in-on-scroll'
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md', 'bg-white/98');
                navbar.classList.remove('bg-white/95');
            } else {
                navbar.classList.remove('shadow-md', 'bg-white/98');
                navbar.classList.add('bg-white/95');
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Ejecutar al cargar
    }
    
    // ========================================
    // ACCESIBILIDAD: Keyboard navigation para FAQ
    // ========================================
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // ========================================
    // CONSOLE LOG para debugging en producción
    // ========================================
    console.log('FLC Abogados Tributarios - Landing Page cargada correctamente ✓');
    console.log('Versión: 1.0.0 | GitHub Pages Ready');
});