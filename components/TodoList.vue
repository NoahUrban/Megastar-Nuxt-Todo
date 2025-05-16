<script setup lang="ts">
import { useTodoListStore } from '~/stores/todo'
import { onMounted, onBeforeUnmount } from 'vue'
import type { Todo } from '~/models/todo'

const store = useTodoListStore()

const handleScroll = () => {
  store.closeAllDropdowns()
}

onMounted(() => {
  store.fetchTodos()
  const container = document.querySelector('.todo-list__wrapper')
  container?.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  const container = document.querySelector('.todo-list__wrapper')
  container?.removeEventListener('scroll', handleScroll)
})

const editTodo = (todo: Todo) => {
  store.editTodo(todo.id)
  store.closeAllDropdowns()
}

const markCompleted = (todo: Todo) => {
  store.toggleCompleted(todo.id)
  store.closeAllDropdowns()
}
</script>

<template>
  <v-divider class="todo-list__divider" />

  <v-container class="todo-list__wrapper" fluid>
    <v-row dense>
      <v-col v-for="(todo, index) in store.filteredTodos" :key="todo.id" cols="12">
        <v-card class="todo-list__card">
          <v-row align="center" no-gutters>
            <v-col cols="auto">
              <v-btn icon variant="text" @click="store.toggleCompleted(todo.id)">
                <template v-if="!todo.completed">
                  <div class="todo-list__circle" />
                </template>
                <template v-else>
                  <img src="@/assets/closed.svg" alt="completed status" class="todo-list__completed-img" />
                </template>
              </v-btn>
            </v-col>

            <v-col>
              <h3 class="todo-list__task text-subtitle-2 mb-1">{{ todo.task }}</h3>
              <v-chip class="todo-list__chip" small>
                User: {{ todo.user }}
              </v-chip>
            </v-col>

            <v-col cols="auto">
              <v-menu
                v-model="todo.dropdown"
                :close-on-content-click="false"
                offset-y
                :attach="false"
              >
                <template #activator="{ props }">
                  <v-btn icon variant="text" v-bind="props">
                    <img src="@/assets/dots.svg" alt="dots" class="todo-list__dots" />
                  </v-btn>
                </template>

                <div class="todo-list__dropdown">
                  <button @click="editTodo(todo)" class="todo-list__dropdown-item">Edit ToDo</button>
                  <hr class="todo-list__dropdown-line" />
                  <button @click="markCompleted(todo)" class="todo-list__dropdown-item">Mark Completed</button>
                </div>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.todo-list__wrapper {
  max-height: 470px;
  padding-top: 0px;
  margin-top: 10px;
  overflow-y: auto;
  position: relative;
}

.todo-list__wrapper::-webkit-scrollbar {
  width: 6px;
}

.todo-list__wrapper::-webkit-scrollbar-track {
  background: #292639;
  border-radius: 8px;
}

.todo-list__wrapper::-webkit-scrollbar-thumb {
  background-color: #3B3753;
  border-radius: 8px;
}

.todo-list__card {
  padding: 12px;
  border-radius: 12px;
  background-color: #292639;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  cursor: url('@/assets/pointer.svg'), auto;
}

.todo-list__card:hover {
  background-color: #3C3850;
}

.todo-list__task {
  padding-left: 10px;
}

.todo-list__circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #3F3C4E;
  transition: background-color 0.2s ease;
  cursor: url('@/assets/pointer.svg'), auto;
}

.todo-list__card:hover .todo-list__circle {
  background-color: #292639;
}

.todo-list__completed-img {
  width: 44px;
  height: 44px;
}

.todo-list__chip {
  height: 20px !important;
  width: 50px !important;
  border-radius: 6px;
  margin-left: 10px;
  background-color: #3F3C4E;
  color: #BDBDBD;
  font-size: 12px !important;
  text-align: left !important;
  padding-left: 7px !important;
}

.todo-list__dots {
  max-width: 20px;
}

.todo-list__dropdown {
  display: flex;
  flex-direction: column;
  background-color: rgba(7, 4, 23, 0.71);
  padding: 4px 4px 1px;
  margin-top: -11px;
  border-radius: 8px;
  min-width: 120px;
  position: absolute;
  z-index: 1;
  transform: translateX(-100px);
}

.todo-list__dropdown::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 12px;
  border-width: 0 4px 7px 4px;
  border-style: solid;
  border-color: transparent transparent rgba(7, 4, 23, 0.71) transparent;
}

.todo-list__dropdown-item {
  background-color: transparent;
  color: #ffffff;
  font-size: 13px;
  font-weight: 300;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 4px;
  cursor: url('@/assets/pointer.svg'), auto;
  text-align: left;
  white-space: nowrap;
  width: 100%;
  transition: background-color 0.2s ease;
}

.todo-list__dropdown-item:last-child {
  margin-bottom: 0;
}

.todo-list__dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.todo-list__dropdown-line {
  margin: 0px auto;
  margin-top: -5px;
  width: 90px;
  opacity: 0.3;
  border-color: white;
}

.todo-list__divider {
  width: 78px;
  margin: 0px auto;
  border: 1px solid white;
  margin-top: 10px;
}
</style>
