import { state } from './state.js';

const API_URL = 'https://randomuser.me/api/?results=50';
const SPECIALTIES = ['Mathematics', 'Chemistry', 'Physics', 'English', 'Computer Science', 'Art', 'Biology'];

/**
 * Отримує дані викладачів з API
 * @returns {Promise<boolean>}
 */
export async function fetchTeachers() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        state.apiTeachers = data.results.map(user => ({
            id: user.login.uuid,
            picture: user.picture.large,
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            country: user.location.country,
            city: user.location.city,
            nationality: user.nat,
            specialty: SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)]
        }));
        return true;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}