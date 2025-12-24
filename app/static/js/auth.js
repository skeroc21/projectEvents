document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Валидация
        if (password !== confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }

        if (password.length < 6) {
            alert('Пароль должен быть не менее 6 символов');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Регистрация успешна! Перенаправляем...');
                window.location.href = '/'; // или /login, если нужно подтвердить вход
            } else {
                alert(data.detail || 'Ошибка регистрации');
            }

        } catch (error) {
            console.error('Ошибка:', error);
            alert('Не удалось подключиться к серверу');
        }
    });
});