document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Создать событие"
    const createBtn = document.querySelector('.btn-create');
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            alert('Функция "Создать событие" пока не реализована. Будет доступна в следующей версии!');
            // Можно перенаправить на форму создания: window.location.href = '/web/create-event';
        });
    }

    // Кнопки "Подробнее"
    const detailButtons = document.querySelectorAll('.btn-details');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.event-card');
            const title = card.querySelector('h3').textContent;
            alert(`Вы выбрали событие: "${title}"\n\nДетали будут показаны на отдельной странице.`);
            // Можно перенаправить: window.location.href = `/web/event/${eventId}`;
        });
    });

    // Анимация при наведении (если нужно добавить)
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
        });
    });
});