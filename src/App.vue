<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
    <NotificationContainer />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import NotificationContainer from './components/common/NotificationContainer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    NotificationContainer
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>