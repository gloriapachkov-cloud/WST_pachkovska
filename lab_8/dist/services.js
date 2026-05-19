"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.ProductService = void 0;
class ProductService {
    products = [];
    /** Додає товар до колекції з валідацією */
    addProduct(product) {
        if (product.price <= 0) {
            console.error("Помилка: Ціна має бути більшою за 0");
            return;
        }
        this.products.push(product);
    }
    /** Повертає всі товари */
    getAll() {
        return this.products;
    }
    /** Фільтрація за категорією */
    getByCategory(category) {
        return this.products.filter(p => p.category === category);
    }
    /** Повертає товари в наявності */
    getInStock() {
        return this.products.filter(p => p.inStock);
    }
    /** Пошук за ID */
    findById(id) {
        return this.products.find(p => p.id === id);
    }
    /** * Генерик-метод для фільтрації (на макс. бал)
     */
    getFiltered(list, predicate) {
        return list.filter(predicate);
    }
}
exports.ProductService = ProductService;
/**
 * Клас кошика
 */
class Cart {
    items = [];
    /** Додати товар до кошика */
    add(product) {
        this.items.push(product);
    }
    /** Видалити товар за ID */
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
    }
    /** Розрахунок загальної вартості (округлення до 2 знаків) */
    getTotal() {
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        return Math.round(total * 100) / 100;
    }
    /** Отримати список товарів у кошику */
    getItems() {
        return this.items;
    }
    /** Очистити кошик */
    clear() {
        this.items = [];
    }
}
exports.Cart = Cart;
