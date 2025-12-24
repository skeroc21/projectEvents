// Конфигурация API
const API_BASE_URL = 'http://localhost:8000';

// Элементы DOM
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageModal = document.getElementById('message-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalOk = document.getElementById('modal-ok');
const closeModal = document.querySelector('.close-modal');

// Переключение между формами
loginTab.addEventListener('click', () => {
    switchToLogin();
});

registerTab.addEventListener('click', () => {
    switchToRegister();
});

function switchToLogin() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active-form');
    registerForm.classList.remove('active-form');
}

function switchToRegister() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active-form');
    loginForm.classList.remove('active-form');
}

// Показать/скрыть пароль
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Обработка формы входа
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Валидация
    if (!email || !password) {
        showMessage('Ошибка', 'Пожалуйста, заполните все поля');
        return;
    }
    
    // Показываем индикатор загрузки
    const submitBtn = this.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Вход...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        });
        
        if (response.ok) {
            showMessage('Успешный вход', 'Вы успешно вошли в систему. Перенаправление на главную страницу...');
            
            // Редирект на главную страницу после успешного входа
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            const data = await response.json();
            showMessage('Ошибка входа', data.detail || 'Неверный email или пароль');
        }
    } catch (error) {
        console.error('Ошибка при входе:', error);
        showMessage('Ошибка', 'Не удалось подключиться к серверу. Проверьте подключение к интернету.');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Обработка формы регистрации
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Валидация
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Ошибка', 'Пожалуйста, заполните все поля');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Ошибка', 'Пароли не совпадают');
        return;
    }
    
    if (!document.getElementById('accept-terms').checked) {
        showMessage('Ошибка', 'Для регистрации необходимо принять условия использования');
        return;
    }
    
    // Показываем индикатор загрузки
    const submitBtn = this.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Регистрация...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        
        if (response.status === 200) {
            showMessage('Успешная регистрация', 'Аккаунт успешно создан! Теперь вы можете войти в систему.');
            
            // Переключаемся на форму входа
            setTimeout(() => {
                switchToLogin();
                // Очищаем поля регистрации
                registerForm.reset();
            }, 1500);
        } else if (response.status === 409) {
            const data = await response.json();
            showMessage('Ошибка регистрации', data.detail || 'Пользователь с таким email уже существует');
        } else {
            const data = await response.json();
            showMessage('Ошибка регистрации', data.detail || 'Произошла ошибка при регистрации');
        }
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        showMessage('Ошибка', 'Не удалось подключиться к серверу. Проверьте подключение к интернету.');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Функция показа сообщения
function showMessage(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    messageModal.classList.add('active');
}

// Закрытие модального окна
modalOk.addEventListener('click', () => {
    messageModal.classList.remove('active');
});

closeModal.addEventListener('click', () => {
    messageModal.classList.remove('active');
});

// Закрытие модального окна при клике вне его
messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.classList.remove('active');
    }
});

// Социальные кнопки (заглушки)
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'X';
        showMessage('Вход через ' + provider, 'Эта функция находится в разработке. Пожалуйста, используйте стандартную форму входа.');
    });
});

// Ссылка "Забыли пароль"
document.querySelector('.forgot-link').addEventListener('click', function(e) {
    e.preventDefault();
    showMessage('Восстановление пароля', 'Эта функция находится в разработке. Пожалуйста, обратитесь к администратору.');
});