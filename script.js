        // Form validation script
        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');

        // Error message elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation functions
        function validateName() {
            const name = nameInput.value.trim();
            
            if (name === '') {
                showError(nameInput, nameError, 'Name is required');
                return false;
            }
            
            if (name.length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters long');
                return false;
            }
            
            if (!/^[a-zA-Z\s'-]+$/.test(name)) {
                showError(nameInput, nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes');
                return false;
            }
            
            hideError(nameInput, nameError);
            return true;
        }

        function validateEmail() {
            const email = emailInput.value.trim();
            
            if (email === '') {
                showError(emailInput, emailError, 'Email is required');
                return false;
            }
            
            if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                return false;
            }
            
            hideError(emailInput, emailError);
            return true;
        }

        function validateMessage() {
            const message = messageInput.value.trim();
            
            if (message === '') {
                showError(messageInput, messageError, 'Message is required');
                return false;
            }
            
            if (message.length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters long');
                return false;
            }
            
            if (message.length > 1000) {
                showError(messageInput, messageError, 'Message must be less than 1000 characters');
                return false;
            }
            
            hideError(messageInput, messageError);
            return true;
        }

        // Helper functions for showing/hiding errors
        function showError(input, errorElement, message) {
            input.classList.add('border-red-500', 'shake');
            input.classList.remove('border-gray-300');
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            
            // Remove shake animation after it completes
            setTimeout(() => {
                input.classList.remove('shake');
            }, 500);
        }

        function hideError(input, errorElement) {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
            errorElement.classList.add('hidden');
        }

        // Real-time validation on input
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        messageInput.addEventListener('blur', validateMessage);

        // Clear errors on focus
        nameInput.addEventListener('focus', () => hideError(nameInput, nameError));
        emailInput.addEventListener('focus', () => hideError(emailInput, emailError));
        messageInput.addEventListener('focus', () => hideError(messageInput, messageError));

        // Form submission handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide success message if visible
            successMessage.classList.add('hidden');
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            // If all validations pass
            if (isNameValid && isEmailValid && isMessageValid) {
                // Simulate form submission
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
                
                // Simulate network delay
                setTimeout(() => {
                    // Show success message
                    successMessage.classList.remove('hidden');
                    successMessage.classList.add('success-fade');
                    
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 1500);
            } else {
                // Focus on first invalid field
                if (!isNameValid) {
                    nameInput.focus();
                } else if (!isEmailValid) {
                    emailInput.focus();
                } else if (!isMessageValid) {
                    messageInput.focus();
                }
            }
        });

        // Character counter for message field
        messageInput.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1000;
            
            // Create or update character counter
            let counter = document.getElementById('messageCounter');
            if (!counter) {
                counter = document.createElement('div');
                counter.id = 'messageCounter';
                counter.className = 'text-xs text-gray-500 mt-1 text-right';
                messageInput.parentNode.appendChild(counter);
            }
            
            counter.textContent = `${currentLength}/${maxLength} characters`;
            
            if (currentLength > maxLength) {
                counter.classList.add('text-red-500');
                counter.classList.remove('text-gray-500');
            } else {
                counter.classList.remove('text-red-500');
                counter.classList.add('text-gray-500');
            }
        });
