"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountedProduct = exports.Product = exports.BaseEntity = void 0;
/**
 * Абстрактний базовий клас
 */
class BaseEntity {
    id;
    constructor(id) {
        this.id = id;
    }
}
exports.BaseEntity = BaseEntity;
/**
 * Клас звичайного продукту
 */
class Product extends BaseEntity {
    name;
    price;
    category;
    inStock;
    constructor(id, name, price, category, inStock) {
        super(id);
        this.name = name;
        this.price = price;
        this.category = category;
        this.inStock = inStock;
    }
    /** Повертає опис товару */
    describe() {
        return `Товар: ${this.name}, Ціна: ${this.formattedPrice}`;
    }
    /** Геттер для форматованої ціни */
    get formattedPrice() {
        return `UAH ${this.price.toFixed(2)}`;
    }
}
exports.Product = Product;
/**
 * Клас продукту зі знижкою
 */
class DiscountedProduct extends Product {
    discount;
    /**
     * @param discount Відсоток знижки (0-100)
     */
    constructor(id, name, price, category, inStock, discount) {
        super(id, name, price, category, inStock);
        this.discount = discount;
    }
    /** Геттер форматованої ціни з урахуванням знижки */
    get formattedPrice() {
        const finalPrice = this.price * (1 - this.discount / 100);
        return `UAH ${finalPrice.toFixed(2)} (Знижка ${this.discount}%)`;
    }
    /** Розширений опис зі знижкою */
    describe() {
        return `${super.describe()} [Акція!]`;
    }
}
exports.DiscountedProduct = DiscountedProduct;
