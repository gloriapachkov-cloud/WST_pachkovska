import { IProduct, ICart } from "./models";

export class ProductService {
  private products: IProduct[] = [];

  public getAll(): IProduct[] {
    return this.products;
  }

  public getByCategory(category: string): IProduct[] {
    return this.products.filter((p) => p.category === category);
  }

  public getInStock(): IProduct[] {
    return this.products.filter((p) => p.inStock);
  }

  public findById(id: number): IProduct | undefined {
    return this.products.find((p) => p.id === id);
  }

  public addProduct(product: IProduct): void {
    if (product.price <= 0) {
      throw new Error(`Ціна товару "${product.name}" має бути більше 0.`);
    }
    this.products.push(product);
  }

  public getFiltered<T extends IProduct>(list: T[], predicate: (item: T) => boolean): T[] {
    return list.filter(predicate);
  }
}

export class Cart implements ICart {
  private items: IProduct[] = [];

  get items(): IProduct[] {
    return this.items;
  }

  public add(product: IProduct): void {
    this.items.push(product);
  }

  public remove(id: number): void {
    this.items = this.items.filter((p) => p.id !== id);
  }

  public getTotal(): number {
    const total = this.items.reduce((sum, p) => sum + p.price, 0);
    return Math.round(total * 100) / 100;
  }

  public getItems(): IProduct[] {
    return this.items;
  }

  public clear(): void {
    this.items = [];
  }
}