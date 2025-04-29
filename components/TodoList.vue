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
                  <v-img
                    class="completed-img"
                    src="@/assets/closed.svg"
                    alt="completed status"
                  />
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
                <v-img
                  class="dots-img"
                  src="@/assets/dots.svg"
                  alt="dots"
                />
              </v-btn>

              <v-menu
                v-model="todo.dropdown"
                :close-on-content-click="false"
                location="bottom end"
                offset-y
              >
                <template #activator="{ props }">
                  <div v-bind="props" class="hidden-activator" />
                </template>

                <v-list class="dropdown-list" rounded>
                  <v-list-item
                    @click="editTodo(todo)"
                    class="text-white"
                  >
                    <v-list-item-title>Edit ToDo</v-list-item-title>
                  </v-list-item>
                  <v-divider class="dropdown-line" />
                  <v-list-item
                    @click="markCompleted(todo)"
                    class="text-white"
                  >
                    <v-list-item-title>Mark Completed</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
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
}

.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3F3C4E;
}

.completed-img {
  max-width: 24px;
}

.user-chip {
  margin: 0;
  background-color: #3F3C4E;
}

.dots-img {
  max-width: 20px;
}

.hidden-activator {
  display: none;
}

.dropdown-list {
  background-color: #070417b5;
}

.dropdown-line {
  opacity: 0.3;
  margin: 0;
}

</style>
