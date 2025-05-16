<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useTodoListStore } from '~/stores/todo'
import type { Todo } from '~/models/todo'
import type { DropdownFormOption } from '~/models/dropdown'

const store = useTodoListStore()

const userOptions: DropdownFormOption<number>[] = [
  { title: 'User 1', value: 1 },
  { title: 'User 2', value: 2 },
  { title: 'User 3', value: 3 },
]

const statusOptions: DropdownFormOption<boolean>[] = [
  { title: 'Open', value: false},
  { title: 'Closed', value: true }
]

const todo = reactive<Omit<Todo, 'id' | 'dropdown'> >({
  task: '',
  user: null,
  completed: false
})

const addTodo = () => {
  if (todo.task && todo.user && todo.completed !== null) {
    store.addTodo({ ...todo })
    store.triggerAddTodoForm()

    todo.task = ''
    todo.user = null
    todo.completed = false
  }
}

const disableAddTodoForm = () => {
  store.triggerAddTodoForm()
}
</script>

<template>
  <div :class="['todo-form__container', { 'todo-form__container--slide-up': store.addTodoForm }]">
    <hr class="todo-form__divider" />
    <div class="todo-form__header">
      <v-btn icon @click="disableAddTodoForm" variant="plain" class="todo-form__back-btn">
        <img src="@/assets/arrow.svg" alt="arrow"/>
      </v-btn>
      <h1 class="todo-form__title">Add ToDo</h1>
    </div>

    <div class="todo-form__item">
      <v-text-field
        v-model="todo.task"
        placeholder="New Todo"
        variant="solo"
        hide-details
        color="white"
        class="todo-form__input"
      />
    </div>

    <div class="todo-form__item">
      <v-select
        v-model="todo.user"
        :items="userOptions"
        placeholder="User"
        variant="solo"
        hide-details
        color="white"
        class="todo-form__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="todo-form__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="todo-form__item">
      <v-select
        v-model="todo.completed"
        :items="statusOptions"
        placeholder="Status"
        variant="solo" 
        hide-details
        color="white"
        class="todo-form__input"
      >
        <template #append-inner>
          <v-img src="@/assets/Vector.svg" alt="dropdown" class="todo-form__icon--16" />
        </template>
      </v-select>
    </div>

    <div class="todo-form__buttons">
      <v-btn @click="addTodo" class="todo-form__btn--finish" block size="large">
        Finish
      </v-btn>

      <v-btn @click="disableAddTodoForm" class="todo-form__btn--quit" block size="large">
        Quit
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>