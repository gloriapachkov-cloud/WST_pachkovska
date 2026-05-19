/**
 * Інтерфейс продукту
 */
export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

/**
 * Інтерфейс кошика
 */
export interface ICart {
    items: IProduct[];
    getTotal(): number;
}

/**
 * Абстрактний базовий клас
 */
export abstract class BaseEntity {
    constructor(public id: number) {}
    abstract describe(): string;
}

/**
 * Клас звичайного продукту
 */
export class Product extends BaseEntity implements IProduct {
    constructor(
        id: number,
        public name: string,
        public price: number,
        public category: string,
        public inStock: boolean
    ) {
        super(id);
    }

    /** Повертає опис товару */
    describe(): string {
        return `Товар: ${this.name}, Ціна: ${this.formattedPrice}`;
    }

    /** Геттер для форматованої ціни */
    get formattedPrice(): string {
        return `UAH ${this.price.toFixed(2)}`;
    }
}

/**
 * Клас продукту зі знижкою
 */
export class DiscountedProduct extends Product {
    /**
     * @param discount Відсоток знижки (0-100)
     */
    constructor(
        id: number,
        name: string,
        price: number,
        category: string,
        inStock: boolean,
        public discount: number
    ) {
        super(id, name, price, category, inStock);
    }

    /** Геттер форматованої ціни з урахуванням знижки */
    override get formattedPrice(): string {
        const finalPrice = this.price * (1 - this.discount / 100);
        return `UAH ${finalPrice.toFixed(2)} (Знижка ${this.discount}%)`;
    }

    /** Розширений опис зі знижкою */
    override describe(): string {
        return `${super.describe()} [Акція!]`;
    }
}