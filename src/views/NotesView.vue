<template>
  <div class="notes-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-book-medical"></i> {{ $t('notes.title') }}</h1>
        <p>{{ $t('notes.subtitle') }}</p>
      </div>
      
      <!-- Busca -->
      <div class="search-section">
        <BaseInput
          v-model="searchQuery"
          placeholder="Buscar notas..."
        >
          <template #prefix>
            <i class="fas fa-search"></i>
          </template>
        </BaseInput>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Carregando notas...</p>
      </div>

      <!-- Error -->
      <AlertBox v-else-if="error" type="danger">{{ error }}</AlertBox>

      <!-- Empty -->
      <div v-else-if="filteredNotes.length === 0" class="empty-state">
        <i class="fas fa-book-open empty-icon"></i>
        <p>{{ searchQuery ? 'Nenhuma nota encontrada' : 'Nenhuma nota cadastrada' }}</p>
        <BaseButton @click="createNewNote" variant="primary" v-if="!searchQuery">
          <i class="fas fa-plus"></i> Criar primeira nota
        </BaseButton>
      </div>
      
      <!-- Grid de Notas -->
      <div v-else class="notes-grid">
        <NoteCard
          v-for="note in filteredNotes"
          :key="note.id"
          :note="note"
          @click="openNote(note)"
        />
      </div>
      
      <BaseButton 
        v-if="!loading && !error"
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import AlertBox from '@/components/common/AlertBox.vue'
import NoteCard from '@/components/notes/NoteCard.vue'
import { noteService } from '@/services'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'NotesView',
  components: {
    BaseButton,
    BaseInput,
    AlertBox,
    NoteCard
  },
  setup() {
    const router = useRouter()
    const { error: showError } = useNotification()
    
    const notes = ref([])
    const loading = ref(false)
    const error = ref('')
    const searchQuery = ref('')

    // Computed para filtrar notas
    const filteredNotes = computed(() => {
      if (!searchQuery.value) return notes.value
      
      const query = searchQuery.value.toLowerCase()
      return notes.value.filter(n => 
        n.title?.toLowerCase().includes(query) ||
        n.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })

    // Carregar notas do Supabase
    const loadNotes = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const { data, error: supabaseError } = await noteService.getAll({
          orderBy: 'updated_at',
          ascending: false
        })
        
        if (supabaseError) {
          throw supabaseError
        }
        
        notes.value = data || []
      } catch (err) {
        console.error('Erro ao carregar notas:', err)
        error.value = 'Erro ao carregar notas. Verifique sua conexão.'
        showError('Não foi possível carregar as notas', 'Erro')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadNotes()
    })
    
    const openNote = (note) => {
      router.push({ name: 'note-detail', params: { id: note.id } })
    }
    
    const createNewNote = async () => {
      try {
        const newNote = {
          title: 'Nova Nota',
          content: [{ text: '', list: [], listType: 'unordered' }],
          tags: [],
          is_favorite: false
        }
        
        const { data, error: createError } = await noteService.create(newNote)
        
        if (createError) {
          throw createError
        }
        
        if (data) {
          notes.value.unshift(data)
          openNote(data)
        }
      } catch (err) {
        console.error('Erro ao criar nota:', err)
        showError('Não foi possível criar a nota', 'Erro')
      }
    }
    
    return {
      notes,
      loading,
      error,
      searchQuery,
      filteredNotes,
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

.search-section {
  margin-bottom: 25px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.loading-state i {
  font-size: 32px;
  margin-bottom: 15px;
  display: block;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  color: var(--border);
  margin-bottom: 20px;
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
