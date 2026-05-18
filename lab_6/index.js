import { getProductsWithAxios } from './api.js';

//WEB COMPONENT: Список продуктів
class ProductList extends HTMLElement {
    async connectedCallback() {
        this.innerHTML = `
            <div class="table-responsive">
                <table class="table table-hover table-bordered align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Назва</th>
                            <th>Категорія</th>
                            <th>Ціна</th>
                            <th>Дія</th>
                        </tr>
                    </thead>
                    <tbody id="productsBody">
                        <tr><td colspan="4" class="text-center">Завантаження...</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        
        // Завантажуємо дані
        const productsData = await getProductsWithAxios();
        this.renderTable(productsData);
    }

    renderTable(productsData) {
        const tbody = this.querySelector('#productsBody');
        tbody.innerHTML = ''; // Очищаємо "Завантаження..."
        
        productsData.forEach(product => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td class="text-primary text-decoration-underline" style="cursor: pointer;" data-action="popup">${product.title}</td>
                <td><span class="badge bg-secondary">${product.category}</span></td>
                <td class="fw-bold">${product.price} $</td>
                <td>
                    <button class="btn btn-success btn-sm btn-add">Додати в обране</button>
                </td>
            `;

            //  генеруємо глобальну подію для відкриття попапу
            tr.querySelector('[data-action="popup"]').addEventListener('click', () => {
                document.dispatchEvent(new CustomEvent('open-popup', { detail: product }));
            });
            
            // генеруємо глобальну подію для додавання в обране
            tr.querySelector('.btn-add').addEventListener('click', (e) => {
                e.stopPropagation();
                document.dispatchEvent(new CustomEvent('add-favorite', { detail: product }));
            });

            tbody.appendChild(tr);
        });
    }
}

//  WEB COMPONENT: Список обраного 
class FavoritesList extends HTMLElement {
    constructor() {
        super();
        this.favorites = [];
    }

    connectedCallback() {
        this.innerHTML = `<ul class="list-group list-group-flush" id="favList"></ul>`;
        
        //  глобальну подію додавання в обране
        document.addEventListener('add-favorite', (e) => {
            const product = e.detail;
            if (!this.favorites.find(item => item.id === product.id)) {
                this.favorites.push(product);
                this.renderFavorites();
            }
        });
    }

    renderFavorites() {
        const ul = this.querySelector('#favList');
        ul.innerHTML = '';
        this.favorites.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item.title} <span class="badge bg-success rounded-pill">${item.price} $</span>`;
            ul.appendChild(li);
        });
    }
}

// Реєструємо наші Web Components у браузері
customElements.define('product-list', ProductList);
customElements.define('favorites-list', FavoritesList);


//  ЛОГІКА ПОПАПУ (залишається глобальною)
const popup = document.getElementById('productPopup');
const closePopupBtn = document.getElementById('closePopup');

// Слухаємо подію від компонента ProductList
document.addEventListener('open-popup', (e) => {
    const product = e.detail;
    document.getElementById('popupTitle').textContent = product.title;
    document.getElementById('popupDesc').textContent = product.description;
    document.getElementById('popupPrice').textContent = `Ціна: ${product.price} $`;
    popup.style.display = 'block';
});

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});