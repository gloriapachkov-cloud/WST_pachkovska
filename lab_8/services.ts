import { IProduct, ICart } from './models';

export class ProductService {
    private products: IProduct[] = [];

    /** Додає товар до колекції з валідацією */
    addProduct(product: IProduct): void {
        if (product.price <= 0) {
            console.error("Помилка: Ціна має бути більшою за 0");
            return;
        }
        this.products.push(product);
    }

    /** Повертає всі товари */
    getAll(): IProduct[] {
        return this.products;
    }

    /** Фільтрація за категорією */
    getByCategory(category: string): IProduct[] {
        return this.products.filter(p => p.category === category);
    }

    /** Повертає товари в наявності */
    getInStock(): IProduct[] {
        return this.products.filter(p => p.inStock);
    }

    /** Пошук за ID */
    findById(id: number): IProduct | undefined {
        return this.products.find(p => p.id === id);
    }

    /** * Генерик-метод для фільтрації (на макс. бал)
     */
    getFiltered<T extends IProduct>(list: T[], predicate: (item: T) => boolean): T[] {
        return list.filter(predicate);
    }
}

/**
 * Клас кошика
 */
export class Cart implements ICart {
    items: IProduct[] = [];

    /** Додати товар до кошика */
    add(product: IProduct): void {
        this.items.push(product);
    }

    /** Видалити товар за ID */
    remove(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    /** Розрахунок загальної вартості (округлення до 2 знаків) */
    getTotal(): number {
        const total = this.items.reduce((sum, item) => sum + item.price, 0);
        return Math.round(total * 100) / 100;
    }

    /** Отримати список товарів у кошику */
    getItems(): IProduct[] {
        return this.items;
    }

    /** Очистити кошик */
    clear(): void {
        this.items = [];
    }
}