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

// Contact form submission with Formspree
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    messageDiv.style.display = 'none';

    // Prepare form data
    const formData = new FormData(form);

    // Send form data to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success
            messageDiv.style.display = 'block';
            messageDiv.innerHTML = '<div style="color: #28a745; background: #d4edda; padding: 1rem; border-radius: 5px; border: 1px solid #c3e6cb;">✅ Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.</div>';
            form.reset();
        } else {
            // Error
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        // Error handling
        messageDiv.style.display = 'block';
        messageDiv.innerHTML = '<div style="color: #dc3545; background: #f8d7da; padding: 1rem; border-radius: 5px; border: 1px solid #f5c6cb;">❌ Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement à <a href="mailto:bleould@gmail.com">bleould@gmail.com</a></div>';
        console.error('Erreur:', error);
    })
    .finally(() => {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Envoyer la demande';
    });
});

// Portfolio gallery lightbox
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

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.borderRadius = '10px';

        const modalText = document.createElement('div');
        modalText.innerHTML = overlay.innerHTML;
        modalText.style.position = 'absolute';
        modalText.style.bottom = '20px';
        modalText.style.left = '20px';
        modalText.style.right = '20px';
        modalText.style.color = 'white';
        modalText.style.textAlign = 'center';

        modal.appendChild(modalImg);
        modal.appendChild(modalText);
        document.body.appendChild(modal);

        modal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-item, .portfolio-item, .info-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});