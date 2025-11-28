// Плавная прокрутка к секциям
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Управление модальными окнами
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Жазылу сәтті жіберілді! Біз сізбен жақын арада байланысамыз.');
            closeModal('registerModal');
        });
    }

    // Обработка формы входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Кіру сәтті аяқталды!');
            closeModal('loginModal');
        });
    }

    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Хабарлама сәтті жіберілді! Біз сізбен жақын арада байланысамыз.');
            closeModal('contactModal');
            contactForm.reset();
        });
    }

    // AI Chat функциональность
    const aiChatForm = document.getElementById('aiChatForm');
    const chatMessages = document.getElementById('chatMessages');
    const symptomInput = document.getElementById('symptomInput');

    if (aiChatForm) {
        aiChatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userMessage = symptomInput.value.trim();
            if (userMessage) {
                // Добавить сообщение пользователя
                addMessage(userMessage, 'user');
                symptomInput.value = '';

                // Имитация ответа AI
                setTimeout(() => {
                    const aiResponse = generateAIResponse(userMessage);
                    addMessage(aiResponse, 'ai');
                }, 1000);
            }
        });
    }
});

// Добавление сообщения в чат
function addMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const messageP = document.createElement('p');
    messageP.textContent = text;
    messageDiv.appendChild(messageP);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Генерация ответа AI (упрощенная версия)
function generateAIResponse(symptom) {
    const responses = [
        'Мен түсіндім. Бұл симптомдарға негізделген, мен сізге келесі ұсыныстар бере аламын:\n\n1. Денсаулық жағдайыңызды бақылап отырыңыз\n2. Егер симптомдар нашарласа, дәрігерге көріну қажет\n3. Әдетте денені тыныштықта ұстау керек',
        'Жоғарыда сипатталған симптомдарға сүйене отырып, сізге келесі ұсыныстарды бере аламын:\n\n• Денсаулық жағдайыңызды бақылап отырыңыз\n• Керекті болса, термометрмен дене температурасын өлшеңіз\n• Егер күйіңіз нашарласа, дәрігерге жүгініңіз',
        'Бұл симптомдар жалпы медициналық кеңес болуы мүмкін. Алайда, нақты диагностика үшін дәрігерге көріну қажет.\n\nМен сізге жергілікті дәрігерге жазылуға көмектесе аламын. Жазылу кестесін көргіңіз келе ме?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применить анимацию к элементам
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.qyzmetter-grid > div, .advantage-card, .about-platform > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Счетчик анимация для статистики
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + '+';
        }
    }, 16);
}

// Запуск анимации счетчиков при появлении в viewport
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = parseInt(entry.target.textContent.replace(/\D/g, ''));
            if (target) {
                animateCounter(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.about-platform h5');
    stats.forEach(stat => statsObserver.observe(stat));
});

