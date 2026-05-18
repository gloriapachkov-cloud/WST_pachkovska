import { Category, Worker } from "./types";

/**
 * Повертає всіх працівниківc
 */
export function getAllWorkers(): Worker[] {
    return [
        { id: 1, name: "Olena", surname: "Kovalenko", available: false, salary: 1000, category: Category.BusinessAnalyst },
        { id: 2, name: "Artem", surname: "Shevchenko", available: true, salary: 1500, category: Category.Developer },
        { id: 3, name: "Ihor", surname: "Bondarenko", available: false, salary: 1600, category: Category.QA },
        { id: 4, name: "Sofiia", surname: "Melnyk", available: true, salary: 1300, category: Category.Designer }
    ];
}
/**
 * Виводить першого доступного працівника
 */
export function logFirstAvailable(
    workers: Worker[] = getAllWorkers()
): void {
    console.log(`Кількість працівників: ${workers.length}`);

    for (const worker of workers) {
        if (worker.available) {
            console.log(`Перший доступний: ${worker.name} ${worker.surname}`);
            break;
        }
    }
}

/**
 * Повертає прізвища за категорією
 */
export function getWorkersSurnamesByCategory(
    category: Category = Category.Designer
): string[] {
    return getAllWorkers()
        .filter(w => w.category === category)
        .map(w => w.surname);
}

/**
 * Виводить список імен
 */
export function logWorkersNames(names: string[]): void {
    names.forEach(name => console.log(name));
}

/**
 * Повертає працівника по ID
 */
export function getWorkerByID(
    id: number
): { name: string; surname: string; salary: number } | undefined {
    const worker = getAllWorkers().find(w => w.id === id);

    if (!worker) return undefined;

    return {
        name: worker.name,
        surname: worker.surname,
        salary: worker.salary
    };
}

/**
 * Створює ID клієнта
 */
export function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

/**
 * Створює клієнта
 */
export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Ім’я клієнта: ${name}`);

    if (age !== undefined) {
        console.log(`Вік: ${age}`);
    }

    if (city !== undefined) {
        console.log(`Місто: ${city}`);
    }
}

/**
 * Перевіряє доступних працівників
 */
export function checkoutWorkers(customer: string, ...workerIDs: number[]): string[] {
    console.log(`Клієнт: ${customer}`);

    const workers = getAllWorkers();
    const result: string[] = [];

    workerIDs.forEach(id => {
        const worker = workers.find(w => w.id === id);

        if (worker && worker.available) {
            result.push(`${worker.name} ${worker.surname}`);
        }
    });

    return result;
}