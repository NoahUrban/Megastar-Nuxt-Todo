<script setup lang="ts">
import { useTodoListStore } from '~/stores/todo'
import { ref } from 'vue'

const store = useTodoListStore()
const query = ref('')

const searchTodos = () => {
  store.closeAllDropdowns()
  store.searchTodos(query.value)
}
</script>

<template>
  <v-card class="searchbar__card" rounded="lg" flat>
    <div class="searchbar__row">
      <v-text-field
        v-model="query"
        placeholder="Search Todo's"
        variant="plain"
        hide-details
        single-line
        density="compact"
        color="white"
        class="searchbar__input"
        @input="searchTodos"
      />
      <img
        src="@/assets/search.svg"
        alt="search"
        class="searchbar__icon"
        @click="searchTodos"
      />
    </div>
  </v-card>
</template>

<style scoped>
.searchbar__card {
  padding: 8px 16px;
  margin: 20px 12px 0;
  background-color: #292639;
  color: white;
}

.searchbar__row {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 7px;
}

.searchbar__input {
  flex-grow: 1;
}

.searchbar__icon {
  margin-top: 7px;
  width: 20px;
  height: 20px;
}

.searchbar__icon:hover {
  cursor: pointer;
}

.v-text-field input {
  color: white !important;
  font-size: 16px;
}

::placeholder {
  color: white !important;
  opacity: 1;
  font-weight: 600;
}
</style>
