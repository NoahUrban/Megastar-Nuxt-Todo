<script setup lang="ts">
import { useTodoListStore } from '~/stores/todo'

const store = useTodoListStore()
</script>

<template>
  <header class="main-header">
    <div class="header-content">
      <h1 class="header-title">ToDo's</h1>
      <v-img class="dots-icon" src="@/assets/dots.svg" alt="dots" />
    </div>

    <div class="tabs-container">
      <v-btn
        v-for="tab in store.tabs"
        :key="tab"
        class="tab-button"
        :class="{ active: store.activeTab === tab, inactive: store.activeTab !== tab }"
        @click="store.updateActiveTab(tab)"
      >
        {{ tab }}
      </v-btn>
    </div>
  </header>
</template>


<style scoped>
.main-header {
  width: 100%;
  max-height: 151px;
  max-width: 375px;
  margin: 0 auto;
  background-color: #292639;
  display: flex;
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  box-shadow: 0 4px 12px #756D9C40;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.header-title {
  color: white;
  font-size: 32px;
  font-weight: bold;
  line-height: 32px;
}

.dots-icon {
  max-width: 24px;
}

.tabs-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 16px 0 0;
}

.tab-button {
  background-color: #292639;
  color: white;
  font-size: 18px;
  line-height: 27px;
  min-width: 96px;
  margin: 0 40px;
  padding: 0;
  border: none;
}

.tab-button.inactive {
  opacity: 0.7;
}

.tab-button.active {
  border-bottom: 3px solid #ffffff;
  font-weight: bold;
  opacity: 1;
}


</style>
