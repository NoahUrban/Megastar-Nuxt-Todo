<script setup lang="ts">
import { useTodoListStore } from '@/stores/test'
import { onMounted } from 'vue'
import type { Todo } from '@/stores/test'


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
        <v-card class="pa-3" rounded="lg" color="#292639" dark>
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
                    src="@/assets/closed.svg"
                    alt="completed status"
                    max-width="24"
                  />
                  <!-- <div class="circle-2" /> -->
                </template>
              </v-btn>
            </v-col>

            <v-col>
              <h3 class="text-subtitle-2 mb-1">{{ todo.task }}</h3>
              <v-chip small class="ma-0" color="#3F3C4E">
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
                  src="@/assets/dots.svg"
                  alt="dots"
                  max-width="20"
                />
              </v-btn>

              <v-menu
                v-model="todo.dropdown"
                :close-on-content-click="false"
                location="bottom end"
                offset-y
              >
                <template #activator="{ props }">
                  <div v-bind="props" style="display: none;" />
                </template>

                <v-list class="bg-[#070417b5]" rounded>
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
  max-height: 435px;
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

.circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #3F3C4E;
}

.circle-2 {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #37ff00;
}

.dropdown-line {
  opacity: 0.3;
  margin: 0;
}
</style>
