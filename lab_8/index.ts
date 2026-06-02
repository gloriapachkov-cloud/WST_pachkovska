import { Product, DiscountedProduct, BaseEntity, IProduct } from "./models";
import { ProductService, Cart } from "./services";

function describeProduct(p: IProduct): string {
  return p instanceof BaseEntity ? p.describe() : p.name;
}

//  Б'ЮТІ ТОВАРИ ТА ПОСЛУГИ 

const serum = new Product(1, "Зволожувальна сироватка з гіалуроновою кислотою", 450, "Догляд за обличчям", true);
const patch = new Product(2, "Гідрогелеві патчі з пептидами", 320, "Догляд за обличчям", true);
const makeupCourse = new Product(3, "Індивідуальний майстер-клас 'Макіяж для себе'", 1500, "Послуги та навчання", true);
const lipstick = new Product(4, "Матова стійка помада (відтінок Nude)", 380, "Декоративна косметика", false); // Немає в наявності
const mascara = new Product(5, "Туш для вій з ефектом об'єму", 290, "Декоративна косметика", true);

// Товари зі знижкою (акції салону)
const discountedCream = new DiscountedProduct(6, "Нічний відновлювальний крем", 680, "Догляд за обличчям", true, 15); // -15%
const discountedOil = new DiscountedProduct(7, "Олія для кутикули та нігтів", 120, "Догляд за тілом", true, 20); // -20%

//  PRODUCT SERVICE (Керування каталогом) 

const productService = new ProductService();

[serum, patch, makeupCourse, lipstick, mascara, discountedCream, discountedOil].forEach(
  (p) => productService.addProduct(p)
);

console.log(" Усі товари та послуги салону ");
productService.getAll().forEach((p) => console.log(describeProduct(p)));

console.log("\n Категорія: Догляд за обличчям ");
productService.getByCategory("Догляд за обличчям").forEach((p) => console.log(describeProduct(p)));

console.log("\n Товари в наявності (доступні до замовлення) ");
productService.getInStock().forEach((p) => console.log(describeProduct(p)));

console.log("\n Generic-фільтр: преміум товари/послуги (ціна > 400 UAH) ");
const pricey = productService.getFiltered(productService.getAll(), (p) => p.price > 400);
pricey.forEach((p) => console.log(describeProduct(p)));

//  CART (Кошик клієнта) 

const cart = new Cart();

// Клієнт обирає сироватку, курс макіяжу та нічний крем зі знижкою
cart.add(serum);
cart.add(makeupCourse);
cart.add(discountedCream);

console.log("\n Кошик клієнта (початковий) ");
cart.getItems().forEach((p) => console.log(`   - ${p.name} → ${p.price} UAH`));
console.log(`Загальна сума замовлення: UAH ${cart.getTotal().toFixed(2)}`);

// Клієнт вирішив подумати над майстер-класом і видаляє його з кошика
cart.remove(makeupCourse.id);

console.log("\n Кошик після видалення майстер-класу ");
cart.getItems().forEach((p) => console.log(`   - ${p.name} → ${p.price} UAH`));
console.log(`Оновлена сума до сплати: UAH ${cart.getTotal().toFixed(2)}`);