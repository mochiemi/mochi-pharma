<template>
  <BaseCard :title="isEditMode ? 'Editar Medicamento' : 'Novo Medicamento'">
    <template #icon>
      <i class="fas fa-edit"></i>
    </template>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nome do Medicamento *</label>
        <input 
          v-model="formData.name" 
          type="text" 
          placeholder="ex: Metformina"
          required
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>Classe *</label>
        <select v-model="formData.class" required class="form-input">
          <option value="">Selecione...</option>
          <option value="antibiotic">Antibiótico</option>
          <option value="analgesic">Analgésico</option>
          <option value="antihypertensive">Antihipertensivo</option>
          <option value="antidepressant">Antidepressivo</option>
          <option value="statin">Estatina</option>
          <option value="antidiabetic">Antidiabético</option>
          <option value="other">Outro</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Via de Administração *</label>
        <select v-model="formData.route" required class="form-input">
          <option value="">Selecione...</option>
          <option value="oral">Oral</option>
          <option value="iv">Intravenosa</option>
          <option value="im">Intramuscular</option>
          <option value="sc">Subcutânea</option>
          <option value="topical">Tópica</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Indicações</label>
        <textarea 
          v-model="formData.indications" 
          rows="3"
          placeholder="Principais usos..."
          class="form-input"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label>Dosagem</label>
        <input 
          v-model="formData.dosage" 
          type="text" 
          placeholder="ex: 500mg a cada 8h"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label>Anotações Pessoais</label>
        <textarea 
          v-model="formData.notes" 
          rows="4"
          placeholder="Suas observações pessoais, efeitos colaterais, etc..."
          class="form-input"
        ></textarea>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading">Salvando...</span>
          <span v-else>💾 Salvar</span>
        </button>
        
        <button type="button" class="btn btn-outline" @click="$emit('cancel')">
          ❌ Cancelar
        </button>
        
        <button 
          v-if="isEditMode" 
          type="button" 
          class="btn btn-danger" 
          @click="confirmDelete"
        >
          🗑️ Deletar
        </button>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import { ref, computed } from 'vue'
import BaseCard from '../common/BaseCard.vue'
import { medicamentService } from '@/services'

export default {
  name: 'SimpleMedicamentForm',
  components: {
    BaseCard
  },
  props: {
    medicament: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel', 'delete'],
  setup(props, { emit }) {
    const formData = ref({
      name: props.medicament?.name || '',
      class: props.medicament?.class || '',
      route: props.medicament?.route || '',
      indications: props.medicament?.indications || '',
      dosage: props.medicament?.dosage || '',
      notes: props.medicament?.notes || ''
    })
    
    const loading = ref(false)
    const errorMessage = ref('')
    
    const isEditMode = computed(() => !!props.medicament)
    
    const handleSubmit = async () => {
      // Validação simples
      if (!formData.value.name.trim() || !formData.value.class || !formData.value.route) {
        errorMessage.value = 'Preencha todos os campos obrigatórios'
        return
      }
      
      loading.value = true
      errorMessage.value = ''
      
      try {
        let result
        
        if (isEditMode.value) {
          result = await medicamentService.update(props.medicament.id, formData.value)
        } else {
          result = await medicamentService.create(formData.value)
        }
        
        if (result.error) {
          throw result.error
        }
        
        emit('save', result.data)
      } catch (error) {
        console.error('Erro ao salvar:', error)
        errorMessage.value = error.message || 'Erro ao salvar medicamento'
      } finally {
        loading.value = false
      }
    }
    
    const confirmDelete = () => {
      if (confirm('Tem certeza que deseja deletar este medicamento?')) {
        emit('delete', props.medicament.id)
      }
    }
    
    return {
      formData,
      loading,
      errorMessage,
      isEditMode,
      handleSubmit,
      confirmDelete
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  font-size: 16px;
  font-family: inherit;
  background: white;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
}

.error-message {
  background: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.btn {
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: opacity 0.2s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: var(--accent);
  color: white;
}

.btn-outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn-danger {
  background-color: #ef5350;
  color: white;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}
</style>
