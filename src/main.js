import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const pinia = createPinia();
pinia.use(piniaPersist);

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app');

// Neutralino.init()