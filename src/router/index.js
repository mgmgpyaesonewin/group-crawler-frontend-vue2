import Vue from 'vue'
import Router from 'vue-router';

const Login = () => import('@/views/Login')

Vue.use(Router)

export default new Router({
    mode: "history",
    linkActiveClass: "active",
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
});

function configRoutes() {
    return [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }
    ];
}