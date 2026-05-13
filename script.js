// Smooth scrolling for navigation links
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

// Secure form validation - SECURITY: Validate all inputs before submission
function validateForm(form) {
    const nom = form.querySelector('input[name="nom"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const service = form.querySelector('select[name="service"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();
    
    // Basic validation
    if (!nom || nom.length < 2) {
        return { valid: false, error: 'Le nom est requis (minimum 2 caractères)' };
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { valid: false, error: 'Email invalide' };
    }
    if (!service) {
        return { valid: false, error: 'Veuillez sélectionner un service' };
    }
    if (!message || message.length < 10) {
        return { valid: false, error: 'Le message est requis (minimum 10 caractères)' };
    }
    return { valid: true };
}

// SECURITY: Sanitize HTML content to prevent XSS
function sanitizeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// SECURITY: Create safe success/error messages using DOM methods
function showSuccessMessage(messageDiv) {
    const div = document.createElement('div');
    div.className = 'form-success-message';
    div.style.cssText = 'color: #28a745; background: #d4edda; padding: 1rem; border-radius: 5px; border: 1px solid #c3e6cb;';
    const span = document.createElement('span');
    span.textContent = '✅ Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.';
    div.appendChild(span);
    messageDiv.innerHTML = '';
    messageDiv.appendChild(div);
    messageDiv.style.display = 'block';
}

function showErrorMessage(messageDiv) {
    const div = document.createElement('div');
    div.className = 'form-error-message';
    div.style.cssText = 'color: #dc3545; background: #f8d7da; padding: 1rem; border-radius: 5px; border: 1px solid #f5c6cb;';
    const span = document.createElement('span');
    span.textContent = '❌ Une erreur s\'est produite. Veuillez réessayer.';
    div.appendChild(span);
    messageDiv.innerHTML = '';
    messageDiv.appendChild(div);
    messageDiv.style.display = 'block';
}

// SECURITY: Add rate limiting to prevent spam submissions
let lastFormSubmit = 0;
const FORM_SUBMIT_THROTTLE = 2000; // 2 seconds between submissions

// Contact form submission with Formspree
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');
    
    // SECURITY: Rate limiting
    const now = Date.now();
    if (now - lastFormSubmit < FORM_SUBMIT_THROTTLE) {
        messageDiv.style.display = 'block';
        const div = document.createElement('div');
        div.style.cssText = 'color: #ff9800; background: #fff3cd; padding: 1rem; border-radius: 5px; border: 1px solid #ffc107;';
        div.textContent = 'Veuillez attendre quelques secondes avant de réessayer.';
        messageDiv.innerHTML = '';
        messageDiv.appendChild(div);
        return;
    }

    // SECURITY: Validate form inputs
    const validation = validateForm(form);
    if (!validation.valid) {
        messageDiv.style.display = 'block';
        const div = document.createElement('div');
        div.style.cssText = 'color: #ff9800; background: #fff3cd; padding: 1rem; border-radius: 5px; border: 1px solid #ffc107;';
        div.textContent = '⚠️ ' + validation.error;
        messageDiv.innerHTML = '';
        messageDiv.appendChild(div);
        return;
    }

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    messageDiv.style.display = 'none';
    lastFormSubmit = now;

    // Prepare form data
    const formData = new FormData(form);

    // Send form data to Formspree with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        },
        signal: controller.signal
    })
    .then(response => {
        clearTimeout(timeout);
        if (response.ok) {
            showSuccessMessage(messageDiv);
            form.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        clearTimeout(timeout);
        showErrorMessage(messageDiv);
        console.error('Erreur:', error);
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer la demande';
    });
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // SECURITY: Initialize lazy loading for images (improves performance)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Portfolio gallery lightbox - SECURITY: Use safe DOM methods instead of innerHTML
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = this.querySelector('.portfolio-overlay');

        // Create a simple modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        modal.style.cursor = 'pointer';
        modal.style.backdropFilter = 'blur(5px)';
        modal.style.animation = 'fadeIn 0.3s ease';

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '10px';
        modalImg.style.objectFit = 'contain';

        // SECURITY: Clone overlay content safely
        const modalText = document.createElement('div');
        modalText.style.position = 'absolute';
        modalText.style.bottom = '20px';
        modalText.style.left = '20px';
        modalText.style.right = '20px';
        modalText.style.color = 'white';
        modalText.style.textAlign = 'center';
        
        // Copy text content safely
        const overlayH4 = overlay.querySelector('h4');
        const overlayP = overlay.querySelector('p');
        
        if (overlayH4) {
            const h4 = document.createElement('h4');
            h4.textContent = overlayH4.textContent;
            modalText.appendChild(h4);
        }
        if (overlayP) {
            const p = document.createElement('p');
            p.textContent = overlayP.textContent;
            modalText.appendChild(p);
        }

        modal.appendChild(modalImg);
        modal.appendChild(modalText);
        document.body.appendChild(modal);

        // Close on click
        modal.addEventListener('click', function() {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        });
        
        // Close on Escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                modal.click();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    });
});

// PERFORMANCE: Throttle scroll event for header effect to prevent jank
let scrollTimeout;
let lastScrollY = 0;

function updateHeaderOnScroll() {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100 && lastScrollY <= 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else if (scrollY <= 100 && lastScrollY > 100) {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
    lastScrollY = scrollY;
}

// PERFORMANCE: Use passive event listener and requestAnimationFrame for smooth scrolling
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(updateHeaderOnScroll);
}, { passive: true });

// PERFORMANCE: Optimize animations on scroll with GPU acceleration
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Use transform3d for GPU acceleration
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate3d(0, 0, 0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation with will-change optimization
document.querySelectorAll('.service-item, .portfolio-item, .info-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translate3d(0, 20px, 0)';
    item.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    item.style.willChange = 'opacity, transform';
    observer.observe(item);
    
    // Remove will-change after animation completes to save memory
    item.addEventListener('transitionend', () => {
        if (item.classList.contains('animated')) {
            item.style.willChange = 'auto';
        }
    }, { once: true });
});