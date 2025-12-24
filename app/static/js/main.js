// Данные мероприятий (в реальном приложении загружаются с сервера)
const eventsData = [
    {
        id: 1,
        title: "Бизнес-конференция 2023",
        description: "Крупнейшая бизнес-конференция года с участием ведущих экспертов",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "business",
        date: "15 мая 2023",
        location: "Москва",
        price: "от 5000 ₽",
        badge: "Популярное"
    },
    {
        id: 2,
        title: "Музыкальный фестиваль под открытым небом",
        description: "Трехдневный фестиваль с участием мировых звезд",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "music",
        date: "20-22 июля 2023",
        location: "Санкт-Петербург",
        price: "от 3000 ₽",
        badge: "Скоро"
    },
    {
        id: 3,
        title: "Мастер-класс по цифровому маркетингу",
        description: "Практический мастер-класс для начинающих специалистов",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "education",
        date: "10 июня 2023",
        location: "Онлайн",
        price: "Бесплатно",
        badge: "Онлайн"
    },
    {
        id: 4,
        title: "Марафон 'Бегущий город'",
        description: "Ежегодный благотворительный марафон по улицам города",
        image: "https://images.unsplash.com/photo-1552674605-db6ffd8facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "sports",
        date: "5 июня 2023",
        location: "Казань",
        price: "1500 ₽",
        badge: "Новое"
    },
    {
        id: 5,
        title: "Выставка современного искусства",
        description: "Работы современных художников со всего мира",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "art",
        date: "1-30 июня 2023",
        location: "Москва",
        price: "500 ₽",
        badge: "Выставка"
    },
    {
        id: 6,
        title: "Стартап-питчинг для инвесторов",
        description: "Презентация проектов перед венчурными инвесторами",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "business",
        date: "25 мая 2023",
        location: "Онлайн",
        price: "Бесплатно",
        badge: "Для инвесторов"
    },
    {
        id: 7,
        title: "Кулинарный мастер-класс от шеф-повара",
        description: "Научитесь готовить изысканные блюда итальянской кухни",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        category: "entertainment",
        date: "18 мая 2023",
        location: "Москва",
        price: "3500 ₽",
        badge: "Кулинария"
    },
    {
        id: 8,
        title: "Йога-ретрит на природе",
        description: "Выходные для восстановления сил и энергии на свежем воздухе",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1120&q=80",
        category: "sports",
        date: "12-14 мая 2023",
        location: "Подмосковье",
        price: "8000 ₽",
        badge: "Здоровье"
    }
];

// Элементы DOM
const eventsContainer = document.getElementById('events-container');
const categoryFilter = document.getElementById('category');
const dateFilter = document.getElementById('date');
const locationFilter = document.getElementById('location');
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const categoryCards = document.querySelectorAll('.category-card');
const loginModal = document.getElementById('login-modal');
const goToLoginBtn = document.getElementById('go-to-login');
const cancelLoginBtn = document.getElementById('cancel-login');
const closeModalBtn = document.querySelector('.close-modal');
const logoutBtn = document.querySelector('.logout');

// Текущие фильтры
let currentFilters = {
    category: '',
    date: '',
    location: '',
    search: ''
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
    setupEventListeners();
    checkAuth();
});

// Загрузка мероприятий
function loadEvents(filters = {}) {
    eventsContainer.innerHTML = '';
    
    // Фильтрация мероприятий
    let filteredEvents = eventsData.filter(event => {
        // Фильтр по категории
        if (filters.category && event.category !== filters.category) {
            return false;
        }
        
        // Фильтр по поисковому запросу
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const eventTitle = event.title.toLowerCase();
            const eventDesc = event.description.toLowerCase();
            
            if (!eventTitle.includes(searchTerm) && !eventDesc.includes(searchTerm)) {
                return false;
            }
        }
        
        // Здесь можно добавить фильтры по дате и местоположению
        // Для демонстрации они не реализованы полностью
        
        return true;
    });
    
    // Если нет мероприятий после фильтрации
    if (filteredEvents.length === 0) {
        eventsContainer.innerHTML = `
            <div class="no-events" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-calendar-times" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 20px;"></i>
                <h3 style="color: #64748b; margin-bottom: 10px;">Мероприятия не найдены</h3>
                <p style="color: #94a3b8;">Попробуйте изменить параметры поиска</p>
            </div>
        `;
        return;
    }
    
    // Отображение мероприятий
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

// Создание карточки мероприятия
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.dataset.category = event.category;
    
    card.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}" onerror="this.src='https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'">
            <span class="event-badge">${event.badge}</span>
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-meta">
                <div class="event-date">
                    <i class="far fa-calendar"></i>
                    <span>${event.date}</span>
                </div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
            </div>
            <div class="event-actions">
                <div class="event-price">${event.price}</div>
                <button class="event-btn" data-event-id="${event.id}">Подробнее</button>
            </div>
        </div>
    `;
    
    // Добавляем обработчик клика на кнопку
    const detailsBtn = card.querySelector('.event-btn');
    detailsBtn.addEventListener('click', function() {
        showEventDetails(event.id);
    });
    
    return card;
}

// Показать детали мероприятия
function showEventDetails(eventId) {
    // В реальном приложении здесь будет переход на страницу мероприятия
    // или открытие модального окна с деталями
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        alert(`Детали мероприятия: ${event.title}\n\n${event.description}\n\nДата: ${event.date}\nМесто: ${event.location}\nСтоимость: ${event.price}`);
    }
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Поиск
    searchBtn.addEventListener('click', applyFilters);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyFilters();
        }
    });
    
    // Фильтры
    categoryFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
    locationFilter.addEventListener('change', applyFilters);
    
    // Кнопки вида
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                eventsContainer.classList.add('list-view');
            } else {
                eventsContainer.classList.remove('list-view');
            }
        });
    });
    
    // Карточки категорий
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            applyFilters();
            
            // Прокрутка к мероприятиям
            document.querySelector('.events-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Кнопка выхода
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            performLogout();
        });
    }
    
    // Модальное окно входа
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', function() {
            window.location.href = '/auth.html';
        });
    }
    
    if (cancelLoginBtn) {
        cancelLoginBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }
    
    // Закрытие модального окна при клике вне его
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
}

// Применение фильтров
function applyFilters() {
    currentFilters = {
        category: categoryFilter.value,
        date: dateFilter.value,
        location: locationFilter.value,
        search: searchInput.value.trim()
    };
    
    loadEvents(currentFilters);
}

// Проверка авторизации
function checkAuth() {
    // В реальном приложении здесь будет запрос к серверу
    // для проверки авторизации пользователя
    // Для демонстрации считаем, что пользователь авторизован
    const isAuthenticated = true; // Здесь должна быть реальная проверка
    
    if (!isAuthenticated) {
        // Если пользователь не авторизован, показываем кнопки входа
        setupUnauthenticatedUI();
    }
}

// Настройка UI для неавторизованного пользователя
function setupUnauthenticatedUI() {
    // В реальном приложении здесь будут изменения в интерфейсе
    // Например, кнопка "Войти" вместо профиля
    console.log('Пользователь не авторизован');
}

// Выход из системы
function performLogout() {
    // В реальном приложении здесь будет запрос на сервер
    // для выхода и очистки кук
    fetch('http://localhost:8000/auth/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if (response.ok) {
            // Редирект на страницу входа
            window.location.href = '/auth.html';
        }
    })
    .catch(error => {
        console.error('Ошибка при выходе:', error);
        // Все равно перенаправляем на страницу входа
        window.location.href = '/auth.html';
    });
}

// Обработка кнопок "Подробнее" на мероприятиях
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('event-btn')) {
        const eventId = parseInt(e.target.dataset.eventId);
        showEventDetails(eventId);
    }
});