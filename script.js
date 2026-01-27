// script.js - Complete JavaScript for Quality Hub Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle - Fixed
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');  // Fixed: Should target nav, not nav ul
    const header = document.querySelector('header');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            nav.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Typing effect for homepage - Fixed
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const typingStrings = [
            "Advanced Bio-Digester Technology",
            "No Smell, No Emptying Required",
            "Eco-Friendly Sanitation Solutions",
            "Cost-Effective Waste Management"
        ];
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let cursorVisible = true;
        
        // Add blinking cursor effect
        setInterval(() => {
            const cursor = document.querySelector('.typing-cursor');
            if (cursor) {
                cursor.style.opacity = cursorVisible ? '1' : '0';
                cursorVisible = !cursorVisible;
            }
        }, 500);
        
        function type() {
            const currentString = typingStrings[stringIndex];
            
            if (!isDeleting && charIndex < currentString.length) {
                typingElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            } else if (isDeleting && charIndex > 0) {
                typingElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 500; // Pause before next word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing after 1 second
        setTimeout(type, 1000);
        
        // Add cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.marginLeft = '2px';
        typingElement.parentNode.appendChild(cursor);
    }
    
    // Animate stats on homepage
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        let statsAnimated = false;
        
        function animateStats() {
            if (statsAnimated) return;
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 30);
            });
        }
        
        // Check if stats are in view
        function checkStatsVisibility() {
            const statsSection = document.querySelector('.about-stats');
            if (!statsSection) return;
            
            const sectionPosition = statsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (sectionPosition.top < windowHeight - 100 && sectionPosition.bottom > 0) {
                animateStats();
            }
        }
        
        window.addEventListener('scroll', checkStatsVisibility);
        // Initial check
        checkStatsVisibility();
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error states
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate required fields
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            if (!isValid) {
                alert('Please fill in all required fields marked with *');
                return;
            }
            
            // Get form data
            const formData = {
                name: name.value,
                phone: phone.value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: message.value,
                date: new Date().toISOString()
            };
            
            // In a real implementation, this would send to a server
            console.log('Form submitted:', formData);
            
            // Show success message with animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Sent Successfully!';
                submitBtn.style.backgroundColor = '#2e7d32';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    contactForm.reset();
                }, 2000);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We will contact you within 24 hours.</p>
                `;
                successMessage.style.cssText = `
                    background-color: #d4edda;
                    color: #155724;
                    padding: 15px;
                    border-radius: 8px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: fadeIn 0.5s ease;
                `;
                
                // Remove any existing success message
                const existingMessage = contactForm.querySelector('.success-message');
                if (existingMessage) existingMessage.remove();
                
                contactForm.appendChild(successMessage);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
                
            }, 1500);
        });
        
        // Add input validation on blur
        const requiredInputs = contactForm.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Project gallery modal - Fixed selector
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const bgImage = this.style.backgroundImage;
            const src = bgImage.slice(5, -2); // Remove "url(" and ")"
            openModal(src);
        });
    });
    
    function openModal(src) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="Project Image" style="width:100%; max-height:80vh; object-fit:contain;">
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Close modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                    document.removeEventListener('keydown', closeOnEscape);
                }, 300);
            }
        });
    }
    
    // Add modal styles dynamically
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .close-modal {
            position: absolute;
            top: -50px;
            right: 0;
            color: white;
            font-size: 3rem;
            cursor: pointer;
            background: none;
            border: none;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-modal:hover {
            color: var(--gold);
            transform: scale(1.1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop();
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
                link.classList.add('active');
            } else if (currentPage === linkPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNav();
    
    // Initialize animations for elements in view
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .choose-card, .trust-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(el);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            animatedElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }
    }
    
    // Initialize animations after page load
    setTimeout(initializeAnimations, 300);
    
    // Add CSS for form errors and animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        .form-control.error {
            border-color: #e74c3c !important;
            background-color: rgba(231, 76, 60, 0.05) !important;
        }
        
        .form-control.error:focus {
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
        }
        
        .typing-cursor {
            color: var(--gold);
            font-weight: 300;
            animation: blink 1s infinite;
        }
        
        .scrolled {
            background-color: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1) !important;
            padding: 0.5rem 0 !important;
        }
        
        nav.active {
            left: 0 !important;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(additionalStyles);
    
    // Add current year to copyright
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2026', currentYear);
    }
});
