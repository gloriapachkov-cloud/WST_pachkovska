"use strict";

// Завдання 2 — поведінка this у різних контекстах
console.log("=== Завдання 2 ===");

const student = {
  firstName: "Глорія",
  lastName: "Пачковська",
  score: 69,
  greet() {
    console.log(`Привіт, я ${this.firstName} ${this.lastName}, мій бал: ${this.score}`);
  },
};

student.greet(); 

const greetFn = student.greet;

// Спосіб 1: bind
const greetBind = student.greet.bind(student);
greetBind();

// Спосіб 2: стрілочна функція-обгортка (не має власного this, бере з оточення)
const greetArrow = () => student.greet();
greetArrow();

// Спосіб 3: збереження this у змінну self
const self = student;
function greetSelf() { self.greet(); }
greetSelf();

// Завдання 3 — call та apply
console.log("=== Завдання 3 ===");

function introduce(greeting, punctuation) {
  console.log(`${greeting}, мене звуть ${this.firstName} ${this.lastName}${punctuation}`);
}

const person1 = { firstName: "Даша",  lastName: "Павлюк" };
const person2 = { firstName: "Олеся", lastName: "Павловська"    };

// call — аргументи через кому
introduce.call(person1, "Добрий день", "!");

// apply — аргументи масивом
introduce.apply(person2, ["Вітаю", "."]);

// Завдання 4 — bind та часткове застосування
console.log("=== Завдання 4 ===");

// Формула: (this.salary + bonus) * rate / 100
function calculateTax(rate, bonus) {
  const tax = ((this.salary + bonus) * rate) / 100;
  return `Податок для ${this.name}: ${tax.toFixed(2)} UAH`;
}

const employee = { name: "Москаленко Юлія", salary: 30000 };

// Фіксуємо контекст + rate=18, bonus залишається вільним
const calculateEmployeeTax = calculateTax.bind(employee, 18);

console.log(calculateEmployeeTax(0));      
console.log(calculateEmployeeTax(5000));   
console.log(calculateEmployeeTax(10000));  

const calculateFixed = calculateTax.bind(employee, 18, 3000);
console.log(calculateFixed()); // викликаємо без аргументів

// Завдання 5 — таймер, setInterval, bind
console.log("=== Завдання 5 ===");

const timer = {
  name: "Таймер",
  seconds: 0,
  start() {
    const id = setInterval(function () {
      this.seconds++;
      console.log(`${this.name}: ${this.seconds} сек`);
      if (this.seconds >= 5) {
        clearInterval(id); 
        console.log("Таймер зупинено.");
      }
    }.bind(this), 1000);
  },
};

timer.start();

// Завдання 6* — власна реалізація myBind
console.log("=== Завдання 6 ===");

function myBind(fn, context, ...fixedArgs) {
  return function (...laterArgs) {
    return fn.call(context, ...fixedArgs, ...laterArgs);
  };
}

// Перевірка на прикладах попередніх завдань:
const myGreet = myBind(student.greet, student);
myGreet(); // як bind з завдання 2

const myIntroduce = myBind(introduce, person1, "Слава Україні");
myIntroduce("!"); // як call з завдання 3

const myCalcTax = myBind(calculateTax, employee, 18);
console.log(myCalcTax(2000)); // як часткове застосування з завдання 4
