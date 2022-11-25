import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './router';
import VueSweetalert2 from 'vue-sweetalert2';
import '@sweetalert2/theme-dark';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

const pinia = createPinia()
    .use(piniaPersist);

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueSweetalert2)
    .mount('#app');

if (!window.NL_PORT) {
    const config = await import('./auth_info.json');
    window.NL_PORT = config.port;
    window.NL_TOKEN = config.accessToken;
}

Neutralino.init();