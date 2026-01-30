<template>
  <div class="connection-status" :class="statusClass" v-if="show">
    <i :class="statusIcon"></i>
    <span>{{ statusMessage }}</span>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/services'

export default {
  name: 'ConnectionStatus',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const status = ref('checking') // checking, connected, error
    const statusMessage = ref('Verificando conexão...')

    onMounted(async () => {
      try {
        // Tenta fazer uma consulta simples
        const { error } = await supabase.from('medicaments').select('id').limit(1)
        
        if (error && error.code !== 'PGRST116') { // PGRST116 = tabela vazia, que é ok
          throw error
        }
        
        status.value = 'connected'
        statusMessage.value = 'Conectado ao Supabase'
      } catch (err) {
        status.value = 'error'
        statusMessage.value = 'Erro na conexão com Supabase'
        console.error('Erro de conexão:', err)
      }
    })

    const statusClass = computed(() => `status-${status.value}`)
    const statusIcon = computed(() => {
      const icons = {
        checking: 'fas fa-spinner fa-spin',
        connected: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle'
      }
      return icons[status.value]
    })

    return {
      status,
      statusMessage,
      statusClass,
      statusIcon
    }
  }
}
</script>

<style scoped>
.connection-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status-checking {
  background-color: var(--shadow);
  color: var(--text-secondary);
}

.status-connected {
  background-color: rgba(102, 187, 106, 0.2);
  color: #2e7d32;
}

.status-error {
  background-color: rgba(187, 102, 139, 0.2);
  color: var(--accent);
}
</style>
