<script setup>
import RelationsDataService from "@/services/RelationsDataService";
import UsersDataService from "@/services/UsersDataService";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  action: {
    type: String,
    required: true,
    validator: (value) =>
      ["Logout", "Edit", "Delete", "Profile", "Add Subject", "Assign"].includes(
        value
      ),
  },
  relationID: {
    type: Number,
  },
  editUser: {
    type: Number,
  },
  username: {
    type: String,
  },
  text: {
    type: String,
  },
});

const onClick = async () => {
  const editUser = props.editUser;
  const id = props.relationID;
  const username = authStore.user.username;
  if (props.action === "Logout") {
    return authStore.logout();
  } else if (props.action === "Edit") {
    router.push(`/home/edit/${editUser}`);
  } else if (props.action === "Delete") {
    //Delete
    await RelationsDataService.deleteUserRelation(id);
    router.go(0);
  } else if (props.action === "Profile") {
    router.push(`/profile/${username}`);
  } else if (props.action === "Add Subject") {
    router.push(`/subjects/add`);
  } else if (props.action === "Assign") {
    router.push(`/subjects/assign`);
  }
};
</script>

<template>
  <button @click="onClick">{{ props.text }}</button>
</template>

<style scoped></style>
