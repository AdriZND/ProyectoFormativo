import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

import LoginView from "@/views/LoginView.vue";
import ForgetPasswordView from "@/views/ForgetPasswordView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ConfirmationView from "@/views/ConfirmationView.vue";
import ChangePasswordView from "@/views/ChangePasswordView.vue";
import UserProfileView from "@/views/UserProfileView.vue";
import HomePageView from "@/views/HomePageView.vue";
import EditUserView from "@/views/EditUserView.vue";
import AddSubjectView from "@/views/AddSubjectView.vue";
import AssignSubjectView from "@/views/AssignSubjectView.vue";

const routes = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/forgetpassword",
    component: ForgetPasswordView,
  },
  {
    path: "/signup",
    component: SignUpView,
  },
  {
    path: "/confirmation/:username",
    component: ConfirmationView,
  },
  {
    path: "/forgetpassword/changepassword/:access_token",
    component: ChangePasswordView,
  },
  {
    path: "/profile/:username",
    component: UserProfileView,
  },
  {
    path: "/home/:username",
    component: HomePageView,
  },
  {
    path: "/home/:username/edit",
    component: EditUserView,
  },
  {
    path: "/subjects/add",
    component: AddSubjectView,
  },
  {
    path: "/subjects/assign",
    component: AssignSubjectView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ["/", "/forgetpassword", "/signup"];
  const publicDynamicPages =
    to.path.includes("/confirmation/") ||
    to.path.includes("/forgetpassword/changepassword/");
  const isPublic = publicPages.includes(to.path) || publicDynamicPages;
  const auth = useAuthStore();

  if (!isPublic && !auth.session) {
    auth.returnUrl = to.fullPath;
    return "/";
  }
});

export default router;
