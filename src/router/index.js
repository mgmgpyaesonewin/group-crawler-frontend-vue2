import Vue from "vue";
import Router from "vue-router";

const DashboardContainer = () => import("@/containers/Dashboard");
const Login = () => import("@/views/Login");
const Group = () => import("@/views/Group/Index");
const User = () => import("@/views/User/Index");
const UserNew = () => import("@/views/User/New");
const UserEdit = () => import("@/views/User/Edit");
const Industry = () => import("@/views/Industry/Index");
const IndustryNew = () => import("@/views/Industry/New");
const IndustryEdit = () => import("@/views/Industry/Edit");


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
          component: Industry,
        },
        {
          path: "/industries/new",
          name: "NewIndustries",
          component: IndustryNew,
        },
        {
          path: "/industries/edit/:id",
          name: "EditIndustries",
          component: IndustryEdit,
        },
        {
          path: "/users",
          name: "Users",
          component: User,
        },
        {
          path: "/users/new",
          name: "NewUsers",
          component: UserNew,
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
