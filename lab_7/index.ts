import {
    getAllWorkers,
    logFirstAvailable,
    getWorkersSurnamesByCategory,
    logWorkersNames,
    getWorkerByID,
    createCustomerID,
    createCustomer,
    checkoutWorkers
} from "./functions";

import { Category } from "./types";

// Завдання 1
console.log("Завдання 1");

console.log(getAllWorkers());
logFirstAvailable();

// Завдання 2
console.log("Завдання 2");

const surnames = getWorkersSurnamesByCategory(Category.Developer);
logWorkersNames(surnames);

// виклик без параметра
logWorkersNames(getWorkersSurnamesByCategory());

// Завдання 3
console.log("Завдання 3");

getAllWorkers()
    .filter(w => w.category === Category.Developer)
    .forEach(w => console.log(w.name, w.surname));

const worker = getWorkerByID(2);
if (worker) {
    console.log(worker);
}

// Завдання 4
console.log("Завдання 4");

const myID: string = createCustomerID("Ivan", 1);
console.log(myID);

let idGenerator: (name: string, id: number) => string;

idGenerator = (name: string, id: number): string => {
    return `${name}${id}`;
};

console.log(idGenerator("Ivan", 2));

// присвоєння функції
idGenerator = createCustomerID;
console.log(idGenerator("Ivan", 3));

// Завдання 5
console.log("-Завдання 5");

createCustomer("Ivan");
createCustomer("Ivan", 18);
createCustomer("Ivan", 18, "Kyiv");

// виклик без параметра
logFirstAvailable();

const myWorkers = checkoutWorkers("Ivan", 1, 2, 3, 4);

myWorkers.forEach(w => console.log(w));