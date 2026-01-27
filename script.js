// script.js - Complete JavaScript for Quality Hub Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
    
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Change menu icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileMenuBtn.style.transform = 'rotate(90deg)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileMenuBtn.style.transform = 'rotate(0)';
        }
    }
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking overlay
    navOverlay.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Typing effect for homepage
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
        
        function type() {
            const currentString = typingStrings[stringIndex];
            
            if (!isDeleting && charIndex < currentString.length) {
                typingElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80 + Math.random() * 40;
            } else if (isDeleting && charIndex > 0) {
                typingElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 800;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1500);
    }
    
    // Animate stats on homepage
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        let statsAnimated = false;
        
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 30);
            });
            statsAnimated = true;
        }
        
        // Check if stats are in view
        function checkStatsVisibility() {
            const statsSection = document.querySelector('.about-stats');
            if (!statsSection || statsAnimated) return;
            
            const sectionPosition = statsSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (sectionPosition.top < windowHeight - 100) {
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
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real implementation, this would send to a server
                console.log('Form submitted:', formData);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 1.5rem; border-radius: var(--border-radius-small); margin-top: 1rem; border: 1px solid #c3e6cb;">
                        <h4 style="color: #155724; margin-bottom: 0.5rem;"><i class="fas fa-check-circle"></i> Message Sent Successfully!</h4>
                        <p style="color: #155724; margin: 0;">Thank you for contacting us. We will get back to you within 24 hours.</p>
                    </div>
                `;
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
            }, 1500);
        });
    }
    
    // Project gallery modal
    const projectImages = document.querySelectorAll('.project-img');
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const bgImage = this.style.backgroundImage;
            const src = bgImage.slice(5, -2);
            openModal(src);
        });
    });
    
    function openModal(src) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal"><i class="fas fa-times"></i></span>
                <img src="${src}" alt="Project Image">
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add modal styles if not already added
        if (!document.querySelector('#modal-styles')) {
            const modalStyle = document.createElement('style');
            modalStyle.id = 'modal-styles';
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
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    animation: zoomIn 0.3s ease;
                }
                
                @keyframes zoomIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                
                .modal-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: var(--border-radius);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                }
                
                .close-modal {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    color: white;
                    font-size: 2.5rem;
                    cursor: pointer;
                    background: none;
                    border: none;
                    transition: var(--transition);
                }
                
                .close-modal:hover {
                    color: var(--accent-green);
                    transform: scale(1.2);
                }
            `;
            document.head.appendChild(modalStyle);
        }
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
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
                }, 300);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
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
            link.classList.remove('active');
            
            if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
                link.classList.add('active');
            } else if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNav();
    
    // Initialize animations for elements in view
    function initializeAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .service-card, .project-card, .choose-card, .trust-card, .mission-card, .vision-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize animations after page load
    setTimeout(initializeAnimations, 1000);
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = 'var(--accent-green)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
    
    // Add counter animation to stats
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Initialize counters when they come into view
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Add form validation styles
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#e0e0e0';
            } else if (this.checkValidity()) {
                this.style.borderColor = 'var(--accent-green)';
            } else {
                this.style.borderColor = '#dc3545';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = 'var(--primary)';
            }
        });
    });
});
