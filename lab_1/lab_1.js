//Завдання 3
console.log("Завдання 3");
console.log("Файл підключено успішно");

//Завдання 4 
console.log("Завдання 4");
let myName = "Глорія";
const yearBirth = 2008;
let yearNow = 2026;

console.log("Мене звати " + myName  + ", я народилась в " + yearBirth + " році. Зараз " + yearNow + " рік.");

//Завдання 5
console.log("Завдання 5");

// Обчислення віку
let myAge = yearNow - yearBirth;
console.log("Мені " + myAge + " років.");

// Обчислення площі прямокутника
let sideA = 12;
let sideB = 2;
let squareArea = sideA * sideB; 
console.log("Площа прямокутника дорівнює " + squareArea);

// Перевірка чи є прямокутник квадратом
if (sideA === sideB) {
    console.log("Це квадрат");
} else {
    console.log("Це не квадрат");
}

// Обчислення площі кола
let radius = 10;
let radiusSquared = Math.pow(radius, 2);
let circleArea = Math.PI * radiusSquared;
console.log("Площа кола дорівнює " + circleArea);

// Обчислення середнього арифметичного двох чисел
let num1 = 8;
let num2 = 4;
let averageNum = (num1 + num2) /2 ;
console.log("Середнє арифметичне чисел " + num1 + " та " + num2 + " дорівнює " + averageNum);

const array = [1, 2, 3];
array[0] = 2;
console.log(array);