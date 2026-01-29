<template>
  <div class="notes-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-book-medical"></i> {{ $t('notes.title') }}</h1>
        <p>{{ $t('notes.subtitle') }}</p>
      </div>
      
      <div class="notes-grid">
        <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @click="openNote(note)"
        />
      </div>
      
      <BaseButton 
        class="add-note-btn" 
        variant="primary" 
        size="large"
        @click="createNewNote"
      >
        <i class="fas fa-plus"></i> {{ $t('notes.addNote') }}
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import NoteCard from '@/components/notes/NoteCard.vue'

export default {
  name: 'NotesView',
  components: {
    BaseButton,
    NoteCard
  },
  setup() {
    const router = useRouter()
    
    const notes = ref([
      {
        id: 1,
        title: 'Pharmacology Basics',
        content: [
          {
            text: 'Pharmacology is the study of [[drug action]] on biological systems.',
            list: [
              'Pharmacokinetics: What the body does to the drug',
              'Pharmacodynamics: What the drug does to the body',
              'Therapeutic Index: Ratio between toxic and therapeutic dose'
            ],
            listType: 'unordered'
          }
        ],
        tags: ['Basics', 'Important'],
        createdAt: '2023-10-15',
        updatedAt: '2023-10-15'
      },
      {
        id: 2,
        title: 'Drug Administration Routes',
        content: [
          {
            list: [
              'Oral (most common)',
              'Intravenous (fastest action)',
              'Intramuscular',
              'Subcutaneous',
              'Topical',
              'Inhalational'
            ],
            listType: 'ordered'
          }
        ],
        tags: ['Administration', 'Routes'],
        createdAt: '2023-10-20',
        updatedAt: '2023-10-20'
      }
    ])
    
    const openNote = (note) => {
      router.push({ name: 'note-detail', params: { id: note.id } })
    }
    
    const createNewNote = () => {
      const newNote = {
        id: Date.now(),
        title: '',
        content: [],
        tags: [],
        createdAt: new Date().toISOString().split('T')[0]
      }
      notes.value.push(newNote)
      openNote(newNote)
    }
    
    return {
      notes,
      openNote,
      createNewNote
    }
  }
}
</script>

<style scoped>
.notes-view {
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

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.add-note-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.add-note-btn i {
  font-size: 24px;
}
</style>