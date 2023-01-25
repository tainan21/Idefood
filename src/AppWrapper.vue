<template>
    <Landing v-if="$route.path === '/landing'" @change-theme="changeTheme" />
    <Login v-else-if="$route.path === '/login'" />
    <div v-else-if="$route.path === '/foodburguer' || '/carrinho' || 'product'" >
        <div v-if="$route.path === '/foodburguer'">
            <FoodBurguer/>
        </div>
        <div v-if="$route.path === '/carrinho'">
            <CarBurguer/>
        </div>
        <div v-if="$route.path === '/product'">
            <Product />
        </div>
        <MenuBottom />
    </div>
    <Error v-else-if="$route.path === '/error'" />
    <NotFound v-else-if="$route.path === '/notfound'" />
    <Access v-else-if="$route.path === '/access'" />
    <App v-else @change-theme="changeTheme" />
</template>

<script>
import EventBus from './AppEventBus';
import App from './App';
import MenuBottom from "./pages/BottomNave.vue"
import Landing from './pages/LandingDemo';
import FoodBurguer from './pages/FoodBurguer';
import Product from './pages/Product';
import CarBurguer from './pages/CarBurguer';
import Login from './pages/Login';
import Error from './pages/Error';
import NotFound from './pages/NotFound';
import Access from './pages/Access';

export default {
    methods: {
        changeTheme(event) {
            let themeElement = document.getElementById('theme-link');
            themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.$appState.theme, event.theme));
            this.$appState.theme = event.theme;
            this.$appState.darkTheme = event.dark;
            EventBus.emit('change-theme', event);

            if (event.theme.startsWith('md')) {
                this.$primevue.config.ripple = true;
            }
        }
    },
    components: {
        App,
        Landing,
        FoodBurguer,
        'MenuBottom': MenuBottom,
        Product,    
        CarBurguer,
        Login,
        Error,
        NotFound,
        Access
    }
}
</script>