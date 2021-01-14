import Vue from "vue";
import Router from "vue-router";

const Login = () => import("@/views/Login");
const Group = () => import("@/views/Group/Index");
const User = () => import("@/views/User/Index");
const UserEdit = () => import("@/views/User/Edit");
const DashboardContainer = () => import("@/containers/Dashboard");

Vue.use(Router);

export default new Router({
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/",
      name: "Home",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardContainer,
      children: [
        {
          path: "/posts",
          name: "Posts",
          component: Group,
        },
        {
          path: "/groups",
          name: "Groups",
          component: Group,
        },
        {
          path: "/industries",
          name: "Industries",
          component: Group,
        },
        {
          path: "/users",
          name: "Users",
          component: User,
        },
        {
          path: "/users/edit/:id",
          name: "EditUsers",
          component: UserEdit,
        },
      ],
    },
  ];
}
