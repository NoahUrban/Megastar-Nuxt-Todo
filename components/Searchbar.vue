<script setup lang="ts">
import { useTodoListStore } from '@/stores/test'
import { ref } from 'vue'

const store = useTodoListStore()
const query = ref('')

const searchTodos = () => {
  store.closeAllDropdowns()
  store.searchTodos(query.value)
}

</script>

<template>
  <v-card
    class="px-4 py-2 mx-3 mt-5"
    color="#292639"
    rounded="lg"
    flat
  >
    <div class="d-flex align-center w-100">
      <v-text-field
        v-model="query"
        placeholder="Search Todo's"
        variant="plain"
        hide-details
        single-line
        density="compact"
        color="white"
        class="flex-grow-1"
        @input="searchTodos"
      >
        <template #prepend-inner>
          <v-icon icon="mdi-magnify" color="white" />
        </template>
      </v-text-field>

      <!-- Explicit width and padding for visibility -->
      <v-btn
  icon
  @click="searchTodos"
  variant="text"
  class="ml-2"
  style="min-width: 40px; height: 40px;"
>
  <v-img
    src="@/assets/search.svg"
    alt="search"
    width="24"
    height="24"
    cover
  />
</v-btn>

    </div>
  </v-card>
</template>




<style scoped>
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
