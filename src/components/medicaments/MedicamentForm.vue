<template>
  <BaseCard :title="formTitle">
    <template #icon>
      <i class="fas fa-edit"></i>
    </template>
    
    <form @submit.prevent="handleSubmit">
      <BaseInput
        v-model="formData.name"
        label="Nome do Medicamento"
        placeholder="ex: Metformina"
        :error="errors.name"
        required
      >
        <template #prefix>
          <i class="fas fa-pills"></i>
        </template>
      </BaseInput>
      
      <BaseSelect
        v-model="formData.class"
        label="Classe do Medicamento"
        placeholder="Selecione uma classe"
        :options="drugClasses"
        :error="errors.class"
        required
      />
      
      <BaseSelect
        v-model="formData.route"
        label="Via de Administração"
        placeholder="Selecione uma via"
        :options="administrationRoutes"
        :error="errors.route"
        required
      />
      
      <BaseTextarea
        v-model="formData.indications"
        label="Indicações"
        placeholder="Principais usos para este medicamento..."
        :rows="3"
      />
      
      <BaseInput
        v-model="formData.dosage"
        label="Dosagem"
        placeholder="ex: 500 mg a cada 8 horas"
      >
        <template #prefix>
          <i class="fas fa-prescription-bottle-alt"></i>
        </template>
      </BaseInput>
      
      <BaseTextarea
        v-model="formData.notes"
        label="Anotações Pessoais"
        placeholder="Suas observações pessoais, efeitos colaterais, etc..."
        :rows="4"
      />
      
      <BaseInput
        v-model="tagInput"
        label="Tags"
        placeholder="Adicione tags (pressione Enter para adicionar)"
        @keydown.enter.prevent="addTag"
      >
        <template #suffix>
          <i class="fas fa-tag"></i>
        </template>
      </BaseInput>
      
      <div class="tags-container" v-if="formData.tags.length > 0">
        <span 
          v-for="(tag, index) in formData.tags" 
          :key="index"
          class="tag"
          @click="removeTag(index)"
        >
          {{ tag }}
          <i class="fas fa-times"></i>
        </span>
      </div>
      
      <div class="form-actions">
        <BaseButton type="submit" variant="primary" :disabled="loading">
          <i class="fas fa-save"></i>
          {{ submitButtonText }}
        </BaseButton>
        
        <BaseButton type="button" variant="outline" @click="$emit('cancel')">
          <i class="fas fa-times"></i>
          {{ $t('common.cancel') }}
        </BaseButton>
        
        <BaseButton 
          v-if="isEditMode" 
          type="button" 
          variant="secondary" 
          @click="confirmDelete"
        >
          <i class="fas fa-trash"></i>
          {{ $t('common.delete') }}
        </BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import { ref, computed, watch } from 'vue'
import BaseCard from '../common/BaseCard.vue'
import BaseInput from '../common/BaseInput.vue'
import BaseTextarea from '../common/BaseTextarea.vue'
import BaseSelect from '../common/BaseSelect.vue'
import BaseButton from '../common/BaseButton.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'MedicamentForm',
  components: {
    BaseCard,
    BaseInput,
    BaseTextarea,
    BaseSelect,
    BaseButton
  },
  props: {
    medicament: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel', 'delete'],
  setup(props, { emit }) {
    const { t } = useI18n()
    
    const formData = ref({
      name: '',
      class: '',
      route: '',
      indications: '',
      dosage: '',
      notes: '',
      tags: []
    })
    
    const tagInput = ref('')
    const errors = ref({})
    const loading = ref(false)
    
    const drugClasses = ref([
      { value: 'antibiotic', label: t('medicament.classes.antibiotic') },
      { value: 'analgesic', label: t('medicament.classes.analgesic') },
      { value: 'antihypertensive', label: t('medicament.classes.antihypertensive') },
      { value: 'antidepressant', label: t('medicament.classes.antidepressant') },
      { value: 'statin', label: t('medicament.classes.statin') },
      { value: 'antidiabetic', label: t('medicament.classes.antidiabetic') },
      { value: 'bronchodilator', label: t('medicament.classes.bronchodilator') },
      { value: 'anticoagulant', label: t('medicament.classes.anticoagulant') },
      { value: 'other', label: t('medicament.classes.other') }
    ])
    
    const administrationRoutes = ref([
      { value: 'oral', label: t('routes.oral') },
      { value: 'iv', label: t('routes.iv') },
      { value: 'im', label: t('routes.im') },
      { value: 'sc', label: t('routes.sc') },
      { value: 'topical', label: t('routes.topical') },
      { value: 'inhalation', label: t('routes.inhalation') },
      { value: 'rectal', label: t('routes.rectal') },
      { value: 'sublingual', label: t('routes.sublingual') }
    ])
    
    const isEditMode = computed(() => !!props.medicament)
    
    const formTitle = computed(() => 
      isEditMode.value ? t('medicament.update') : t('medicament.addNew')
    )
    
    const submitButtonText = computed(() => 
      isEditMode.value ? t('medicament.update') : t('medicament.save')
    )
    
    // Preencher formulário se estiver editando
    watch(() => props.medicament, (newMedicament) => {
      if (newMedicament) {
        formData.value = {
          name: newMedicament.name || '',
          class: newMedicament.class || '',
          route: newMedicament.route || '',
          indications: newMedicament.indications || '',
          dosage: newMedicament.dosage || '',
          notes: newMedicament.notes || '',
          tags: [...(newMedicament.tags || [])]
        }
      } else {
        resetForm()
      }
    }, { immediate: true })
    
    const resetForm = () => {
      formData.value = {
        name: '',
        class: '',
        route: '',
        indications: '',
        dosage: '',
        notes: '',
        tags: []
      }
      tagInput.value = ''
      errors.value = {}
    }
    
    const validateForm = () => {
      errors.value = {}
      
      if (!formData.value.name.trim()) {
        errors.value.name = t('validation.required')
      }
      
      if (!formData.value.class) {
        errors.value.class = t('validation.required')
      }
      
      if (!formData.value.route) {
        errors.value.route = t('validation.required')
      }
      
      return Object.keys(errors.value).length === 0
    }
    
    const handleSubmit = () => {
      if (!validateForm()) {
        return
      }
      
      loading.value = true
      
      // Simulate API call
      setTimeout(() => {
        emit('save', {
          ...formData.value,
          id: props.medicament?.id || Date.now()
        })
        loading.value = false
      }, 500)
    }
    
    const addTag = () => {
      const tag = tagInput.value.trim()
      if (tag && !formData.value.tags.includes(tag)) {
        formData.value.tags.push(tag)
        tagInput.value = ''
      }
    }
    
    const removeTag = (index) => {
      formData.value.tags.splice(index, 1)
    }
    
    const confirmDelete = () => {
      if (confirm(t('common.confirmDelete'))) {
        emit('delete', props.medicament.id)
      }
    }
    
    return {
      formData,
      tagInput,
      errors,
      loading,
      drugClasses,
      administrationRoutes,
      isEditMode,
      formTitle,
      submitButtonText,
      handleSubmit,
      addTag,
      removeTag,
      confirmDelete
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--accent-light);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.tag:hover {
  background-color: var(--accent);
  transform: scale(1.05);
}

.tag i {
  font-size: 12px;
  opacity: 0.8;
}

.form-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
</style>