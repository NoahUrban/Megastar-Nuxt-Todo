<script setup lang="ts">
import { useTodoListStore } from '~/stores/todo'
import { onMounted } from 'vue'
import type { Todo } from '~/stores/todo'

const store = useTodoListStore()

onMounted(() => {
  store.fetchTodos()
})

const editTodo = (todo: Todo) => {
  store.editTodo(todo.id)
  store.toggleDropdown(todo.id)
}

const markCompletedToggleless = (todo: Todo) => {
  store.toggleCompleted(todo.id)
}

const markCompleted = (todo: Todo) => {
  store.toggleCompleted(todo.id)
  store.toggleDropdown(todo.id)
}

const toggleDropdown = (id: number) => {
  store.toggleDropdown(id)
}
</script>

<template>
  <v-divider class="my-4" />

  <v-container class="todo-list-wrapper" fluid>
    <v-row dense>
      <v-col
        v-for="(todo, index) in store.filteredTodos"
        :key="todo.id"
        cols="12"
      >
        <v-card class="todo-card">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <v-btn
                icon
                variant="text"
                @click="markCompletedToggleless(todo)"
              >
                <template v-if="!todo.completed">
                  <div class="circle" />
                </template>
                <template v-else>
                  <img src="@/assets/closed.svg" alt="completed status" class="completed-img" />
                </template>
              </v-btn>
            </v-col>

            <v-col>
              <h3 class="text-subtitle-2 mb-1">{{ todo.task }}</h3>
              <v-chip class="user-chip" small>
                User: {{ todo.user }}
              </v-chip>
            </v-col>

            <v-col cols="auto" class="position-relative">
              <v-btn
                icon
                variant="text"
                @click="toggleDropdown(todo.id)"
              >
                <img src="@/assets/dots.svg" alt="dots" class="dots-img" />
              </v-btn>

              <div v-if="todo.dropdown" class="dropdown-menu">
                <button @click="editTodo(todo)" class="dropdown-item">Edit ToDo</button>
                <hr class="dropdown-line">
                <button @click="markCompleted(todo)" class="dropdown-item">Mark Completed</button>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.todo-list-wrapper {
  max-height: 450px;
  padding-top: 0;
  overflow-y: auto;
  position: relative;
}

.todo-list-wrapper::-webkit-scrollbar {
  width: 6px;
}

.todo-list-wrapper::-webkit-scrollbar-track {
  background: #292639;
  border-radius: 8px;
}

.todo-list-wrapper::-webkit-scrollbar-thumb {
  background-color: #3B3753;
  border-radius: 8px;
}

.todo-card {
  padding: 12px;
  border-radius: 12px;
  background-color: #292639;
  color: white;
  position: relative;
}

.text-subtitle-2 {
  padding-left: 10px;
}

.circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #3F3C4E;
}

.completed-img {
  width: 44px;
  height: 44px;
}

.user-chip {
  height: 20px;
  width: 50px;
  border-radius: 6px;
  margin-left: 10px;
  background-color: #3F3C4E;
  color: #BDBDBD;
  font-size: 12px;
  text-align: left;
  padding-left: 7px;
}

.dots-img {
  max-width: 20px;
}

.dropdown-menu {
  position: absolute;
  top: 37px;
  right: 8px;
  display: flex;
  flex-direction: column;
  background-color: rgba(7, 4, 23, 0.71);
  padding: 4px;
  padding-top: 1px;
  padding-bottom: 1px;
  border-radius: 8px;
  z-index: 10000;
  min-width: 120px;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 12px;
  border-width: 0 4px 7px 4px;
  border-style: solid;
  border-color: transparent transparent rgba(7, 4, 23, 0.71) transparent;
}

.dropdown-item {
  background-color: transparent;
  color: #ffffff;
  font-size: 13px;
  font-weight: 300;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 4px;
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  width: 100%;
}

.dropdown-item:last-child {
  margin-bottom: 0;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-line {
  margin: 0px auto;
  margin-top: -5px;
  width: 90px;
  opacity: 0.3;
  border-color: white;
}

.my-4 {
  width: 78px;
  margin: 0px auto;
  border: 1px solid white;
}
</style>