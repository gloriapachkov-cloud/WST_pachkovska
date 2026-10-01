/**
 * Глобальний стан застосунку.
 * Зберігає дані з API, доданих користувачів, обране та налаштування відображення.
 * @type {Object}
 */
export const state = {
    apiTeachers: [],
    customTeachers: JSON.parse(localStorage.getItem('customTeachers')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    currentPage: 1,
    itemsPerPage: 10,
    sortConfig: { key: 'firstName', direction: 'asc' } 
};
/**
 * Повертає об'єднаний масив усіх викладачів (додані вручну + отримані з API).
 * @returns {Array} Масив об'єктів викладачів.
 */
export function getAllTeachers() {
    return [...state.customTeachers, ...state.apiTeachers];
}