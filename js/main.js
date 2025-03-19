/**
 * GrowFreight Main JavaScript
 * Contains all functionality for the website
 */

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Floating Quote Button
const floatingQuote = document.getElementById('floatingQuote');
if (floatingQuote) {
    floatingQuote.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Animate statistics on scroll
const statsObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start animation for all stat numbers
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const targetValue = stat.textContent;
                let current = 0;
                
                // Handle numbers with plus sign or M+
                if (targetValue.includes('M+')) {
                    const value = parseFloat(targetValue);
                    const increment = value / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            clearInterval(timer);
                            current = value;
                        }
                        stat.textContent = Math.round(current * 10) / 10 + 'M+';
                    }, 40);
                } 
                else if (targetValue.includes('+')) {
                    const value = parseFloat(targetValue);
                    const increment = value / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            clearInterval(timer);
                            current = value;
                        }
                        stat.textContent = Math.round(current) + '+';
                    }, 40);
                }
                else if (targetValue.includes('%')) {
                    const value = parseFloat(targetValue);
                    const increment = value / 50;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= value) {
                            clearInterval(timer);
                            current = value;
                        }
                        stat.textContent = Math.round(current) + '%';
                    }, 40);
                }
            });
            
            // Unobserve once animation is triggered
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success mt-3';
            alertDiv.role = 'alert';
            alertDiv.innerHTML = `
                <div class="d-flex align-items-center">
                    <i class="fas fa-check-circle me-2"></i>
                    <div>
                        <strong>Message Sent Successfully!</strong>
                        <p class="mb-0">Thank you for contacting GrowFreight. One of our representatives will get back to you shortly.</p>
                    </div>
                </div>
            `;
            
            this.appendChild(alertDiv);
            
            // Scroll to see the alert
            alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                alertDiv.classList.add('fade');
                setTimeout(() => {
                    alertDiv.remove();
                }, 500);
            }, 5000);
        }, 1500);
    });
}

// Create animated background for hero section
function createAnimatedBackground() {
    const animatedBg = document.querySelector('.animated-bg');
    if (!animatedBg) return;
    
    const spans = animatedBg.querySelectorAll('span');
    
    spans.forEach((span, index) => {
        const size = Math.random() * 100 + 20;
        const posX = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10;
        
        span.style.width = size + 'px';
        span.style.height = size + 'px';
        span.style.left = posX + '%';
        span.style.animationDelay = delay + 's';
        span.style.animationDuration = duration + 's';
    });
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated background
    createAnimatedBackground();
    
    // Apply hero background image
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.style.backgroundImage = 
            'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.75)), url("https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJ1Y2tzJTIwb24lMjBoaWdod2F5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")';
    }
    
    // Initialize any third-party plugins or components here
}); 