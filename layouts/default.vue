<script setup>
import Test from "~/components/TodoList.vue";
import { useTodoListStore } from '~/stores/todo';

const store = useTodoListStore();

const displayAddTodoForm = () => {
  store.triggerAddTodoForm();
}

</script>

<template>
  <template>
  <v-app>
    <div class="app-container">
      <MainHeader />
      <v-main>
        <Searchbar />
        <Test />
        <TodoAdd v-if="store.addTodoForm" />
        <TodoEdit v-if="store.editTodoForm" />
        
        <v-btn
          v-if="!store.addTodoForm"
          class="add-todo"
          color="white"
          elevation="2"
          fab
          @click="displayAddTodoForm"
        >
          +
        </v-btn>
      </v-main>
    </div>
  </v-app>
</template>

</template>

<style>
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
