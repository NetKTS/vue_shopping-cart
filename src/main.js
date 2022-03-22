import { createApp } from 'vue'
import App from './App.vue'
import Cart from './views/Cart.vue'
import Store from './views/Store.vue'
import { createRouter, createWebHashHistory } from 'vue-router';

const routes =[
    { 
        path: "/", 
        component: Store
    },
    {
        path: "/cart",
        component: Cart
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.mount("#app");