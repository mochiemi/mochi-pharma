<template>
  <BaseCard 
    :title="medicament.name"
    clickable
    @click="$emit('select', medicament)"
    borderColor="var(--secondary)"
  >
    <template #icon>
      <i class="fas fa-capsules"></i>
    </template>
    
    <div class="medicament-content">
      <div class="medicament-details">
        <span v-for="detail in details" :key="detail" class="detail-item">
          {{ detail }}
        </span>
      </div>
      
      <div class="medicament-info">
        <p v-if="medicament.indications">
          <strong>{{ $t('medicament.indications') }}:</strong> {{ medicament.indications }}
        </p>
        <p v-if="medicament.dosage">
          <strong>{{ $t('medicament.dosage') }}:</strong> {{ medicament.dosage }}
        </p>
        <p v-if="medicament.notes">
          <strong>{{ $t('medicament.notes') }}:</strong> {{ medicament.notes }}
        </p>
      </div>
      
      <div v-if="medicament.tags && medicament.tags.length" class="tags">
        <span v-for="tag in medicament.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard.vue'

export default {
  name: 'MedicamentCard',
  components: {
    BaseCard
  },
  props: {
    medicament: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: '',
        class: '',
        route: '',
        indications: '',
        dosage: '',
        notes: '',
        tags: []
      })
    }
  },
  computed: {
    details() {
      const details = []
      if (this.medicament.class) details.push(this.medicament.class)
      if (this.medicament.route) details.push(this.$t(`routes.${this.medicament.route}`))
      return details
    }
  },
  emits: ['select']
}
</script>

<style scoped>
.medicament-details {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.detail-item {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.medicament-info p {
  margin-bottom: 10px;
  line-height: 1.5;
}

.tags {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: var(--accent-light);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}
</style>