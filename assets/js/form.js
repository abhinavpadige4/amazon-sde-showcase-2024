// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form) return;
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset form status
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Get form values
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        
        // Validate form
        if (!validateForm(name, email, message)) {
            return;
        }
        
        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        
        // Disable form during submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call (replace with actual Formspree endpoint)
        setTimeout(() => {
            // In a real implementation, this would be:
            // fetch(form.action, {
            //     method: 'POST',
            //     body: new FormData(form),
            //     headers: { 'Accept': 'application/json' }
            // })
            
            // For demo purposes, simulate success
            const isSuccess = Math.random() > 0.2; // 80% success rate
            
            if (isSuccess) {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'form-status success';
                form.reset();
            } else {
                formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                formStatus.className = 'form-status error';
            }
            
            // Re-enable form
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 1500);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const group = this.closest('.form-group');
            if (group) {
                group.classList.remove('error', 'success');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            }
        });
        
        input.addEventListener('blur', function() {
            const group = this.closest('.form-group');
            if (group && this.value.trim() === '') {
                group.classList.add('error');
                if (!group.querySelector('.error-message')) {
                    const errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    group.appendChild(errorMsg);
                }
            }
        });
    });
    
    // Form validation function
    function validateForm(name, email, message) {
        let isValid = true;
        
        // Validate name
        if (name === '') {
            setError(form.name, 'Name is required');
            isValid = false;
        } else if (name.length < 2) {
            setError(form.name, 'Name must be at least 2 characters');
            isValid = false;
        } else {
            setSuccess(form.name);
        }
        
        // Validate email
        if (email === '') {
            setError(form.email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError(form.email, 'Please enter a valid email address');
            isValid = false;
        } else {
            setSuccess(form.email);
        }
        
        // Validate message
        if (message === '') {
            setError(form.message, 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            setError(form.message, 'Message must be at least 10 characters');
            isValid = false;
        } else {
            setSuccess(form.message);
        }
        
        return isValid;
    }
    
    // Helper functions
    function setError(input, message) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.add('error');
            // Remove existing error message if any
            const existingError = group.querySelector('.error-message');
            if (existingError) existingError.remove();
            
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            errorMsg.textContent = message;
            group.appendChild(errorMsg);
        }
    }
    
    function setSuccess(input) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.remove('error');
            group.classList.add('success');
            // Remove error message if exists
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});