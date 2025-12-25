document.addEventListener('DOMContentLoaded', function () {
   const registerForm = document.getElementById('registerForm');
   if (!registerForm) return;
   registerForm.addEventListener('submit', async (e) => {
       e.preventDefault();
       const nameInput = document.getElementById('name');
       const email = document.getElementById('email').value.trim();
       const password = document.getElementById('password').value;
       const confirmPassword = document.getElementById('confirmPassword').value;
       // Валидация паролей
       if (password !== confirmPassword) {
           alert('Пароли не совпадают!');
           return;
       }
       if (password.length < 6) {
           alert('Пароль должен быть не менее 6 символов');
           return;
       }
       // Подготавливаем данные
       const userData = {
           email: email,
           password: password
       };
       // Добавляем name, ТОЛЬКО если он есть в форме и нужен в API
       if (nameInput) {
           const name = nameInput.value.trim();
           if (name) userData.name = name;
       }
       try {
           const response = await fetch('/auth/register', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(userData)
           });
           const data = await response.json();
           if (response.ok) {
               alert('Регистрация прошла успешно! Добро пожаловать!');
               // ✅ Перенаправляем на главную страницу
               window.location.href = '/web/';
           } else {
               // FastAPI возвращает ошибку в формате:
               // {"detail": "Пользователь с таким email уже существует"}
               const message = data.detail || 'Ошибка регистрации';
               alert(message);
           }
       } catch (err) {
           console.error('Ошибка сети:', err);
           alert('Не удалось подключиться к серверу. Попробуйте позже.');
       }
   });
});