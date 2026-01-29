<template>
  <div class="articles-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-newspaper"></i> Pharmacology Articles</h1>
        <p>Curated articles and research papers on pharmacology topics</p>
      </div>
      
      <div class="search-section">
        <div class="search-bar">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search articles..."
            class="search-input"
          />
        </div>
        
        <div class="filter-section">
          <BaseButton 
            v-for="category in categories" 
            :key="category.id"
            :variant="selectedCategory === category.id ? 'primary' : 'outline'"
            size="small"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </BaseButton>
        </div>
      </div>
      
      <div class="articles-grid">
        <BaseCard 
          v-for="article in filteredArticles" 
          :key="article.id"
          class="article-card"
          :title="article.title"
          hoverable
          clickable
          @click="openArticle(article)"
        >
          <template #icon>
            <i class="fas fa-file-alt"></i>
          </template>
          
          <div class="article-content">
            <p class="article-description">{{ article.description }}</p>
            
            <div class="article-meta">
              <div class="article-tags">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="article-tag"
                >
                  {{ tag }}
                </span>
              </div>
              
              <div class="article-info">
                <span class="article-author">
                  <i class="fas fa-user"></i> {{ article.author }}
                </span>
                <span class="article-date">
                  <i class="fas fa-calendar"></i> {{ formatDate(article.date) }}
                </span>
                <span class="article-read-time">
                  <i class="fas fa-clock"></i> {{ article.readTime }}
                </span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
      
      <div v-if="filteredArticles.length === 0" class="empty-state">
        <i class="fas fa-newspaper empty-icon"></i>
        <h3>No articles found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
      
      <!-- Article Detail Modal (simplified) -->
      <div v-if="selectedArticle" class="article-modal-overlay" @click="selectedArticle = null">
        <div class="article-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedArticle.title }}</h2>
            <button class="close-btn" @click="selectedArticle = null">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="article-header">
              <div class="article-stats">
                <span><i class="fas fa-user"></i> {{ selectedArticle.author }}</span>
                <span><i class="fas fa-calendar"></i> {{ formatDate(selectedArticle.date) }}</span>
                <span><i class="fas fa-clock"></i> {{ selectedArticle.readTime }}</span>
              </div>
              <div class="article-tags">
                <span 
                  v-for="tag in selectedArticle.tags" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <div class="article-body">
              <h3>Abstract</h3>
              <p>{{ selectedArticle.abstract }}</p>
              
              <h3>Key Points</h3>
              <ul>
                <li v-for="point in selectedArticle.keyPoints" :key="point">
                  {{ point }}
                </li>
              </ul>
              
              <h3>Conclusion</h3>
              <p>{{ selectedArticle.conclusion }}</p>
            </div>
            
            <div class="modal-actions">
              <BaseButton variant="outline" @click="selectedArticle = null">
                <i class="fas fa-times"></i> Close
              </BaseButton>
              <BaseButton variant="primary" @click="saveArticle(selectedArticle)">
                <i class="fas fa-bookmark"></i> Save Article
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  name: 'ArticlesView',
  components: {
    BaseCard,
    BaseButton
  },
  setup() {
    const searchQuery = ref('')
    const selectedCategory = ref('all')
    const selectedArticle = ref(null)
    
    const categories = ref([
      { id: 'all', name: 'All Articles' },
      { id: 'pharmacokinetics', name: 'Pharmacokinetics' },
      { id: 'pharmacodynamics', name: 'Pharmacodynamics' },
      { id: 'clinical', name: 'Clinical Studies' },
      { id: 'research', name: 'Research Papers' },
      { id: 'reviews', name: 'Review Articles' }
    ])
    
    const articles = ref([
      {
        id: 1,
        title: 'Advances in Pharmacokinetic Modeling',
        description: 'Recent developments in pharmacokinetic modeling techniques and their clinical applications.',
        author: 'Dr. Sarah Chen',
        date: '2023-09-15',
        readTime: '10 min read',
        category: 'pharmacokinetics',
        tags: ['Modeling', 'Clinical', 'Research'],
        abstract: 'This article explores modern pharmacokinetic modeling approaches and their impact on drug development.',
        keyPoints: [
          'New compartmental modeling techniques',
          'Impact on personalized medicine',
          'Clinical trial optimization'
        ],
        conclusion: 'Pharmacokinetic modeling continues to evolve, offering new opportunities for drug development.'
      },
      {
        id: 2,
        title: 'Drug-Drug Interactions in Polypharmacy',
        description: 'Analysis of common drug interactions in elderly patients with multiple prescriptions.',
        author: 'Prof. Michael Rodriguez',
        date: '2023-08-22',
        readTime: '15 min read',
        category: 'clinical',
        tags: ['Interactions', 'Elderly', 'Clinical'],
        abstract: 'Study of drug interactions in polypharmacy patients and strategies for mitigation.',
        keyPoints: [
          'Common interaction patterns',
          'Risk assessment tools',
          'Prevention strategies'
        ],
        conclusion: 'Careful medication review is essential in polypharmacy management.'
      },
      {
        id: 3,
        title: 'Therapeutic Index and Drug Safety',
        description: 'Understanding therapeutic index and its role in drug safety evaluation.',
        author: 'Dr. Emily Johnson',
        date: '2023-10-05',
        readTime: '8 min read',
        category: 'pharmacodynamics',
        tags: ['Safety', 'Toxicity', 'Education'],
        abstract: 'Comprehensive review of therapeutic index as a critical safety parameter.',
        keyPoints: [
          'Definition and calculation',
          'Clinical significance',
          'Monitoring parameters'
        ],
        conclusion: 'Therapeutic index remains a fundamental safety metric in pharmacology.'
      },
      {
        id: 4,
        title: 'Novel Antibiotic Delivery Systems',
        description: 'Review of innovative delivery systems for antibiotic administration.',
        author: 'Prof. James Wilson',
        date: '2023-07-30',
        readTime: '12 min read',
        category: 'research',
        tags: ['Antibiotics', 'Delivery', 'Innovation'],
        abstract: 'Recent advances in antibiotic delivery systems and their potential impact.',
        keyPoints: [
          'Nanoparticle-based delivery',
          'Targeted antibiotic therapy',
          'Overcoming resistance'
        ],
        conclusion: 'Innovative delivery systems may revolutionize antibiotic therapy.'
      }
    ])
    
    const filteredArticles = computed(() => {
      let filtered = articles.value
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.author.toLowerCase().includes(query) ||
          article.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      // Filter by category
      if (selectedCategory.value !== 'all') {
        filtered = filtered.filter(article => article.category === selectedCategory.value)
      }
      
      return filtered
    })
    
    const selectCategory = (categoryId) => {
      selectedCategory.value = categoryId
    }
    
    const openArticle = (article) => {
      selectedArticle.value = article
    }
    
    const saveArticle = (article) => {
      // In a real app, this would save to a backend or local storage
      alert(`Article "${article.title}" saved to your library!`)
    }
    
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('en-US', options)
    }
    
    return {
      searchQuery,
      selectedCategory,
      selectedArticle,
      categories,
      articles,
      filteredArticles,
      selectCategory,
      openArticle,
      saveArticle,
      formatDate
    }
  }
}
</script>

<style scoped>
.articles-view {
  min-height: calc(100vh - 200px);
}

.page-header {
  margin-bottom: 40px;
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

.page-header p {
  color: var(--text-light);
  font-size: 18px;
}

/* Search Section */
.search-section {
  margin-bottom: 40px;
}

.search-bar {
  position: relative;
  max-width: 600px;
  margin: 0 auto 30px;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 18px;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 60px;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  color: var(--text);
  font-size: 16px;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--shadow);
}

.filter-section {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.article-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-description {
  color: var(--text-light);
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

.article-meta {
  margin-top: auto;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.article-tag {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.article-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: var(--text-light);
  padding-top: 15px;
  border-top: 1px solid var(--border);
}

.article-info span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  color: var(--border);
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--primary);
  margin-bottom: 10px;
}

.empty-state p {
  color: var(--text-light);
}

/* Article Modal */
.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.article-modal {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 2px solid var(--border);
}

.modal-header h2 {
  color: var(--primary);
  font-size: 24px;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: var(--background);
}

.modal-content {
  padding: 30px;
}

.article-header {
  margin-bottom: 30px;
}

.article-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 15px;
  color: var(--text-light);
}

.article-body {
  line-height: 1.8;
  margin-bottom: 30px;
}

.article-body h3 {
  color: var(--primary);
  margin: 25px 0 15px;
  font-size: 20px;
}

.article-body ul {
  padding-left: 25px;
  margin-bottom: 20px;
}

.article-body li {
  margin-bottom: 8px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .article-modal {
    max-height: 95vh;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-content {
    padding: 20px;
  }
}
</style>