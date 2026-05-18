const API_URL = 'https://fakestoreapi.com/products';

// // // Варіант 1: Використання fetch
// export const getProductsWithFetch = async () => {
//     try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error('Помилка мережі');
//         return await response.json();
//     } catch (error) {
//         console.error('Помилка fetch:', error);
//         return [];
//     }
// };


// Варіант 2: Використання axios (у запропонованому стилі)
export function getProductsWithAxios() {
    return axios.get(API_URL)
        .then(response => response.data) // у FakeStore API товари лежать одразу в data
        .catch(error => {
            console.error('Axios Error:', error);
            return [];
        });
}