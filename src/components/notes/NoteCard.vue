<template>
  <BaseCard 
    class="note-card"
    :title="note.title"
    hoverable
    clickable
    @click="$emit('click', note)"
    borderColor="var(--primary)"
  >
    <template #icon>
      <i class="fas fa-sticky-note"></i>
    </template>
    
    <div class="note-preview">
      <p v-if="notePreview">{{ notePreview }}</p>
      <p v-else class="no-content">No content yet...</p>
    </div>
    
    <div class="note-footer">
      <div class="note-tags">
        <span 
          v-for="tag in note.tags" 
          :key="tag"
          class="note-tag"
        >
          {{ tag }}
        </span>
      </div>
      
      <div class="note-date">
        <i class="fas fa-calendar"></i>
        {{ formatDate(note.updatedAt || note.createdAt) }}
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../common/BaseCard.vue'

export default {
  name: 'NoteCard',
  components: {
    BaseCard
  },
  props: {
    note: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        title: '',
        content: [],
        tags: [],
        createdAt: '',
        updatedAt: ''
      })
    }
  },
  computed: {
    notePreview() {
      if (!this.note.content || this.note.content.length === 0) return ''
      
      // Get first text content item
      const firstContent = this.note.content[0]
      if (firstContent.text) {
        return firstContent.text.length > 150 
          ? firstContent.text.substring(0, 150) + '...'
          : firstContent.text
      }
      
      if (firstContent.list && firstContent.list.length > 0) {
        return firstContent.list[0].length > 150
          ? firstContent.list[0].substring(0, 150) + '...'
          : firstContent.list[0]
      }
      
      return ''
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.note-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.note-preview {
  flex: 1;
  margin-bottom: 20px;
  color: var(--text-light);
  line-height: 1.6;
}

.no-content {
  color: var(--border);
  font-style: italic;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  font-size: 14px;
}

.note-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.note-tag {
  background-color: var(--accent-light);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

.note-date {
  color: var(--text-light);
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>