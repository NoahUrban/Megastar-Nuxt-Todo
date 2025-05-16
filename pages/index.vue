<script setup>
import Searchbar from '~/components/Searchbar.vue'
import TodoList from '~/components/TodoList.vue'
import TodoAdd from '~/components/TodoAdd.vue'
import TodoEdit from '~/components/TodoEdit.vue'
import { useTodoListStore } from '~/stores/todo'

const store = useTodoListStore()

const displayAddTodoForm = () => {
  store.triggerAddTodoForm()
}
</script>

<template>
  <div class="app-container">
    <Searchbar />
    <TodoList />
    <TodoAdd v-if="store.addTodoForm" />
    <TodoEdit v-if="store.editTodoForm" />

    <v-btn
      v-if="!store.addTodoForm && !store.editTodoForm"
      class="add-todo"
      color="white"
      elevation="2"
      fab
      @click="displayAddTodoForm"
    >
      +
    </v-btn>
  </div>
</template>

<style scoped>
.app-container {
  max-height: 640px;
}

.add-todo {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
  z-index: 10;

  padding: 0 !important;
  min-width: 64px !important;
  max-width: 64px !important;
  min-height: 64px !important;
  max-height: 64px !important;
}
</style>

