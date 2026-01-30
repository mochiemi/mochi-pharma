<template>
  <div class="medicaments-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-capsules"></i> {{ $t('medicament.title') }}</h1>
        <p>{{ $t('medicament.subtitle') }}</p>
      </div>
      
      <div class="grid-2">
        <div class="left-column">
          <BaseCard :title="$t('medicament.current')">
            <!-- Busca -->
            <div class="search-box">
              <BaseInput
                v-model="searchQuery"
                placeholder="Buscar medicamentos..."
              >
                <template #prefix>
                  <i class="fas fa-search"></i>
                </template>
              </BaseInput>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="loading-state">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Carregando medicamentos...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="error-state">
              <AlertBox type="danger">{{ error }}</AlertBox>
              <BaseButton @click="retryLoad" variant="primary" class="retry-btn">
                <i class="fas fa-redo"></i> Tentar novamente
              </BaseButton>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredMedicaments.length === 0" class="empty-state">
              <i class="fas fa-capsules empty-icon"></i>
              <p>{{ searchQuery ? 'Nenhum medicamento encontrado' : $t('medicament.empty') }}</p>
              <BaseButton @click="openAddForm" v-if="!searchQuery" variant="primary">
                <i class="fas fa-plus"></i> {{ $t('medicament.addFirst') }}
              </BaseButton>
            </div>
            
            <!-- List -->
            <div v-else class="medicaments-list">
              <MedicamentCard
                v-for="medicament in filteredMedicaments"
                :key="medicament.id"
                :medicament="medicament"
                @select="selectMedicament"
              />
            </div>
          </BaseCard>
        </div>
        
        <!-- Coluna da Direita - Formulário -->
        <div class="right-column">
          <!-- Formulário -->
          <div v-if="showForm || selectedMedicament">
            <SimpleMedicamentForm 
              :medicament="selectedMedicament"
              @save="handleSave"
              @cancel="handleCancel"
              @delete="handleDelete"
            />
          </div>
          
          <BaseCard v-else :title="$t('medicament.addNew')">
            <div class="empty-form-state">
              <i class="fas fa-plus-circle"></i>
              <p>{{ $t('medicament.formPrompt') }}</p>
              <BaseButton @click="openAddForm" variant="primary">
                <i class="fas fa-plus"></i> {{ $t('medicament.addNew') }}
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    
    <!-- Botão Flutuante para Adicionar -->
    <BaseButton 
      v-if="!showForm && !selectedMedicament"
      class="fab-add-btn" 
      variant="primary" 
      @click="openAddForm"
    >
      <i class="fas fa-plus"></i>
    </BaseButton>
    
    <!-- Notificações -->
    <NotificationContainer />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import AlertBox from '@/components/common/AlertBox.vue'
import NotificationContainer from '@/components/common/NotificationContainer.vue'
import MedicamentCard from '@/components/medicaments/MedicamentCard.vue'
import SimpleMedicamentForm from '@/components/medicaments/SimpleMedicamentForm.vue'
import { medicamentService } from '@/services'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'MedicamentsView',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    AlertBox,
    NotificationContainer,
    MedicamentCard,
    SimpleMedicamentForm
  },
  setup() {
    const medicaments = ref([])
    const loading = ref(false)
    const error = ref('')
    const showForm = ref(false)
    const selectedMedicament = ref(null)
    const searchQuery = ref('')
    
    const { success, error: showError } = useNotification()

    // Computed para filtrar medicamentos
    const filteredMedicaments = computed(() => {
      if (!searchQuery.value) return medicaments.value
      
      const query = searchQuery.value.toLowerCase()
      return medicaments.value.filter(m => 
        m.name?.toLowerCase().includes(query) ||
        m.class?.toLowerCase().includes(query) ||
        m.indications?.toLowerCase().includes(query) ||
        m.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })

    // Carregar medicamentos do Supabase
    const loadMedicaments = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const { data, error: supabaseError } = await medicamentService.getAll({
          orderBy: 'name',
          ascending: true
        })
        
        if (supabaseError) {
          throw supabaseError
        }
        
        medicaments.value = data || []
      } catch (err) {
        console.error('Erro ao carregar medicamentos:', err)
        error.value = err.message || 'Erro ao carregar medicamentos. Verifique sua conexão.'
        showError('Não foi possível carregar os medicamentos', 'Erro')
      } finally {
        loading.value = false
      }
    }

    // Carregar dados ao montar o componente
    onMounted(() => {
      loadMedicaments()
    })

    // Retry
    const retryLoad = () => {
      loadMedicaments()
    }

    // Abrir formulário para adicionar novo
    const openAddForm = () => {
      selectedMedicament.value = null
      showForm.value = true
    }
    
    const selectMedicament = (medicament) => {
      selectedMedicament.value = medicament
      showForm.value = false
    }
    
    const handleSave = (savedMedicament) => {
      if (selectedMedicament.value) {
        // Modo edição
        const index = medicaments.value.findIndex(m => m.id === savedMedicament.id)
        if (index !== -1) {
          medicaments.value[index] = savedMedicament
        }
        success('Medicamento atualizado com sucesso!', 'Sucesso')
      } else {
        // Modo criação
        medicaments.value.push(savedMedicament)
        medicaments.value.sort((a, b) => a.name.localeCompare(b.name))
        success('Medicamento criado com sucesso!', 'Sucesso')
      }
      
      showForm.value = false
      selectedMedicament.value = null
    }
    
    const handleCancel = () => {
      showForm.value = false
      selectedMedicament.value = null
    }

    const handleDelete = async (id) => {
      try {
        const { error: deleteError } = await medicamentService.delete(id)
        
        if (deleteError) {
          throw deleteError
        }
        
        medicaments.value = medicaments.value.filter(m => m.id !== id)
        showForm.value = false
        selectedMedicament.value = null
        success('Medicamento removido com sucesso!', 'Sucesso')
      } catch (err) {
        console.error('Erro ao deletar medicamento:', err)
        showError('Não foi possível remover o medicamento', 'Erro')
      }
    }
    
    return {
      medicaments,
      loading,
      error,
      showForm,
      selectedMedicament,
      searchQuery,
      filteredMedicaments,
      retryLoad,
      openAddForm,
      selectMedicament,
      handleSave,
      handleCancel,
      handleDelete
    }
  }
}
</script>

<style scoped>
.medicaments-view {
  min-height: calc(100vh - 200px);
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  color: var(--primary);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.search-box {
  margin-bottom: 20px;
}

.loading-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.loading-state i {
  font-size: 32px;
  margin-bottom: 15px;
  display: block;
}

.error-state {
  padding: 20px 0;
}

.retry-btn {
  margin-top: 15px;
}

.empty-state, .empty-form-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 48px;
  color: var(--border);
  margin-bottom: 20px;
}

.empty-form-state i {
  font-size: 64px;
  color: var(--accent-light);
  margin-bottom: 20px;
}

.medicaments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Botão Flutuante */
.fab-add-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(139, 65, 153, 0.4);
  font-size: 24px;
  z-index: 100;
  transition: transform 0.2s, box-shadow 0.2s;
}

.fab-add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(139, 65, 153, 0.5);
}
</style>
