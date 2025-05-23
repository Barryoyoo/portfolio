document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            formMessages.textContent = '';
            formMessages.className = 'form-messages'; 

            const formData = new FormData(contactForm);
            const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT_HERE';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' 
                    }
                });

                if (response.ok) {
                    formMessages.textContent = 'Thank you for your message! I will get back to you soon.';
                    formMessages.classList.add('success');
                    contactForm.reset(); 
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formMessages.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formMessages.textContent = 'Oops! There was a problem sending your message.';
                    }
                    formMessages.classList.add('error');
                }
            } catch (error) {
                formMessages.textContent = 'Network error. Please try again later.';
                formMessages.classList.add('error');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        });
    }
});

// ... rest of your script.js code (Swiper navigation, skill bar animation, etc.) ...