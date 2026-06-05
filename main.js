// main.js
document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ ACCORDION CON APERTURA DINÁMICA POR EVENTO CLICK
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('active', !isExpanded);
            if (icon) {
                icon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0)';
            }
            
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

    // INTERACCIÓN ACTUALIDAD FISCAL (Preparado para despliegue futuro al dar click en circulares)
    const circularCards = document.querySelectorAll('.circular-card');
    
    circularCards.forEach(card => {
        card.addEventListener('click', function() {
            const expandedContent = this.querySelector('.circular-expanded-content');
            const arrowIcon = this.querySelector('.fa-arrow-right');
            
            if (expandedContent) {
                const isHidden = expandedContent.classList.contains('hidden');
                
                // Cierra otras circulares primero
                document.querySelectorAll('.circular-expanded-content').forEach(content => {
                    content.classList.add('hidden');
                });
                document.querySelectorAll('.circular-card .fa-arrow-right').forEach(icon => {
                    icon.style.transform = 'rotate(0)';
                });

                if (isHidden) {
                    expandedContent.classList.remove('hidden');
                    if (arrowIcon) arrowIcon.style.transform = 'rotate(90deg)';
                } else {
                    expandedContent.classList.add('hidden');
                    if (arrowIcon) arrowIcon.style.transform = 'rotate(0)';
                }
            }
        });
    });
    
    // SMOOTH SCROLL CON OFFSET DE NAVBAR PARA MÓVILES
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 96;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 10;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FORMSPREE FORM SUBMISSION (Original)
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
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    alert('✓ Consulta recibida. Nos comunicaremos a la brevedad.');
                    this.reset();
                } else {
                    alert('❌ Hubo un inconveniente al enviar su consulta.');
                }
            } catch (error) {
                alert('❌ Ocurrió un error de conexión.');
            } finally {
                btn.disabled = false;
                btn.innerHTML = originalText;
            }
        });
    }
});

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) { modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) { modal.classList.add('hidden'); document.body.style.overflow = ''; }
}