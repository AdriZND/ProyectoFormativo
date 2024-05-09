import { useAuthStore } from "@/stores/auth.store";

export default function authHeader() {
  const { session } = useAuthStore();
  if (user && session.id_user) {
    return {
      "x-access-token": session.id_user,
    };
  } else {
    return {};
  }
}
