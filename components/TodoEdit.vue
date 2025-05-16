<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
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
  { title: 'Open', value: false },
  { title: 'Closed', value: true },
]

const currentTodo = computed<Todo>(() => store.currentTodo!)

const todo = reactive<Omit<Todo, 'id'| 'dropdown'>>({
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
  <div class="todo-form__container">
    <hr class="todo-form__divider" />
    <div class="todo-form__header">
      <v-btn icon @click="disableEditTodoForm" variant="plain" class="todo-form__back-btn">
        <img src="@/assets/arrow.svg" alt="arrow"/>
      </v-btn>
      <h1 class="todo-form__title">Edit ToDo</h1>
    </div>

    <div class="todo-form__item">
      <v-text-field
        v-model="todo.task"
        placeholder="Task"
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
      <v-btn @click="updateTodo" class="todo-form__btn--finish" block size="large">
        Finish
      </v-btn>

      <v-btn @click="disableEditTodoForm" class="todo-form__btn--quit" block size="large">
        Quit
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>