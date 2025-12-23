document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const logoutBtn = document.getElementById('logout-btn');
    const userNameElement = document.getElementById('user-name');
    const createEventBtn = document.getElementById('create-event-btn');
    const citySelect = document.getElementById('city-select');
    const currentCityElement = document.getElementById('current-city');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const eventsPlaceholder = document.getElementById('events-placeholder');
    const eventsGrid = document.getElementById('events-grid');
    const eventsCountElement = document.getElementById('events-count');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageElement = document.getElementById('current-page');
    const totalPagesElement = document.getElementById('total-pages');
    const paginationElement = document.getElementById('pagination');
    
    // Базовый URL API
    const API_BASE_URL = 'http://localhost:8000';
    
    // Состояние приложения
    const state = {
        currentCity: 'moscow',
        currentPage: 1,
        totalPages: 1,
        isLoading: false,
        events: [],
        filters: {
            category: '',
            date: '',
            price: '',
            sort: 'date_asc'
        }
    };
    
    // Инициализация
    init();
    
    // Инициализация приложения
    function init() {
        // Проверка авторизации
        checkAuth();
        
        // Загрузка событий
        loadEvents();
        
        // Установка обработчиков событий
        setupEventListeners();
    }
    
    // Настройка обработчиков событий
    function setupEventListeners() {
        // Выбор города
        citySelect.addEventListener('change', function() {
            state.currentCity = this.value;
            const cityName = this.options[this.selectedIndex].text;
            currentCityElement.textContent = cityName;
            state.currentPage = 1;
            loadEvents();
        });
        
        // Фильтры
        categoryFilter.addEventListener('change', function() {
            state.filters.category = this.value;
            state.currentPage = 1;
            loadEvents();
        });
        
        dateFilter.addEventListener('change', function() {
            state.filters.date = this.value;
            state.currentPage = 1;
            loadEvents();
        });
        
        priceFilter.addEventListener('change', function() {
            state.filters.price = this.value;
            state.currentPage = 1;
            loadEvents();
        });
        
        sortFilter.addEventListener('change', function() {
            state.filters.sort = this.value;
            state.currentPage = 1;
            loadEvents();
        });
        
        // Сброс фильтров
        resetFiltersBtn.addEventListener('click', function() {
            categoryFilter.value = '';
            dateFilter.value = '';
            priceFilter.value = '';
            sortFilter.value = 'date_asc';
            
            state.filters = {
                category: '',
                date: '',
                price: '',
                sort: 'date_asc'
            };
            
            state.currentPage = 1;
            loadEvents();
        });
        
        // Пагинация
        prevPageBtn.addEventListener('click', function() {
            if (state.currentPage > 1) {
                state.currentPage--;
                loadEvents();
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            if (state.currentPage < state.totalPages) {
                state.currentPage++;
                loadEvents();
            }
        });
        
        // Создание мероприятия
        createEventBtn.addEventListener('click', function() {
            alert('Функция создания мероприятия будет реализована в ближайшее время!');
        });
        
        // Выход из системы
        logoutBtn.addEventListener('click', logout);
        
        // Клики по городам в футере
        document.querySelectorAll('.footer-section a[data-city]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const cityValue = this.getAttribute('data-city');
                citySelect.value = cityValue;
                
                // Триггерим событие change
                citySelect.dispatchEvent(new Event('change'));
                
                // Прокручиваем к верху страницы
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    
    // Проверка авторизации
    async function checkAuth() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include'
            });
            
            if (response.ok) {
                const userData = await response.json();
                userNameElement.textContent = userData.name || 'Пользователь';
            } else {
                // Если не авторизован, перенаправляем на страницу авторизации
                window.location.href = '/auth.html';
            }
        } catch (error) {
            console.error('Ошибка при проверке авторизации:', error);
            window.location.href = '/auth.html';
        }
    }
    
    // Выход из системы
    async function logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (response.ok) {
                window.location.href = '/auth.html';
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            window.location.href = '/auth.html';
        }
    }
    
    // Загрузка мероприятий
    async function loadEvents() {
        if (state.isLoading) return;
        
        state.isLoading = true;
        showLoadingState();
        
        try {
            // Формируем параметры запроса
            const params = new URLSearchParams({
                city: state.currentCity,
                page: state.currentPage,
                limit: 9 // Количество событий на странице
            });
            
            // Добавляем фильтры
            if (state.filters.category) params.append('category', state.filters.category);
            if (state.filters.date) params.append('date', state.filters.date);
            if (state.filters.price) params.append('price', state.filters.price);
            if (state.filters.sort) params.append('sort', state.filters.sort);
            
            // Отправляем запрос к API
            const response = await fetch(`${API_BASE_URL}/events?${params.toString()}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                
                // Обновляем состояние
                state.events = data.events || [];
                state.totalPages = data.total_pages || 1;
                
                // Обновляем интерфейс
                updateUI(data);
            } else if (response.status === 401 || response.status === 403) {
                // Не авторизован - перенаправляем на страницу авторизации
                window.location.href = '/auth.html';
            } else {
                // Ошибка сервера - показываем заглушку
                showNoEventsState('Не удалось загрузить мероприятия. Пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка при загрузке мероприятий:', error);
            // В случае ошибки сети показываем демо-данные
            showDemoEvents();
        } finally {
            state.isLoading = false;
        }
    }
    
    // Показать состояние загрузки
    function showLoadingState() {
        eventsPlaceholder.style.display = 'block';
        eventsGrid.style.display = 'none';
        paginationElement.style.display = 'none';
        
        const placeholderContent = eventsPlaceholder.querySelector('.placeholder-content');
        placeholderContent.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <h4>Загружаем мероприятия...</h4>
            <p>Ищем интересные события в городе ${citySelect.options[citySelect.selectedIndex].text}</p>
        `;
    }
    
    // Показать состояние "нет мероприятий"
    function showNoEventsState(message) {
        eventsPlaceholder.style.display = 'block';
        eventsGrid.style.display = 'none';
        paginationElement.style.display = 'none';
        
        const placeholderContent = eventsPlaceholder.querySelector('.placeholder-content');
        placeholderContent.innerHTML = `
            <i class="fas fa-calendar-times"></i>
            <h4>Мероприятий не найдено</h4>
            <p>${message || 'Попробуйте изменить фильтры или выберите другой город.'}</p>
        `;
        
        eventsCountElement.textContent = '0';
    }
    
    // Показать демо-мероприятия (если API недоступно)
    function showDemoEvents() {
        const demoEvents = [
            {
                id: 1,
                title: 'Конференция по веб-разработке',
                description: 'Современные тенденции в разработке веб-приложений и фронтенд технологиях.',
                category: 'technology',
                date: '2023-12-15T10:00:00',
                location: 'Москва, Бизнес-центр "Сити"',
                price: 1500,
                participants: 120,
                image: null
            },
            {
                id: 2,
                title: 'Джазовый вечер в клубе "Ритм"',
                description: 'Живая музыка, атмосфера ретро и лучшие джазовые исполнители города.',
                category: 'music',
                date: '2023-12-16T19:00:00',
                location: 'Москва, ул. Тверская, 10',
                price: 800,
                participants: 80,
                image: null
            },
            {
                id: 3,
                title: 'Мастер-класс по дизайну интерфейсов',
                description: 'Практическое занятие по созданию удобных и красивых пользовательских интерфейсов.',
                category: 'education',
                date: '2023-12-18T14:00:00',
                location: 'Москва, Коворкинг "Простора"',
                price: 0,
                participants: 40,
                image: null
            },
            {
                id: 4,
                title: 'Выставка современного искусства',
                description: 'Работы молодых художников в различных стилях и техниках.',
                category: 'culture',
                date: '2023-12-20T11:00:00',
                location: 'Москва, Галерея "Арт-пространство"',
                price: 300,
                participants: 60,
                image: null
            },
            {
                id: 5,
                title: 'Семинар по маркетингу в соцсетях',
                description: 'Эффективные стратегии продвижения бизнеса в социальных сетях.',
                category: 'business',
                date: '2023-12-22T12:00:00',
                location: 'Москва, Конференц-зал "Бизнес-хаб"',
                price: 2000,
                participants: 75,
                image: null
            },
            {
                id: 6,
                title: 'Йога в парке',
                description: 'Открытое занятие по йоге для всех желающих на свежем воздухе.',
                category: 'sports',
                date: '2023-12-17T09:00:00',
                location: 'Москва, Парк Горького',
                price: 0,
                participants: 50,
                image: null
            }
        ];
        
        state.events = demoEvents;
        state.totalPages = 1;
        updateUI({
            events: demoEvents,
            total: demoEvents.length,
            total_pages: 1
        });
    }
    
    // Обновление интерфейса
    function updateUI(data) {
        // Обновляем счетчик мероприятий
        const totalEvents = data.total || state.events.length;
        eventsCountElement.textContent = totalEvents;
        
        // Проверяем, есть ли мероприятия
        if (!state.events || state.events.length === 0) {
            showNoEventsState();
            return;
        }
        
        // Скрываем заглушку, показываем сетку мероприятий
        eventsPlaceholder.style.display = 'none';
        eventsGrid.style.display = 'grid';
        
        // Очищаем сетку
        eventsGrid.innerHTML = '';
        
        // Добавляем мероприятия в сетку
        state.events.forEach(event => {
            const eventCard = createEventCard(event);
            eventsGrid.appendChild(eventCard);
        });
        
        // Обновляем пагинацию
        updatePagination();
    }
    
    // Создание карточки мероприятия
    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        
        // Форматируем дату
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Иконка для категории
        const categoryIcons = {
            'business': 'fas fa-briefcase',
            'education': 'fas fa-graduation-cap',
            'entertainment': 'fas fa-film',
            'sports': 'fas fa-running',
            'culture': 'fas fa-theater-masks',
            'music': 'fas fa-music',
            'food': 'fas fa-utensils',
            'technology': 'fas fa-laptop-code'
        };
        
        const categoryIcon = categoryIcons[event.category] || 'fas fa-calendar';
        
        // Название категории
        const categoryNames = {
            'business': 'Бизнес',
            'education': 'Образование',
            'entertainment': 'Развлечения',
            'sports': 'Спорт',
            'culture': 'Культура',
            'music': 'Музыка',
            'food': 'Еда и напитки',
            'technology': 'Технологии'
        };
        
        const categoryName = categoryNames[event.category] || 'Другое';
        
        // Цена
        const priceText = event.price === 0 ? 'Бесплатно' : `${event.price} ₽`;
        
        card.innerHTML = `
            <div class="event-image">
                <i class="${categoryIcon}"></i>
            </div>
            <div class="event-content">
                <div class="event-category">${categoryName}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                    <span><i class="fas fa-users"></i> ${event.participants} участников</span>
                </div>
                <div class="event-actions">
                    <div class="event-price">${priceText}</div>
                    <button class="btn btn-primary btn-event">
                        <i class="fas fa-eye"></i> Подробнее
                    </button>
                </div>
            </div>
        `;
        
        // Обработчик для кнопки "Подробнее"
        const detailsBtn = card.querySelector('.btn-event');
        detailsBtn.addEventListener('click', function() {
            alert(`Детали мероприятия: ${event.title}\n\nДата: ${formattedDate}\nМесто: ${event.location}\n\nОписание: ${event.description}`);
        });
        
        return card;
    }
    
    // Обновление пагинации
    function updatePagination() {
        // Обновляем номера страниц
        currentPageElement.textContent = state.currentPage;
        totalPagesElement.textContent = state.totalPages;
        
        // Обновляем состояние кнопок
        prevPageBtn.disabled = state.currentPage <= 1;
        nextPageBtn.disabled = state.currentPage >= state.totalPages;
        
        // Показываем/скрываем пагинацию
        paginationElement.style.display = state.totalPages > 1 ? 'flex' : 'none';
    }
});