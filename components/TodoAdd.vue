<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTodoListStore } from '~/stores/todo'

const store = useTodoListStore()

const todo = reactive<{
  task: string,
  user: number | '',
  completed: boolean | ''
}>({
  task: '',
  user: '',
  completed: '',
})

const addTodo = () => {
  if (todo.task && todo.user && todo.completed !== '') {
    store.addTodo({
      task: todo.task,
      user: todo.user,
      completed: todo.completed,
    })
    store.triggerAddTodoForm()

    todo.task = ''
    todo.user = ''
    todo.completed = ''
  }
}

const disableAddTodoForm = () => {
  store.triggerAddTodoForm()
}
</script>

<template>
  <div :class="['add-todo__container', { 'add-todo__container--slide-up': store.addTodoForm }]">
    <hr class="add-todo__divider" />
    <div class="add-todo__header">
      <v-btn icon @click="disableAddTodoForm" variant="plain" class="add-todo__back-btn">
        <img src="@/assets/arrow.svg" alt="arrow"/>
      </v-btn>
      <h1 class="add-todo__title">Add ToDo</h1>
    </div>

    <div class="add-todo__item">
      <v-text-field
        v-model="todo.task"
        placeholder="New Todo"
        variant="solo"
        hide-details
        color="white"
        class="add-todo__input"
      />
    </div>

    <div class="add-todo__item">
      <v-select
        v-model="todo.user"
        :items="[
          {title: 'User 1', value: 1},
          {title: 'User 2', value: 2},
          {title: 'User 3', value: 3}
        ]"
        placeholder="User"
        variant="solo"
        hide-details
        color="white"
        class="add-todo__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="add-todo__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="add-todo__item">
      <v-select
        v-model="todo.completed"
        :items="[
          { title: 'Open', value: false },
          { title: 'Closed', value: true }
        ]"
        placeholder="Status"
        variant="solo"
        hide-details
        color="white"
        class="add-todo__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="add-todo__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="add-todo__buttons">
      <v-btn @click="addTodo" class="add-todo__btn--finish" block size="large">
        Finish
      </v-btn>

      <v-btn @click="disableAddTodoForm" class="add-todo__btn--quit" block size="large">
        Quit
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.add-todo__container {
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
  border-radius: 20px 20px 0 0;
  width: 375px;
  margin: 0 auto;
  margin-top: 17px;
  max-height: 700px;
  transform: translateY(100%);
  transition: transform 1.5s ease-in-out;
}

.add-todo__container--slide-up {
  transform: translateY(0%);
}

.add-todo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  padding-top: 25px;
}

.add-todo__title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  color: white;
  padding-right: 50px;
}

.add-todo__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
  position: relative;
}

.add-todo__input {
  width: 100%;
  background-color: #292639 !important;
  border-radius: 5px;
  color: white;
}

.add-todo__buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
}

.add-todo__btn--finish {
  background-color: #6add8a !important;
  color: white;
  margin-bottom: 10px;
}

.add-todo__btn--quit {
  background-color: #070417 !important;
  color: white;
}

.add-todo__divider {
  height: 4px;
  width: 40px;
  margin: 0px auto;
  margin-bottom: 2px;
  background-color: #3f3c4e;
  border: none;
  border-radius: 8px;
}

.add-todo__icon--16 {
  max-width: 16px;
}
</style>
