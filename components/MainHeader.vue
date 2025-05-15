<script setup lang="ts">
import { useTodoListStore } from '~/stores/todo'

const store = useTodoListStore()
</script>

<template>
  <header class="main-header">
    <div class="main-header__content">
      <h1 class="main-header__title">ToDo's</h1>
      <v-img class="main-header__icon" src="@/assets/dots.svg" alt="dots" />
    </div>

    <div class="main-header__tabs">
      <v-btn
        v-for="tab in store.tabs"
        :key="tab"
        class="main-header__tab"
        :class="{
          'main-header__tab--active': store.activeTab === tab,
          'main-header__tab--inactive': store.activeTab !== tab
        }"
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

.main-header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.main-header__title {
  color: white;
  font-size: 32px;
  font-weight: bold;
  line-height: 32px;
}

.main-header__icon {
  max-width: 24px;
}

.main-header__tabs {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 16px 0 0;
}

.main-header__tab {
  background-color: #292639;
  color: white;
  font-size: 18px;
  line-height: 27px;
  min-width: 96px;
  margin: 0 40px;
  padding: 0;
  border: none;
}

.main-header__tab--inactive {
  opacity: 0.7;
}

.main-header__tab--active {
  border-bottom: 3px solid #ffffff;
  font-weight: bold;
  opacity: 1;
}
</style>
