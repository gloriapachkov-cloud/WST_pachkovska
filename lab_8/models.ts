export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface ICart {
  getItems(): IProduct[];
  getTotal(): number;
}

export abstract class BaseEntity {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  abstract describe(): string;
}

export class Product extends BaseEntity implements IProduct {
  public name: string;
  public price: number;
  public category: string;
  public inStock: boolean;

  constructor(id: number, name: string, price: number, category: string, inStock: boolean) {
    if (price <= 0) {
      throw new Error(`Ціна товару "${name}" має бути більше 0.`);
    }
    super(id);
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = inStock;
  }

  public describe(): string {
    return `Товар: ${this.name}, Ціна: ${this.formattedPrice}`;
  }

  get formattedPrice(): string {
    return `UAH ${this.price.toFixed(2)}`;
  }
}

export class DiscountedProduct extends Product {
  private _discount: number;

  constructor(id: number, name: string, price: number, category: string, inStock: boolean, discount: number) {
    super(id, name, price, category, inStock);
    if (discount < 0 || discount > 100) {
      throw new Error(`Знижка для товару "${name}" має бути від 0 до 100.`);
    }
    this._discount = discount;
  }

  get discount(): number {
    return this._discount;
  }

  get formattedPrice(): string {
    const discounted = this.price * (1 - this._discount / 100);
    return `UAH ${discounted.toFixed(2)}`;
  }

  public describe(): string {
    return `Товар: ${this.name}, Ціна зі знижкою ${this._discount}%: ${this.formattedPrice} (було: UAH ${this.price.toFixed(2)})`;
  }
}