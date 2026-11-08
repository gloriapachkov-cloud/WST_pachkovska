// Навчальне сховище: дані зникають після перезапуску сервера.
export const users = [];
export const services = [];
let nextUserId = 1;
let nextServiceId = 1;
export const getNextUserId = () => String(nextUserId++);
export const getNextServiceId = () => String(nextServiceId++);
