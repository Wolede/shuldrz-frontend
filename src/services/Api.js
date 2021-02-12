import Axios from "axios";

// separating urls for environments
// let urls = {
//     test: `http://localhost:3334`,
//     development: 'http://localhost:3333/',
//     production: 'https://your-production-url.com/'
// }

const { API_URL } = process.env

const api = Axios.create({
    baseURL: API_URL,
    // baseURL: urls[process.env.NODE_ENV], // selecting environment
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

console.log(process.env.NODE_ENV, 'node');
const config = process.env.NODE_ENV === 'production' ? {
    apiKey: "AIzaSyBJ8MGYaFEDfGnvMeKyeoNgT0i3ch7-8JA",
    authDomain: "shuldrz-chat.firebaseapp.com",
    databaseURL: "https://shuldrz-chat.firebaseio.com",
    projectId: "shuldrz-chat",
    storageBucket: "shuldrz-chat.appspot.com",
    messagingSenderId: "138433830895",
    appId: "1:138433830895:web:ce57ed0cb1d1ee54f1201a"
} : {
    apiKey: "AIzaSyANHygUmqxZhbgku31gsyOgjl6QOvtkMco",
    authDomain: "shuldrz-chat-test.firebaseapp.com",
    databaseURL: "https://shuldrz-chat-test.firebaseio.com",
    projectId: "shuldrz-chat-test",
    storageBucket: "shuldrz-chat-test.appspot.com",
    messagingSenderId: "148415518343",
    appId: "1:148415518343:web:b3ce13f58b5b9dceb6ca22"
}

export default api;

export const firebaseConfig = config