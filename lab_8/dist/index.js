"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const services_1 = require("./services");
const service = new services_1.ProductService();
const cart = new services_1.Cart();
// 1. Створення товарів (5-7 штук)
service.addProduct(new models_1.Product(1, "Laptop", 35000, "Electronics", true));
service.addProduct(new models_1.Product(2, "Mouse", 1200, "Electronics", true));
service.addProduct(new models_1.Product(3, "Keyboard", 2500, "Electronics", false));
service.addProduct(new models_1.DiscountedProduct(4, "Phone Case", 500, "Accessories", true, 20));
service.addProduct(new models_1.DiscountedProduct(5, "Screen Protector", 300, "Accessories", true, 10));
// 2. Виведення в консоль
console.log(" Всі товари:");
service.getAll().forEach(p => console.log(p.describe()));
console.log("\n Товари категорії 'Electronics': ");
console.table(service.getByCategory("Electronics"));
console.log("\n Товари в наявності: ");
console.table(service.getInStock());
// 3. Робота з кошиком
console.log("\n Робота з кошиком: ");
const prod1 = service.findById(1);
const prod4 = service.findById(4);
if (prod1)
    cart.add(prod1);
if (prod4)
    cart.add(prod4);
console.log("Товари в кошику:", cart.getItems().map(i => i.name));
console.log("Загальна сума:", cart.getTotal(), "UAH");
// 4. Видалення товару
console.log("\nВидалення товару з ID 1");
cart.remove(1);
console.log("Оновлена сума:", cart.getTotal(), "UAH");
// 5. Перевірка Generic методу 
const electronics = service.getFiltered(service.getAll(), (p) => p.category === "Electronics");
console.log("\n Результат Generic фільтрації (Electronics): ");
console.log(electronics.length, "товари знайдено.");
