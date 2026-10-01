import { state, getAllTeachers } from './state.js';
import { fetchTeachers } from './api.js';

/**
 * Рендерить сітку карток викладачів (Top Teachers).
 * Відображає перших 10 викладачів після застосування фільтрів.
 */
function renderGrid() {
    const grid = document.querySelector('.teachers-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; 
    
    const allTeachers = getAllTeachers();
    // Спочатку фільтруємо
    const filteredTeachers = filterTeachers(allTeachers);
    // Потім беремо перших 10 з відфільтрованих
    const teachersToShow = filteredTeachers.slice(0, 10); 

    teachersToShow.forEach(teacher => {
        const isFav = state.favorites.some(fav => fav.id === teacher.id);
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = `
            <div class="teacher-card__image-wrapper">
                <img src="${teacher.picture || 'https://via.placeholder.com/120'}" alt="${teacher.firstName}" class="teacher-card__img" style="${isFav ? 'border-color: #f06c35;' : ''}">
                <span class="teacher-card__star" onclick="toggleFavorite('${teacher.id}')" style="color: ${isFav ? 'gold' : '#ccc'}; cursor: pointer;">${isFav ? '★' : '☆'}</span>
            </div>
            <h3 class="teacher-card__name">${teacher.firstName} ${teacher.lastName}</h3>
            <p class="teacher-card__subject">${teacher.specialty}</p>
            <p class="teacher-card__country">${teacher.country}</p>
        `;
        grid.appendChild(card);
    });

    // Опціонально: вивести повідомлення, якщо нікого не знайдено
    if (teachersToShow.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No teachers found matching your criteria.</p>';
    }
}
/**
 * Сортує масив викладачів відповідно до поточних налаштувань у state.
 * @param {Array} teachers - Масив для сортування.
 * @returns {Array} Відсортований масив.
 */
function sortTeachers(teachers) {
    if (!state.sortConfig.key) return teachers;
    
    return [...teachers].sort((a, b) => {
        let valA = a[state.sortConfig.key];
        let valB = b[state.sortConfig.key];
        
        // Робимо рядки маленькими для правильного сортування
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return state.sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return state.sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });
}

// Налаштування кліків по заголовках таблиці для сортування
function setupTableSorting() {
    const headers = document.querySelectorAll('.table th');
    
    // Мапа для перекладу тексту заголовка у ключ об'єкта Teacher
    const columnMap = {
        'Name': 'firstName',
        'Speciality': 'specialty',
        'Age': 'age',
        'Gender': 'gender',
        'Nationality': 'nationality'
    };

    headers.forEach(th => {
        th.addEventListener('click', () => {
            // Очищаємо текст заголовка від стрілочок
            const headerText = th.innerText.replace(' ↓', '').replace(' ↑', '').trim();
            const sortKey = columnMap[headerText];
            
            if (sortKey) {
                // Якщо клікнули по тій самій колонці - змінюємо напрямок
                if (state.sortConfig.key === sortKey) {
                    state.sortConfig.direction = state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    state.sortConfig.key = sortKey;
                    state.sortConfig.direction = 'asc';
                }
                
                // Оновлюємо візуальне відображення заголовків
                headers.forEach(h => {
                    h.classList.remove('active-sort');
                    const cleanText = h.innerText.replace(' ↓', '').replace(' ↑', '').trim();
                    h.innerText = cleanText;
                });
                
                th.classList.add('active-sort');
                th.innerText = `${headerText} ${state.sortConfig.direction === 'asc' ? '↓' : '↑'}`;
                
                renderTable(); // Перемальовуємо таблицю
            }
        });
    });
}

/**
 * Відкриває модальне вікно з детальною інформацією про викладача.
 * @param {string} id - Унікальний ідентифікатор викладача.
 */
window.openTeacherInfo = function(id) {
    const teacher = getAllTeachers().find(t => t.id === id);
    if (!teacher) return;
    
    const modal = document.getElementById('infoModal');
    
    // Заповнюємо дані в модалці
    modal.querySelector('h3').innerText = `${teacher.firstName} ${teacher.lastName}`;
    modal.querySelector('img').src = teacher.picture || 'https://via.placeholder.com/150';
    
    const pTags = modal.querySelectorAll('.teacher-info__details p');
    pTags[0].innerText = teacher.specialty;
    pTags[1].innerText = `${teacher.city || ''}, ${teacher.country}`;
    pTags[2].innerText = `${teacher.age}, ${teacher.gender}`;
    
    // Логіка зірочки в модалці
    const star = modal.querySelector('.star-icon');
    const isFav = state.favorites.some(fav => fav.id === teacher.id);
    star.style.color = isFav ? 'gold' : '#ccc';
    star.innerText = isFav ? '★' : '☆';
    
    star.onclick = () => {
        toggleFavorite(teacher.id);
        openTeacherInfo(id); // Оновлюємо інформацію в модалці після зміни статусу обраного
    };

    modal.style.display = 'flex';
};
/**
 * Рендерить таблицю статистики викладачів з урахуванням пагінації.
 */
function renderTable() {
    const tbody = document.querySelector('.table tbody');
    if (!tbody) return;
    tbody.innerHTML = ''; 

    const allTeachers = getAllTeachers();
    
    // 1. Спочатку сортуємо весь список
    const sortedTeachers = sortTeachers(allTeachers);
    
    // 2. Потім вирізаємо потрібну сторінку (Пагінація)
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const paginatedTeachers = sortedTeachers.slice(startIndex, startIndex + state.itemsPerPage);

    paginatedTeachers.forEach(teacher => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="cursor: pointer; color: #f06c35; font-weight: bold;" onclick="openTeacherInfo('${teacher.id}')">
                ${teacher.firstName} ${teacher.lastName}
            </td>
            <td>${teacher.specialty}</td>
            <td>${teacher.age}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.nationality || teacher.country}</td>
        `;
        tbody.appendChild(tr);
    });
    
    renderPagination(sortedTeachers.length);
}

function renderPagination(totalItems) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);
    paginationContainer.innerHTML = '';

    // Кнопки сторінок (1, 2, 3...)
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = `pagination__link ${state.currentPage === i ? 'active' : ''}`;
        pageLink.innerText = i;
        if (state.currentPage === i) pageLink.style.color = '#333'; 
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            state.currentPage = i;
            renderTable();
        });
        paginationContainer.appendChild(pageLink);
    }

    if (totalPages > 3) {
        const dots = document.createElement('span');
        dots.innerText = '...';
        paginationContainer.appendChild(dots);
        
        const lastPage = document.createElement('a');
        lastPage.href = '#';
        lastPage.className = 'pagination__link';
        lastPage.innerText = 'Last';
        lastPage.addEventListener('click', (e) => {
            e.preventDefault();
            state.currentPage = totalPages;
            renderTable();
        });
        paginationContainer.appendChild(lastPage);
    }

    // ДОДАЄМО КНОПКУ "NEXT" (Далі)
    if (state.currentPage < totalPages) {
        const nextBtn = document.createElement('a');
        nextBtn.href = '#';
        nextBtn.className = 'pagination__link';
        nextBtn.style.marginLeft = '15px';
        nextBtn.innerText = 'Next';
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            state.currentPage++;
            renderTable();
        });
        paginationContainer.appendChild(nextBtn);
    }
}

// 4. Рендер списку обраних (Favorites)
function renderFavorites() {
    const favoritesContainer = document.querySelector('.favorites-list');
    favoritesContainer.innerHTML = '';

    state.favorites.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.innerHTML = `
            <div class="teacher-card__image-wrapper">
                <img src="${teacher.picture || 'https://via.placeholder.com/120'}" alt="${teacher.firstName}" class="teacher-card__img">
            </div>
            <h3 class="teacher-card__name">${teacher.firstName}</h3>
            <p class="teacher-card__country">${teacher.country}</p>
        `;
        favoritesContainer.appendChild(card);
    });
}

/**
 * Додає або видаляє викладача зі списку обраних (Favorites).
 * Оновлює дані в localStorage.
 * @param {string} id - Унікальний ідентифікатор викладача.
 */
window.toggleFavorite = function(id) {
    const teacher = getAllTeachers().find(t => t.id === id);
    if (!teacher) return;

    const index = state.favorites.findIndex(fav => fav.id === id);
    if (index === -1) {
        state.favorites.push(teacher);
    } else {
        state.favorites.splice(index, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    renderApp();
};

// 6. Обробка форми додавання викладача
function setupForm() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Збираємо дані з форми (для прикладу беремо основні)
        const inputs = form.querySelectorAll('input, select');
       // ... всередині setupForm
        const newTeacher = {
            id: 'custom-' + Date.now(),
            firstName: inputs[0].value.split(' ')[0] || 'Unknown',
            lastName: inputs[0].value.split(' ')[1] || '',
            specialty: inputs[1].value,
            country: inputs[2].value,
            city: inputs[3].value || '', // <--- ДОДАЛИ МІСТО З ФОРМИ
            picture: '', 
            age: 30, 
            gender: form.querySelector('input[name="sex"]:checked')?.value || 'Unknown'
        };

        state.customTeachers.unshift(newTeacher);
        localStorage.setItem('customTeachers', JSON.stringify(state.customTeachers));
        
        form.reset();
        document.getElementById('addTeacherModal').style.display = 'none';
        renderApp();
    });
}
// Функція для налаштування слухачів подій на фільтрах та пошуку
function setupFilters() {
    // 1. Слухачі для випадаючих списків та чекбоксів
    const filterElements = [
        document.getElementById('ageFilter'),
        document.getElementById('regionFilter'),
        document.getElementById('sexFilter'),
        document.getElementById('onlyPhoto'),
        document.getElementById('onlyFav')
    ];

    filterElements.forEach(el => {
        if(el) {
            el.addEventListener('change', () => {
                state.currentPage = 1; // Скидаємо пагінацію на першу сторінку при новій фільтрації
                renderApp(); // Перемальовуємо все (сітку, таблицю)
            });
        }
    });

    // 2. Слухачі для рядка пошуку
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput && searchBtn) {
        // Реакція на натискання кнопки "Search"
        searchBtn.addEventListener('click', () => {
            state.currentPage = 1;
            renderApp();
        });

        // Реакція на натискання клавіші "Enter" в інпуті
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                state.currentPage = 1;
                renderApp();
            }
        });
        
        // (Опціонально) "Живий" пошук при кожному натисканні клавіші:
        // searchInput.addEventListener('input', () => {
        //     state.currentPage = 1;
        //     renderApp();
        // });
    }
}
// 7. Логіка модальних вікон
function setupModals() {
    // Шукаємо ВСІ кнопки з класом .add-teacher-btn
    const addTeacherBtns = document.querySelectorAll('.add-teacher-btn');
    const addTeacherModal = document.getElementById('addTeacherModal');
    const closeBtns = document.querySelectorAll('.modal__close');

    // Перебираємо знайдені кнопки і кожній додаємо клік
    addTeacherBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addTeacherModal.style.display = 'flex';
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => e.target.closest('.modal-overlay').style.display = 'none');
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) e.target.style.display = 'none';
    });
}
// Логіка гортання слайдера "Favorites"
function setupSlider() {
    const list = document.querySelector('.favorites-list');
    const arrows = document.querySelectorAll('.slider-arrow');

    // Перевіряємо, чи є на сторінці список і обидві стрілочки
    if (!list || arrows.length < 2) return;

    // Клік по лівій стрілці (гортаємо назад)
    arrows[0].addEventListener('click', () => {
        list.scrollBy({ left: -300, behavior: 'smooth' });
    });

    // Клік по правій стрілці (гортаємо вперед)
    arrows[1].addEventListener('click', () => {
        list.scrollBy({ left: 300, behavior: 'smooth' });
    });
}
// --- Логіка фільтрації ---

/**
 * Фільтрує список викладачів на основі вибраних критеріїв
 * @param {Array} teachers - Масив викладачів для фільтрації
 * @returns {Array} Відфільтрований масив
 */
function filterTeachers(teachers) {
    const ageFilter = document.getElementById('ageFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    const sexFilter = document.getElementById('sexFilter').value;
    const onlyPhoto = document.getElementById('onlyPhoto').checked;
    const onlyFav = document.getElementById('onlyFav').checked;
    
    // Отримуємо значення з рядка пошуку і переводимо в нижній регістр
    const searchValue = document.getElementById('searchInput').value.toLowerCase().trim();

    return teachers.filter(teacher => {
        // ... (твої попередні перевірки matchAge, matchRegion, matchSex, matchPhoto, matchFav залишаються без змін) ...
        let matchAge = true;
        if (ageFilter !== 'all') {
            if (ageFilter === '18-31') matchAge = teacher.age >= 18 && teacher.age <= 31;
            if (ageFilter === '32-50') matchAge = teacher.age >= 32 && teacher.age <= 50;
            if (ageFilter === '51+') matchAge = teacher.age >= 51;
        }

        let matchRegion = true;
        if (regionFilter !== 'all') {
             const europeCountries = ['Germany', 'France', 'Spain', 'United Kingdom', 'Switzerland', 'Ireland', 'Finland', 'Ukraine', 'Denmark', 'Netherlands'];
             const asiaCountries = ['India', 'Vietnam', 'Turkey', 'Iran'];
             const americasCountries = ['United States', 'Canada', 'Mexico', 'Brazil'];

             if (regionFilter === 'Europe') matchRegion = europeCountries.includes(teacher.country);
             if (regionFilter === 'Asia') matchRegion = asiaCountries.includes(teacher.country);
             if (regionFilter === 'Americas') matchRegion = americasCountries.includes(teacher.country);
        }

        let matchSex = true;
        if (sexFilter !== 'all') matchSex = teacher.gender === sexFilter;

        let matchPhoto = true;
        if (onlyPhoto) matchPhoto = teacher.picture && !teacher.picture.includes('placeholder');

        let matchFav = true;
        if (onlyFav) matchFav = state.favorites.some(fav => fav.id === teacher.id);

        // НОВА ЛОГІКА ПОШУКУ
        let matchSearch = true;
        if (searchValue) {
            const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
            const ageStr = teacher.age.toString();
            // Шукаємо збіг у імені або віці
            matchSearch = fullName.includes(searchValue) || ageStr.includes(searchValue);
        }

        // Повертаємо викладача, тільки якщо він пройшов УСІ перевірки
        return matchAge && matchRegion && matchSex && matchPhoto && matchFav && matchSearch;
    });
}
// Оновлення всього інтерфейсу
function renderApp() {
    renderGrid();
    renderTable();
    renderFavorites();
}

// Запуск програми
document.addEventListener('DOMContentLoaded', async () => {
    setupModals();
    setupForm();
    setupFilters();
    setupTableSorting();
    setupSlider();
    
    if (state.apiTeachers.length === 0) {
        await fetchTeachers(); // Чекаємо поки завантажаться дані
        renderApp();
    } else {
        renderApp();
    }
});