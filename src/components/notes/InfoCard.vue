<template>
  <BaseCard 
    class="info-card"
    hoverable
    clickable
    @click="$emit('click')"
    borderColor="var(--secondary)"
  >
    <template #icon>
      <i :class="reference.icon || 'fas fa-info-circle'"></i>
    </template>
    
    <h3 class="info-title">{{ reference.title }}</h3>
    <p class="info-description">{{ reference.definition }}</p>
    
    <div v-if="reference.tags" class="info-tags">
      <span 
        v-for="tag in reference.tags" 
        :key="tag"
        class="info-tag"
      >
        {{ tag }}
      </span>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard.vue'

export default {
  name: 'InfoCard',
  components: {
    BaseCard
  },
  props: {
    reference: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        definition: '',
        icon: '',
        tags: []
      })
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.info-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.info-title {
  color: var(--secondary);
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
}

.info-description {
  color: var(--text);
  line-height: 1.6;
  flex: 1;
  margin-bottom: 15px;
}

.info-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.info-tag {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}
</style>