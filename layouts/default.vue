<script setup>
import Test from "~/components/Test.vue";
import { useTodoListStore } from '@/stores/test';

const store = useTodoListStore();

const displayAddTodoForm = () => {
  store.triggerAddTodoForm();
}


onMounted(() => {
  console.log('Store state on mount:', {
    addTodoForm: store.addTodoForm,
    editTodoForm: store.editTodoForm,
  })
})
</script>

<template>
  <v-app>
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
  @click="displayAddTodoForm"
>
  +
</v-btn>
    </v-main>
    <!-- <v-btn
  v-if="!store.addTodoForm"
  class="add-todo"
  color="white"
  elevation="2"
  @click="displayAddTodoForm"
>
  +
</v-btn> -->
  </v-app>
</template>

<style>
.add-todo {
  position: fixed;
  bottom: 20px;
  right: calc((100vw - 375px) / 2 + 20px); /* keeps it aligned to your centered app */
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
}
</style>
