document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    
    // Базовый URL API
    const API_BASE_URL = 'http://localhost:8000';
    
    // Переключение между формами входа и регистрации
    showRegisterLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginSection.classList.remove('active');
        registerSection.classList.add('active');
        clearMessages();
    });
    
    showLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        registerSection.classList.remove('active');
        loginSection.classList.add('active');
        clearMessages();
    });
    
    // Функция для отображения сообщений
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = 'form-message ' + type;
    }
    
    // Очистка сообщений
    function clearMessages() {
        loginMessage.textContent = '';
        loginMessage.className = 'form-message';
        registerMessage.textContent = '';
        registerMessage.className = 'form-message';
    }
    
    // Переключение видимости пароля
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
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
    
    // Обработка формы регистрации
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        
        // Валидация
        if (!name || !email || !password) {
            showMessage(registerMessage, 'Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage(registerMessage, 'Пароль должен содержать не менее 6 символов', 'error');
            return;
        }
        
        // Данные для отправки
        const userData = {
            name: name,
            email: email,
            password: password
        };
        
        try {
            // Показать состояние загрузки
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Регистрация...';
            submitBtn.disabled = true;
            
            // Отправка запроса на API
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            // Обработка ответа
            if (response.status === 200) {
                showMessage(registerMessage, 'Регистрация успешна! Теперь вы можете войти в систему.', 'success');
                registerForm.reset();
                
                // Автоматически переключаемся на форму входа через 2 секунды
                setTimeout(() => {
                    registerSection.classList.remove('active');
                    loginSection.classList.add('active');
                    clearMessages();
                }, 2000);
            } else if (response.status === 409) {
                const errorData = await response.json();
                showMessage(registerMessage, errorData.detail || 'Пользователь с таким email уже существует', 'error');
            } else {
                const errorData = await response.json();
                showMessage(registerMessage, `Ошибка: ${errorData.detail || 'Неизвестная ошибка'}`, 'error');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            showMessage(registerMessage, 'Ошибка сети. Пожалуйста, проверьте подключение к интернету.', 'error');
        } finally {
            // Восстановить кнопку
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Обработка формы авторизации
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        
        // Валидация
        if (!email || !password) {
            showMessage(loginMessage, 'Пожалуйста, введите email и пароль', 'error');
            return;
        }
        
        // Данные для отправки
        const loginData = {
            email: email,
            password: password
        };
        
        try {
            // Показать состояние загрузки
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
            submitBtn.disabled = true;
            
            // Отправка запроса на API
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData),
                credentials: 'include'
            });
            
            // Обработка ответа
            if (response.status === 200) {
                showMessage(loginMessage, 'Успешный вход! Перенаправление...', 'success');
                loginForm.reset();
                
                // Перенаправление на главную страницу через 1 секунду
                setTimeout(() => {
                    window.location.href = '/web';
                }, 1000);
            } else if (response.status === 401 || response.status === 403) {
                const errorData = await response.json();
                showMessage(loginMessage, `Ошибка: ${errorData.detail || 'Неверный email или пароль'}`, 'error');
            } else {
                const errorData = await response.json();
                showMessage(loginMessage, `Ошибка: ${errorData.detail || 'Ошибка сервера'}`, 'error');
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            showMessage(loginMessage, 'Ошибка сети. Пожалуйста, проверьте подключение к интернету.', 'error');
        } finally {
            // Восстановить кнопку
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Демо-данные для быстрого заполнения формы
    document.getElementById('login-email').addEventListener('dblclick', function() {
        this.value = 'user@example.com';
        document.getElementById('login-password').value = 'string';
        showMessage(loginMessage, 'Демо-данные загружены. Нажмите "Войти" для тестирования.', 'success');
    });
    
    document.getElementById('register-email').addEventListener('dblclick', function() {
        document.getElementById('register-name').value = 'Демо Пользователь';
        this.value = 'demo@example.com';
        document.getElementById('register-password').value = 'demopassword';
        showMessage(registerMessage, 'Демо-данные загружены. Вы можете изменить их перед регистрацией.', 'success');
    });
});