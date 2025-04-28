<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoListStore } from '@/stores/test'

const store = useTodoListStore()

// Non-nullable computed reference to currentTodo
const currentTodo = computed(() => store.currentTodo!)

const task = ref(currentTodo.value.task)
const user = ref(currentTodo.value.user)
const completed = ref<boolean | ''>(currentTodo.value.completed)

const updateTodo = () => {
  const updatedTodo = {
    task: task.value,
    user: user.value,
    completed: completed.value as boolean,
    id: currentTodo.value.id,
    dropdown: currentTodo.value.dropdown,
  }

  store.updateTodo(updatedTodo)
}

// Method to toggle edit form
const disableEditTodoForm = () => {
  store.triggerEditTodoForm()
}
</script>


<template>
  <div class="edit-todo-container">
    <hr />
    <div class="form-header">
      <v-btn icon @click="disableEditTodoForm" variant="plain">
        <v-img src="@/assets/arrow.svg" alt="arrow" max-width="24" />
      </v-btn>
      <h1>Edit ToDo</h1>
    </div>

    <div class="todo-items">
      <v-text-field
        v-model="task"
        placeholder="Task"
        variant="solo"
        hide-details
        color="white"
        class="input-field"
      />
    </div>

    <div class="todo-items">
      <v-select
        v-model="user"
        :items="[
          { title: 'User 1', value: 1 },
          { title: 'User 2', value: 2 },
          { title: 'User 3', value: 3 }
        ]"
        placeholder="User"
        variant="solo"
        hide-details
        color="white"
        class="input-field"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" max-width="16" />
        </template>
      </v-select>
    </div>

    <div class="todo-items">
      <v-select
        v-model="completed"
        :items="[
          { title: 'Open', value: false },
          { title: 'Closed', value: true },
        ]"
        placeholder="Status"
        variant="solo"
        hide-details
        color="white"
        class="input-field"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" max-width="16" />
        </template>
      </v-select>
    </div>

    <div class="buttons">
      <v-btn @click="updateTodo" class="finish-button" block size="large">
        Finish
      </v-btn>
      <v-btn @click="disableEditTodoForm" class="quit-button" block size="large">
        Quit
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.edit-todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: #070417;
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px 20px 0 0;
  width: 375px;
  margin: 0 auto;
  max-height: 700px;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 25px;
}

.form-header h1 {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: white;
  padding-right: 50px;
}

.todo-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  position: relative;
}

.input-field {
  width: 100%;
  background-color: #292639 !important;
  border-radius: 5px;
  color: white;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.finish-button {
  background-color: #6add8a !important;
  color: white;
  margin-bottom: 10px;
}

.quit-button {
  background-color: #070417 !important;
  color: white;
}

hr {
  height: 4px;
  width: 40px;
  margin: 0px auto;
  margin-bottom: 2px;
  background-color: #3f3c4e;
  border: none;
  border-radius: 8px;
}
</style>
