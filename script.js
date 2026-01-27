// script.js - Enhanced JavaScript for Quality Hub Website

class QualityHubWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.initLoadingScreen();
        this.initMobileMenu();
        this.initScrollEffects();
        this.initTypingEffect();
        this.initAnimations();
        this.initFormHandling();
        this.initGallery();
        this.initBackToTop();
        this.initServiceCardEffects();
        this.initFormValidation();
        this.initPageTransition();
    }

    // Loading Screen
    initLoadingScreen() {
        // Add loading screen to DOM
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <i class="fas fa-leaf"></i>
                    <span>QualityHub</span>
                </div>
                <div class="loading-spinner">
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                    <div class="spinner-circle"></div>
                </div>
                <p>Loading...</p>
            </div>
        `;
        document.body.appendChild(loadingScreen);

        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                setTimeout(() => loadingScreen.remove(), 500);
            }, 800);
        });

        // Fallback: hide loading screen after 3 seconds max
        setTimeout(() => {
            if (document.body.contains(loadingScreen)) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                setTimeout(() => loadingScreen.remove(), 500);
            }
        }, 3000);
    }

    // Mobile Menu with Smooth Animations
    initMobileMenu() {
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.nav = document.querySelector('nav');
        this.navList = document.querySelector('nav ul');
        this.navLinks = document.querySelectorAll('nav a');
        
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'nav-overlay';
        document.body.appendChild(this.overlay);
        
        // Mobile menu toggle
        this.mobileMenuBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Close menu on overlay click
        this.overlay.addEventListener('click', () => this.closeMobileMenu());
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.nav?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.nav?.classList.contains('active') && 
                !this.nav.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (!this.nav || !this.navList) return;
        
        const isOpening = !this.nav.classList.contains('active');
        
        // Toggle active class with smooth transition
        this.nav.classList.toggle('active');
        this.navList.classList.toggle('active');
        this.overlay.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        // Animate hamburger icon
        this.animateHamburgerIcon(isOpening);
        
        // Animate menu items
        if (isOpening) {
            this.animateMenuItemsIn();
        }
    }

    closeMobileMenu() {
        if (!this.nav?.classList.contains('active')) return;
        
        this.nav.classList.remove('active');
        this.navList.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.animateHamburgerIcon(false);
    }

    animateHamburgerIcon(isOpening) {
        if (!this.mobileMenuBtn) return;
        
        const icon = this.mobileMenuBtn.querySelector('i');
        if (!icon) return;
        
        this.mobileMenuBtn.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (isOpening) {
            icon.classList.replace('fa-bars', 'fa-times');
            this.mobileMenuBtn.style.transform = 'rotate(180deg)';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            this.mobileMenuBtn.style.transform = 'rotate(0)';
        }
    }

    animateMenuItemsIn() {
        const navItems = this.navList?.querySelectorAll('li');
        if (!navItems) return;
        
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            item.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });
    }

    // Scroll Effects
    initScrollEffects() {
        const header = document.querySelector('header');
        const backToTopBtn = document.querySelector('.back-to-top') || this.createBackToTopButton();
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Header effect
            if (header) {
                if (currentScroll > scrollThreshold) {
                    header.classList.add('scrolled');
                    
                    // Hide/show header on scroll direction
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                } else {
                    header.classList.remove('scrolled');
                    header.style.transform = 'translateY(0)';
                }
            }
            
            // Back to top button
            if (backToTopBtn) {
                if (currentScroll > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }
            
            // Parallax effect for hero section
            const hero = document.querySelector('.hero');
            if (hero && currentScroll < 500) {
                const scrolled = currentScroll * 0.5;
                hero.style.transform = `translateY(${scrolled}px)`;
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Improved Typing Effect
    initTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const typingStrings = [
            "Advanced Bio-Digester Technology",
            "No Smell, No Emptying Required",
            "Eco-Friendly Sanitation Solutions",
            "Cost-Effective Waste Management"
        ];
        
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let typingSpeed = 100;
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        typingElement.parentNode.insertBefore(cursor, typingElement.nextSibling);
        
        function type() {
            if (isPaused) return;
            
            const currentString = typingStrings[stringIndex];
            
            if (!isDeleting && charIndex < currentString.length) {
                typingElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 70 + Math.random() * 30;
            } else if (isDeleting && charIndex > 0) {
                typingElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 500; // Pause before starting next
            }
            
            // Blink cursor
            cursor.style.opacity = (Date.now() % 1000) < 500 ? '1' : '0.5';
            
            setTimeout(type, typingSpeed);
        }
        
        // Pause typing on hover
        typingElement.addEventListener('mouseenter', () => isPaused = true);
        typingElement.addEventListener('mouseleave', () => {
            isPaused = false;
            setTimeout(type, typingSpeed);
        });
        
        // Start typing after a delay
        setTimeout(type, 1000);
    }

    // Animations & Intersection Observer
    initAnimations() {
        // Counter animation
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });
            
            counters.forEach(counter => counterObserver.observe(counter));
        }
        
        // Animate elements on scroll
        const animatedElements = document.querySelectorAll(
            '.feature-card, .service-card, .project-card, .choose-card, .trust-card, .mission-card, .vision-card, .contact-detail'
        );
        
        if (animatedElements.length) {
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        elementObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                elementObserver.observe(el);
            });
        }
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count') || element.textContent);
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Form Handling
    initFormHandling() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with better UX
            try {
                await this.simulateApiCall(data);
                
                // Show success message
                this.showFormMessage(contactForm, 'success', `
                    <h4><i class="fas fa-check-circle"></i> Message Sent Successfully!</h4>
                    <p>Thank you for contacting us. We will get back to you within 24 hours.</p>
                `);
                
                // Reset form
                contactForm.reset();
                
                // Reset validation styles
                contactForm.querySelectorAll('.form-control').forEach(input => {
                    input.style.borderColor = '';
                });
                
            } catch (error) {
                this.showFormMessage(contactForm, 'error', `
                    <h4><i class="fas fa-exclamation-circle"></i> Error Sending Message</h4>
                    <p>Please try again or contact us directly at 0925 939 325.</p>
                `);
            } finally {
                // Reset button
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            }
        });
    }

    simulateApiCall(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                // In production, you would send data to your server here
                resolve(data);
            }, 1500);
        });
    }

    showFormMessage(form, type, html) {
        // Remove existing messages
        const existingMsg = form.querySelector('.form-message');
        if (existingMsg) existingMsg.remove();
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = html;
        
        // Add styles for message
        const styles = {
            success: {
                background: '#d4edda',
                color: '#155724',
                border: '1px solid #c3e6cb'
            },
            error: {
                background: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb'
            }
        };
        
        Object.assign(messageDiv.style, {
            padding: '1.5rem',
            borderRadius: 'var(--border-radius-small)',
            marginTop: '1rem',
            animation: 'slideInDown 0.3s ease'
        }, styles[type]);
        
        form.appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Gallery Modal
    initGallery() {
        const projectImages = document.querySelectorAll('.project-img, .service-img');
        
        projectImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                const bgImage = window.getComputedStyle(img).backgroundImage;
                const src = bgImage.slice(5, -2);
                this.openModal(src);
            });
        });
    }

    openModal(src) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <button class="modal-close" aria-label="Close modal">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-content">
                    <img src="${src}" alt="Enlarged view" loading="lazy">
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close handlers
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
        
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.parentNode) {
                closeModal();
            }
        });
    }

    // Back to Top Button
    initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top') || this.createBackToTopButton();
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    createBackToTopButton() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', 'Back to top');
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        document.body.appendChild(btn);
        return btn;
    }

    // Service Card Effects
    initServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card, .feature-card');
        
        serviceCards.forEach(card => {
            // Tilt effect on hover
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px)
                `;
                
                // Glow effect
                const glow = card.querySelector('.card-glow') || document.createElement('div');
                glow.className = 'card-glow';
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
                if (!card.contains(glow)) card.appendChild(glow);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                const glow = card.querySelector('.card-glow');
                if (glow) glow.remove();
            });
        });
    }

    // Form Validation
    initFormValidation() {
        const formInputs = document.querySelectorAll('.form-control');
        
        formInputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
            
            // Blur validation
            input.addEventListener('blur', () => {
                this.validateInput(input, true);
            });
            
            // Focus effect
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    validateInput(input, showMessage = false) {
        const isValid = input.checkValidity();
        const isEmpty = input.value.trim() === '';
        
        input.classList.remove('valid', 'invalid');
        
        if (isEmpty) {
            input.style.borderColor = '';
            return;
        }
        
        if (isValid) {
            input.classList.add('valid');
            input.style.borderColor = 'var(--accent-green)';
        } else {
            input.classList.add('invalid');
            input.style.borderColor = '#dc3545';
            
            if (showMessage && input.validationMessage) {
                this.showInputError(input, input.validationMessage);
            }
        }
    }

    showInputError(input, message) {
        // Remove existing error
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: slideInDown 0.3s ease;
        `;
        
        input.parentElement.appendChild(errorDiv);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            errorDiv.style.opacity = '0';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

    // Smooth Page Transitions
    initPageTransition() {
        const links = document.querySelectorAll('a[href]:not([href^="#"])');
        
        links.forEach(link => {
            if (link.href && link.href.includes(window.location.origin)) {
                link.addEventListener('click', (e) => {
                    if (link.target === '_blank' || link.hasAttribute('download')) return;
                    
                    e.preventDefault();
                    const href = link.getAttribute('href');
                    
                    // Add fade out animation
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        /* Loading Screen */
        .loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--white);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
        }
        
        .loading-logo {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
        
        .loading-spinner {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .spinner-circle {
            width: 12px;
            height: 12px;
            background: var(--primary);
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .spinner-circle:nth-child(1) { animation-delay: -0.32s; }
        .spinner-circle:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        
        /* Mobile Menu */
        .nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(3px);
        }
        
        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        nav ul {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @media (max-width: 768px) {
            nav {
                position: fixed;
                top: 0;
                right: 0;
                width: 300px;
                height: 100vh;
                background: var(--white);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
                padding: 2rem;
            }
            
            nav.active {
                transform: translateX(0);
            }
            
            nav ul {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 4rem;
            }
            
            nav ul li {
                opacity: 0;
                transform: translateX(20px);
            }
            
            nav ul li a {
                font-size: 1.2rem;
                padding: 1rem;
                display: block;
                border-radius: var(--border-radius);
                transition: all 0.3s ease;
            }
            
            nav ul li a:hover {
                background: var(--light-gray);
                transform: translateX(10px);
            }
        }
        
        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background: var(--accent-green);
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Typing Cursor */
        .typing-cursor {
            color: var(--accent-gold);
            font-weight: 300;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        /* Animations */
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .feature-card.animated,
        .service-card.animated,
        .project-card.animated,
        .choose-card.animated,
        .trust-card.animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        /* Card Glow Effect */
        .card-glow {
            position: absolute;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle at center, 
                rgba(42, 157, 143, 0.2) 0%,
                rgba(42, 157, 143, 0.1) 50%,
                transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1;
        }
        
        /* Modal */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .modal-container {
            position: relative;
            z-index: 2;
            max-width: 90%;
            max-height: 90%;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal.active .modal-container {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--accent-green);
            transform: scale(1.2);
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: var(--border-radius);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        
        /* Form Validation */
        .form-control.valid {
            border-color: var(--accent-green) !important;
        }
        
        .form-control.invalid {
            border-color: #dc3545 !important;
        }
        
        .form-group.focused label {
            color: var(--primary);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the website
    new QualityHubWebsite();
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        window.location.reload();
    }
});
