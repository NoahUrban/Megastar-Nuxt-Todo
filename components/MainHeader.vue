<script setup lang="ts">
import { useTodoListStore } from '@/stores/test'

const store = useTodoListStore()
</script>

<template>
  <v-app-bar
    flat
    color="#292639"
    height="200px"
    class="d-flex flex-column justify-space-between shadow"
    style="max-width: 375px; margin: 0 auto; position: relative;"
  >
    <div class="d-flex justify-space-between align-center w-100 px-4 pt-4">
      <h1 class="text-white text-h4 font-weight-bold">ToDo's</h1>
      <v-img src="@/assets/dots.svg" alt="dots" max-width="24" />
    </div>

    <div class="d-flex justify-center w-100 pb-3">
      <v-btn
        v-for="tab in store.tabs"
        :key="tab"
        variant="text"
        class="tab-button"
        :class="{ active: store.activeTab === tab }"
        :style="{ opacity: store.activeTab !== tab ? '0.7' : '1' }"
        @click="store.updateActiveTab(tab)"
      >
        {{ tab }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
/* .shadow {
  box-shadow: 0px 2px 10px 0px #756d9c80;
} */

/* .tab-button {
  background-color: #292639;
  color: white;
  font-size: 18px;
  line-height: 27px;
  min-width: 96px;
  margin: 0 3rem;
  padding-bottom: 10px;
  position: relative;
  bottom: -10px;
} */

/* .active {
  border-bottom: 3px solid #ffffff;
} */
</style>
