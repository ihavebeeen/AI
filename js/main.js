// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-links a');
const faqItems = document.querySelectorAll('.faq-item');

// Scroll Animation for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
    } else {
        header.style.boxShadow = 'var(--shadow-sm)';
    }
});

// Smooth Scroll for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// FAQ Accordion
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
        const isOpen = question.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            const q = faqItem.querySelector('.faq-question');
            const a = faqItem.querySelector('.faq-answer');
            q.classList.remove('active');
            a.style.maxHeight = null;
        });
        
        // Open clicked item if it was closed
        if (!isOpen) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
    });
});

// Early Access Form Submission
earlyAccessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = earlyAccessForm.querySelector('input[type="email"]');
    const submitButton = earlyAccessForm.querySelector('button');
    const email = emailInput.value;
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 처리중...';
        
        // TODO: Replace with actual API endpoint
        const response = await fetch('/api/early-access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            showNotification('성공!', '사전 예약이 완료되었습니다. 안내 메일을 확인해주세요.', 'success');
            emailInput.value = '';
        } else {
            throw new Error('서버 오류가 발생했습니다.');
        }
    } catch (error) {
        showNotification('오류', error.message, 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>얼리 액세스 신청</span><i class="fas fa-arrow-right"></i>';
    }
});

// Notification System
function showNotification(title, message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for Animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Add animation to elements
document.querySelectorAll('.feature-card, .benefit-card, .timeline-item').forEach(el => {
    animateOnScroll.observe(el);
}); 
