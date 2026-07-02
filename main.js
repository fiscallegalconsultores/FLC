// main.js - FLC Abogados Tributarios
document.addEventListener('DOMContentLoaded', function() {
    // MENÚ MÓVIL
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
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

    // FAQ ACCORDION
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                content.classList.add('active');
                content.classList.remove('hidden');
            } else {
                content.classList.remove('active');
                content.classList.add('hidden');
            }
            
            if (icon) {
                icon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            }

            // Cerrar otros FAQs
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    const otherContent = otherTrigger.nextElementSibling;
                    const otherIcon = otherTrigger.querySelector('i');
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherContent.classList.remove('active');
                    otherContent.classList.add('hidden');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0)';
                    }
                }
            });
        });
    });

    // CIRCULARES DE ACTUALIDAD
    const circularBtns = document.querySelectorAll('.leer-circular-btn');
    circularBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const article = this.closest('article');
            const circularContent = article.querySelector('.circular-content');
            const icon = this.querySelector('i');
            const isVisible = circularContent && circularContent.classList.contains('active');

            // Cerrar otros circulares
            document.querySelectorAll('.circular-content').forEach(content => {
                if (content !== circularContent && content.classList.contains('active')) {
                    content.classList.remove('active');
                    content.classList.add('hidden');
                    const otherBtn = content.closest('article')?.querySelector('.leer-circular-btn i');
                    if (otherBtn) {
                        otherBtn.style.transform = 'rotate(0)';
                    }
                }
            });

            if (circularContent) {
                if (!isVisible) {
                    circularContent.classList.add('active');
                    circularContent.classList.remove('hidden');
                } else {
                    circularContent.classList.remove('active');
                    circularContent.classList.add('hidden');
                }
                
                if (icon) {
                    icon.style.transform = !isVisible ? 'rotate(90deg)' : 'rotate(0)';
                }
            }
        });
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;

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

    // FORMSPREE FORM SUBMISSION
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('✓ Gracias por contactar a FLC Abogados Tributarios. Hemos recibido su solicitud y un especialista se comunicará con usted en menos de 24 horas hábiles.');
                    this.reset();
                } else {
                    const data = await response.json();
                    const errorMsg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Error desconocido';
                    alert('⚠️ Hubo un problema al enviar el mensaje: ' + errorMsg + '\n\nPor favor, intente nuevamente o contáctenos directamente por WhatsApp.');
                }
            } catch (error) {
                alert('⚠️ Error de conexión. Por favor, verifique su internet o contáctenos directamente por WhatsApp.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }

    // ANIMACIONES ON-SCROLL
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

    document.querySelectorAll('.animate-fade-in').forEach(el => {
        observer.observe(el);
    });

    // NAVBAR SCROLL EFFECT
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
        handleScroll();
    }
});

// FUNCIONES PARA MODALES
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Cerrar modal al hacer click fuera
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('fixed')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = '';
    }
});