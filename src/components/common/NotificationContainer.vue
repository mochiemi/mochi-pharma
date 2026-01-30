<template>
  <div class="notification-container">
    <NotificationToast
      v-for="notification in notifications"
      :key="notification.id"
      :type="notification.type"
      :title="notification.title"
      :message="notification.message"
      :duration="notification.duration"
      @close="remove(notification.id)"
    />
  </div>
</template>

<script>
import NotificationToast from './NotificationToast.vue'
import { notifications, useNotification } from '@/composables/useNotification'

export default {
  name: 'NotificationContainer',
  components: {
    NotificationToast
  },
  setup() {
    const { remove } = useNotification()

    return {
      notifications,
      remove
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
