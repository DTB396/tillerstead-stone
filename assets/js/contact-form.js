document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        
        // Filter out empty fields and bot fields
        const filteredData = {};
        for (let [key, value] of formData.entries()) {
            // Skip honeypot and other bot-trap fields
            if (key.match(/^(honeypot|website|url|link)$/i)) {
                continue;
            }
            if (value.trim() !== '') {
                filteredData[key] = value;
            }
        }

        // Send to Formspree
        fetch(form.action, {
            method: 'POST',
            body: JSON.stringify(filteredData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                form.reset();
                
                // Redirect to success page after 2 seconds
                setTimeout(function() {
                    window.location.href = '/success.html';
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            console.error('Error:', error);
        });
    });
});
