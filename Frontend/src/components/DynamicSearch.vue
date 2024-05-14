<script setup>
import { ref, watch, defineProps, defineEmits } from "vue"
import { debounce } from "lodash"
import UsersDataService from "@/services/UsersDataService"
import SubjectsDataService from "@/services/SubjectsDataService"

const searchQueryUsers = ref("")
const searchQuerySubjects = ref("")
const data = ref([])
const filteredUsers = ref([])
const filteredSubjects = ref([])
const selectedUser = ref("")
const selectedSubject = ref("")

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ["User", "Subject"].includes(value),
  },
})

const emits = defineEmits(["userSelected", "subjectSelected"])

const debouncedFetchUsers = debounce(async () => {
  try {
    if (searchQueryUsers.value.length > 0) {
      const response = await UsersDataService.findAllStudents()
      data.value = response.data
      updateFilteredUsers()
    } else {
      data.value = []
      filteredUsers.value = []
    }
  } catch (error) {
    console.error("Error fetching users:", error)
  }
}, 300)

const updateFilteredUsers = () => {
  filteredUsers.value = data.value.filter((user) =>
    user.username.toLowerCase().includes(searchQueryUsers.value.toLowerCase())
  )
}

debouncedFetchUsers()

const debouncedFetchSubjects = debounce(async () => {
  try {
    if (searchQuerySubjects.value.length > 0) {
      const response = await SubjectsDataService.findAllSubjects()
      data.value = response.data
      updateFilteredSubjects()
    } else {
      data.value = []
      filteredSubjects.value = []
    }
  } catch (error) {
    console.error("Error fetching subjects:", error)
  }
}, 300)
const updateFilteredSubjects = () => {
  filteredSubjects.value = data.value.filter((subject) =>
    subject.subject_name
      .toLowerCase()
      .includes(searchQuerySubjects.value.toLowerCase())
  )
}

debouncedFetchSubjects()

//Manejamos el cambio del select manualmente por parte del usuario
const handleUserchange = (username) => {
  console.log(username.target.value)
  selectedUser.value = username.target.value
  emits("userSelected", selectedUser.value)
}

const handleSubjectChange = (subjectName) => {
  selectedSubject.value = subjectName.target.value
  emits("subjectSelected", selectedSubject.value)
}

//Watchers para añadir valor default al select segun escribimos
watch(filteredUsers, (newValue, oldValue) => {
  if (newValue.length > 0 && !selectedUser.value) {
    selectedUser.value = newValue[0].username
    emits("userSelected", selectedUser.value)
  }
})

watch(filteredSubjects, (newValue, oldValue) => {
  if (newValue.length > 0 && !selectedSubject.value) {
    selectedSubject.value = newValue[0].subject_name
    emits("subjectSelected", selectedSubject.value)
  }
})

console.log(selectedSubject)
console.log(selectedUser)
</script>

<template>
  <div v-if="props.type === 'User'" class="d-flex flex-column">
    <input
      type="text"
      v-model="searchQueryUsers"
      @input="debouncedFetchUsers"
      class="mb-1 form-control form-control-sm"
    />
    <select
      v-model="selectedUser"
      class="form-select"
      @change="handleUserchange"
      
    >
      <!--  <option value="" disabled>Selecciona un usuario</option> -->
      <option
        v-for="user in filteredUsers"
        :key="user.id"
        :value="user.username"
      >
        {{ user.username }}
      </option>
    </select>
  </div>
  <div v-if="props.type === 'Subject'" class="d-flex flex-column">
    <input
      type="text"
      v-model="searchQuerySubjects"
      @input="debouncedFetchSubjects"
      class="mb-1 form-control form-control-sm"
    />
    <select
      v-model="selectedSubject"
      class="form-select"
      @change="handleSubjectChange"
      
    >
     
      <option
        v-for="subject in filteredSubjects"
        :key="subject.id"
        :value="subject.subject_name"
      >
        {{ subject.subject_name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
