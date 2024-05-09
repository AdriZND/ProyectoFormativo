import { defineStore } from "pinia";
import UsersDataService from "@/services/UsersDataService";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    session: JSON.parse(localStorage.getItem("session")),
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  actions: {
    async login(user) {
      try {
        const response = await UsersDataService.login(user);
        const responseData = response.data;

        if (responseData && responseData.session) {
          const session = responseData.session;
          const user = responseData.user;

          // Update state
          this.session = session;
          this.user = user;
          // Save the user in local storage
          localStorage.setItem("session", JSON.stringify(session));
          localStorage.setItem("user", JSON.stringify(user));

          // Show alert and redirect
          alert(responseData.message);
          this.$router.push("/home/" + user.username);
        } else {
          console.error("No user data found in the response");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert(error.response.data.message);
          console.error(error.response.data.message);
        } else {
          console.error(error.message);
        }
      }
    },

    async logout() {
      await UsersDataService.logout();
      this.session = null;
      this.user = null;
      localStorage.removeItem("session");
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
});
