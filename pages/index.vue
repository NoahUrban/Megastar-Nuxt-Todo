<script lang="ts" setup>
import { useTodoListStore } from '~/stores/todo';
</script>

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
          v-if="!store.addTodoForm && !store.editTodoForm"
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

