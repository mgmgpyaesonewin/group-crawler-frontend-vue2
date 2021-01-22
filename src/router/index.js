import Vue from "vue";
import Router from "vue-router";

const DashboardContainer = () => import("@/containers/Dashboard");
const Login = () => import("@/views/Login");
const User = () => import("@/views/User/Index");
const UserNew = () => import("@/views/User/New");
const UserEdit = () => import("@/views/User/Edit");
const Industry = () => import("@/views/Industry/Index");
const IndustryNew = () => import("@/views/Industry/New");
const IndustryEdit = () => import("@/views/Industry/Edit");
const Group = () => import("@/views/Group/Index");
const GroupNew = () => import("@/views/Group/New");
const GroupEdit = () => import("@/views/Group/Edit");
const Post = () => import("@/views/Post/Index");
const PostNew = () => import("@/views/Post/New");
const PostEdit = () => import("@/views/Post/Edit");

Vue.use(Router);

export default new Router({
  mode: "hash",
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
        {
          path: "/groups",
          name: "Group",
          component: Group,
        },
        {
          path: "/groups/new",
          name: "NewGroups",
          component: GroupNew,
        },
        {
          path: "/groups/edit/:id",
          name: "EditGroups",
          component: GroupEdit,
        },
        {
          path: "/posts",
          name: "Post",
          component: Post,
        },
        {
          path: "/posts/new",
          name: "PostNew",
          component: PostNew,
        },
        {
          path: "/posts/edit/:id",
          name: "EditPosts",
          component: PostEdit,
        },
      ],
    },
  ];
}
