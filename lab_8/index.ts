import { Product, DiscountedProduct, BaseEntity, IProduct } from "./models";
import { ProductService, Cart } from "./services";

function describeProduct(p: IProduct): string {
  return p instanceof BaseEntity ? p.describe() : p.name;
}

//Товари

const croissant = new Product(1, "Круасан з вишнею", 85, "Випічка", true);
const cookies = new Product(2, "Печиво з шоколадом", 70, "Випічка", true);
const coffee = new Product(3, "Флет Вайт для Миколи Володимировича)))", 65, "Кава", true);
const tiramisu = new Product(4, "Тірамісу", 280, "Торти", false);
const napoleon = new Product(5, "Наполеон", 210, "Торти", true);

const discountedCakeKyiv = new DiscountedProduct(6, "Київский торт", 210, "Торти", true, 15);
const discountedBun = new DiscountedProduct(7, "Булочка з корицею", 65, "Випічка", true, 20);

//ProductService

const productService = new ProductService();

[croissant, cookies, coffee, tiramisu, napoleon, discountedCakeKyiv, discountedBun].forEach(
  (p) => productService.addProduct(p)
);

console.log("=== Усі товари ===");
productService.getAll().forEach((p) => console.log(describeProduct(p)));

console.log("\n=== Категорія: Випічка ===");
productService.getByCategory("Випічка").forEach((p) => console.log(describeProduct(p)));

console.log("\n=== Товари в наявності ===");
productService.getInStock().forEach((p) => console.log(describeProduct(p)));

console.log("\n=== Generic-фільтр: ціна > 150 ===");
const pricey = productService.getFiltered(productService.getAll(), (p) => p.price > 150);
pricey.forEach((p) => console.log(describeProduct(p)));

//Cart

const cart = new Cart();

cart.add(croissant);
cart.add(discountedBun);
cart.add(napoleon);

console.log("\n=== Кошик (початковий) ===");
cart.getItems().forEach((p) => console.log(`  - ${p.name} → ${p.price} UAH`));
console.log(`Загальна сума: UAH ${cart.getTotal().toFixed(2)}`);

cart.remove(croissant.id);

console.log("\n=== Кошик після видалення круасана ===");
cart.getItems().forEach((p) => console.log(`  - ${p.name} → ${p.price} UAH`));
console.log(`Оновлена сума: UAH ${cart.getTotal().toFixed(2)}`);