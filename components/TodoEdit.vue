<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useTodoListStore } from '~/stores/todo'

const store = useTodoListStore()

const currentTodo = computed(() => store.currentTodo!)

const todo = reactive({
  task: currentTodo.value.task,
  user: currentTodo.value.user,
  completed: currentTodo.value.completed
})

const updateTodo = () => {
  store.updateTodo({
    task: todo.task,
    user: todo.user,
    completed: todo.completed,
    id: currentTodo.value.id,
    dropdown: currentTodo.value.dropdown
  })
}

const disableEditTodoForm = () => {
  store.triggerEditTodoForm()
}
</script>

<template>
  <div class="edit-todo__container">
    <hr class="edit-todo__divider" />
    <div class="edit-todo__header">
      <v-btn icon @click="disableEditTodoForm" variant="plain" class="edit-todo__back-btn">
        <img src="@/assets/arrow.svg" alt="arrow"/>
      </v-btn>
      <h1 class="edit-todo__title">Edit ToDo</h1>
    </div>

    <div class="edit-todo__item">
      <v-text-field
        v-model="todo.task"
        placeholder="Task"
        variant="solo"
        hide-details
        color="white"
        class="edit-todo__input"
      />
    </div>

    <div class="edit-todo__item">
      <v-select
        v-model="todo.user"
        :items="[
          { title: 'User 1', value: 1 },
          { title: 'User 2', value: 2 },
          { title: 'User 3', value: 3 }
        ]"
        placeholder="User"
        variant="solo"
        hide-details
        color="white"
        class="edit-todo__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="edit-todo__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="edit-todo__item">
      <v-select
        v-model="todo.completed"
        :items="[
          { title: 'Open', value: false },
          { title: 'Closed', value: true },
        ]"
        placeholder="Status"
        variant="solo"
        hide-details
        color="white"
        class="edit-todo__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="edit-todo__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="edit-todo__buttons">
      <v-btn @click="updateTodo" class="edit-todo__btn--finish" block size="large">
        Finish
      </v-btn>

      <v-btn @click="disableEditTodoForm" class="edit-todo__btn--quit" block size="large">
        Quit
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.edit-todo__container {
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
  margin-top: 17px;
}

.edit-todo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 25px;
}

.edit-todo__title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: white;
  padding-right: 50px;
}

.edit-todo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  position: relative;
}

.edit-todo__input {
  width: 100%;
  background-color: #292639 !important;
  border-radius: 5px;
  color: white;
}

.edit-todo__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.edit-todo__btn--finish {
  background-color: #6add8a !important;
  color: white;
  margin-bottom: 10px;
}

.edit-todo__btn--quit {
  background-color: #070417 !important;
  color: white;
}

.edit-todo__divider {
  height: 4px;
  width: 40px;
  margin: 0px auto;
  margin-bottom: 2px;
  background-color: #3f3c4e;
  border: none;
  border-radius: 8px;
}

.edit-todo__icon--16 {
  max-width: 16px;
}
</style>
