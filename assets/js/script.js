// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Binary Animation
    createBinaryAnimation();
    
    // Sample Works Slider
    initSampleSlider();
    
    // Form Validation
    initFormValidation();
});

// Create the binary animation effect
function createBinaryAnimation() {
    const binaryContainer = document.getElementById('binary-animation');
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Number of binary elements to create
    const numberOfElements = 50;
    
    for (let i = 0; i < numberOfElements; i++) {
        // Create a span for each binary digit
        const binaryElement = document.createElement('span');
        binaryElement.classList.add('binary');
        
        // Randomly choose between 0 and 1
        binaryElement.textContent = Math.random() > 0.5 ? '1' : '0';
        
        // Random position
        const posX = Math.floor(Math.random() * viewportWidth);
        const startY = Math.floor(Math.random() * viewportHeight);
        
        // Random animation duration between 10-30 seconds
        const duration = Math.random() * 20 + 10;
        
        // Random delay for animation start
        const delay = Math.random() * 10;
        
        // Random opacity between 0.1 and 0.3
        const opacity = Math.random() * 0.2 + 0.1;
        
        // Set styles
        binaryElement.style.left = `${posX}px`;
        binaryElement.style.top = `${startY}px`;
        binaryElement.style.animationDuration = `${duration}s`;
        binaryElement.style.animationDelay = `${delay}s`;
        binaryElement.style.opacity = opacity;
        
        // Add to container
        binaryContainer.appendChild(binaryElement);
    }
}

// Initialize sample works slider
function initSampleSlider() {
    const slider = document.getElementById('samples-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const boxes = document.querySelectorAll('.sample-box');
    
    // Determine how many boxes to show at once based on screen width
    let itemsToShow = 3;
    
    function updateItemsToShow() {
        if (window.innerWidth < 768) {
            itemsToShow = 1;
        } else if (window.innerWidth < 992) {
            itemsToShow = 2;
        } else {
            itemsToShow = 3;
        }
        updateSlider();
    }
    
    // Initial check
    updateItemsToShow();
    
    // Update on window resize
    window.addEventListener('resize', updateItemsToShow);
    
    let currentIndex = 0;
    
    function updateSlider() {
        // Calculate width of a box plus margin
        const boxWidth = slider.offsetWidth / itemsToShow;
        
        // Update box widths
        boxes.forEach(box => {
            box.style.minWidth = `${boxWidth}px`;
        });
        
        // Translate the slider
        slider.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
        slider.style.transition = 'transform 0.5s ease';
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= boxes.length - itemsToShow;
        
        // Visual indication of disabled state
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Event listeners for prev/next buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < boxes.length - itemsToShow) {
            currentIndex++;
            updateSlider();
        }
    });
}

// Initialize form validation
function initFormValidation() {
    const form = document.getElementById('registration-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form elements
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const course = document.getElementById('course');
            
            // Simple validation
            let isValid = true;
            let errorMessage = '';
            
            // Validate name
            if (!name.value.trim()) {
                isValid = false;
                errorMessage += 'Name is required.\n';
                name.style.borderColor = 'red';
            } else {
                name.style.borderColor = '';
            }
            
            // Validate phone
            if (!phone.value.trim()) {
                isValid = false;
                errorMessage += 'Phone number is required.\n';
                phone.style.borderColor = 'red';
            } else {
                phone.style.borderColor = '';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = '';
            }
            
            // Validate course selection
            if (!course.value) {
                isValid = false;
                errorMessage += 'Please select a course package.\n';
                course.style.borderColor = 'red';
            } else {
                course.style.borderColor = '';
            }
            
            // Show alert for errors or submit form
            if (!isValid) {
                alert('Please fix the following errors:\n' + errorMessage);
            } else {
                // Form submission would happen here in a real application
                // For now, we'll just show a success message
                alert('Thank you for registering! We will contact you shortly.');
                form.reset();
            }
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '20px 0';
    }
});