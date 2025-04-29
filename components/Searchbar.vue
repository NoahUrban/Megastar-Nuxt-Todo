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
  <v-card class="search-card" rounded="lg" flat>
    <div class="search-row">
      <v-text-field
        v-model="query"
        placeholder="Search Todo's"
        variant="plain"
        hide-details
        single-line
        density="compact"
        color="white"
        class="search-input"
        @input="searchTodos"
      />
      <v-btn icon @click="searchTodos" variant="text" class="search-button">
        <v-img
          src="@/assets/search.svg"
          alt="search"
          class="search-icon"
          cover
        />
      </v-btn>
    </div>
  </v-card>
</template>

<style scoped>
.search-card {
  padding: 8px 16px;
  margin: 20px 12px 0;
  background-color: #292639;
}

.search-row {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  flex-grow: 1;
}

.search-button {
  margin-left: 8px;
  min-width: 40px;
  height: 40px;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.v-text-field input {
  color: white !important;
  font-size: 16px;
}

::placeholder {
  color: white;
  opacity: 1;
  font-weight: 300;
}
</style>
