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
            <div v-if="medicaments.length === 0" class="empty-state">
              <i class="fas fa-capsules empty-icon"></i>
              <p>{{ $t('medicament.empty') }}</p>
              <BaseButton @click="showForm = true">
                <i class="fas fa-plus"></i> {{ $t('medicament.addFirst') }}
              </BaseButton>
            </div>
            
            <div v-else class="medicaments-list">
              <MedicamentCard
                v-for="medicament in medicaments"
                :key="medicament.id"
                :medicament="medicament"
                @select="selectMedicament"
              />
            </div>
          </BaseCard>
        </div>
        
        <div class="right-column">
          <MedicamentForm 
            v-if="showForm || selectedMedicament"
            :medicament="selectedMedicament"
            @save="handleSave"
            @cancel="handleCancel"
          />
          
          <BaseCard v-else :title="$t('medicament.addNew')">
            <div class="empty-form-state">
              <i class="fas fa-plus-circle"></i>
              <p>{{ $t('medicament.formPrompt') }}</p>
              <BaseButton @click="showForm = true" variant="primary">
                <i class="fas fa-plus"></i> {{ $t('medicament.addNew') }}
              </BaseButton>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import MedicamentCard from '@/components/medicaments/MedicamentCard.vue'
import MedicamentForm from '@/components/medicaments/MedicamentForm.vue'

export default {
  name: 'MedicamentsView',
  components: {
    BaseCard,
    BaseButton,
    MedicamentCard,
    MedicamentForm
  },
  setup() {
    const medicaments = ref([
      {
        id: 1,
        name: 'Amoxicillin',
        class: 'Antibiotic',
        route: 'oral',
        indications: 'Bacterial infections (respiratory, urinary, skin)',
        dosage: '250-500 mg every 8 hours',
        notes: 'Take with food to reduce GI upset. Complete full course even if symptoms improve.',
        tags: ['Broad-spectrum', 'Commonly prescribed']
      },
      {
        id: 2,
        name: 'Atorvastatin',
        class: 'Statin',
        route: 'oral',
        indications: 'Hypercholesterolemia, prevention of cardiovascular events',
        dosage: '10-80 mg once daily',
        notes: 'Take in the evening. Monitor liver enzymes periodically.',
        tags: ['HMG-CoA reductase inhibitor', 'Long-term use']
      }
    ])
    
    const showForm = ref(false)
    const selectedMedicament = ref(null)
    
    const selectMedicament = (medicament) => {
      selectedMedicament.value = medicament
      showForm.value = false
    }
    
    const handleSave = (medicamentData) => {
      if (selectedMedicament.value) {
        // Update existing
        const index = medicaments.value.findIndex(m => m.id === selectedMedicament.value.id)
        if (index !== -1) {
          medicaments.value[index] = { ...medicamentData, id: selectedMedicament.value.id }
        }
      } else {
        // Add new
        medicamentData.id = Date.now()
        medicaments.value.push(medicamentData)
      }
      
      showForm.value = false
      selectedMedicament.value = null
    }
    
    const handleCancel = () => {
      showForm.value = false
      selectedMedicament.value = null
    }
    
    return {
      medicaments,
      showForm,
      selectedMedicament,
      selectMedicament,
      handleSave,
      handleCancel
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
</style>