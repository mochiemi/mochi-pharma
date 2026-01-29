<template>
  <div class="home-view">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            <i class="fas fa-pills"></i>
            {{ $t('app.name') }}
          </h1>
          <p class="hero-subtitle">Your Personal Pharmacology Notebook</p>
          <p class="hero-description">
            A comprehensive tool for managing medicament information, study notes, 
            and pharmacology references in one place.
          </p>
          
          <div class="hero-actions">
            <BaseButton 
              variant="primary" 
              size="large"
              @click="$router.push('/medicaments')"
            >
              <i class="fas fa-capsules"></i>
              Browse Medicaments
            </BaseButton>
            <BaseButton 
              variant="outline" 
              size="large"
              @click="$router.push('/notes')"
            >
              <i class="fas fa-book-medical"></i>
              View Notes
            </BaseButton>
          </div>
        </div>
        
        <div class="hero-image">
          <div class="hero-card">
            <i class="fas fa-stethoscope"></i>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-section">
        <h2 class="section-title">Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-capsules"></i>
            </div>
            <h3>Medicament Management</h3>
            <p>Store and organize information about medications, including dosage, indications, and notes.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-book-medical"></i>
            </div>
            <h3>Study Notes</h3>
            <p>Create and organize pharmacology study notes with rich text formatting and tags.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-search"></i>
            </div>
            <h3>Quick Reference</h3>
            <p>Access important pharmacology concepts and definitions instantly.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-palette"></i>
            </div>
            <h3>Customizable Theme</h3>
            <p>Switch between light and dark modes for comfortable studying at any time.</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ medicamentsCount }}</div>
            <div class="stat-label">Medicaments</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-number">{{ notesCount }}</div>
            <div class="stat-label">Notes</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-number">{{ articlesCount }}</div>
            <div class="stat-label">Articles</div>
          </div>
          
          <div class="stat-card">
            <div class="stat-number">{{ referencesCount }}</div>
            <div class="stat-label">References</div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-grid">
          <BaseCard 
            v-for="activity in recentActivities" 
            :key="activity.id"
            :title="activity.title"
            class="activity-card"
          >
            <template #icon>
              <i :class="activity.icon"></i>
            </template>
            <p>{{ activity.description }}</p>
            <div class="activity-meta">
              <span class="activity-date">{{ activity.date }}</span>
              <span class="activity-type">{{ activity.type }}</span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'

export default {
  name: 'HomeView',
  components: {
    BaseCard,
    BaseButton
  },
  setup() {
    const medicamentsCount = ref(0)
    const notesCount = ref(0)
    const articlesCount = ref(0)
    const referencesCount = ref(0)
    
    const recentActivities = ref([
      {
        id: 1,
        title: 'Added Amoxicillin',
        description: 'Added new antibiotic to medicament list',
        icon: 'fas fa-capsules',
        date: 'Today',
        type: 'Medicament'
      },
      {
        id: 2,
        title: 'Updated Pharmacology Notes',
        description: 'Added new section about drug interactions',
        icon: 'fas fa-book-medical',
        date: 'Yesterday',
        type: 'Note'
      },
      {
        id: 3,
        title: 'New Article Saved',
        description: 'Saved article about pharmacokinetics',
        icon: 'fas fa-newspaper',
        date: '2 days ago',
        type: 'Article'
      },
      {
        id: 4,
        title: 'Therapeutic Index Reference',
        description: 'Added reference card for therapeutic index',
        icon: 'fas fa-heartbeat',
        date: '3 days ago',
        type: 'Reference'
      }
    ])
    
    // Simulate loading stats
    onMounted(() => {
      setTimeout(() => {
        medicamentsCount.value = 12
        notesCount.value = 24
        articlesCount.value = 8
        referencesCount.value = 15
      }, 500)
    })
    
    return {
      medicamentsCount,
      notesCount,
      articlesCount,
      referencesCount,
      recentActivities
    }
  }
}
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 200px);
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-bottom: 60px;
  padding: 40px 0;
}

.hero-content {
  padding-right: 20px;
}

.hero-title {
  font-size: 48px;
  color: var(--primary);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.hero-subtitle {
  font-size: 24px;
  color: var(--secondary);
  margin-bottom: 20px;
  font-weight: 600;
}

.hero-description {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 30px;
  color: var(--text-light);
}

.hero-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-card {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 80px;
  box-shadow: 0 20px 40px var(--shadow);
}

/* Features Section */
.section-title {
  text-align: center;
  color: var(--primary);
  font-size: 32px;
  margin-bottom: 40px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: var(--accent);
  border-radius: 2px;
}

.features-section {
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 30px;
  text-align: center;
  border-top: 5px solid var(--accent);
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px var(--shadow);
}

.feature-icon {
  font-size: 48px;
  color: var(--accent);
  margin-bottom: 20px;
}

.feature-card h3 {
  color: var(--primary);
  margin-bottom: 15px;
  font-size: 22px;
}

.feature-card p {
  color: var(--text-light);
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  margin-bottom: 60px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 30px;
  text-align: center;
  border: 2px solid var(--border);
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 10px;
}

.stat-label {
  font-size: 18px;
  color: var(--text-light);
  font-weight: 600;
}

/* Recent Activity */
.activity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.activity-card {
  height: 100%;
  transition: var(--transition);
}

.activity-card:hover {
  transform: translateY(-5px);
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  font-size: 14px;
}

.activity-date {
  color: var(--text-light);
}

.activity-type {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
  
  .hero-content {
    padding-right: 0;
  }
  
  .hero-title {
    justify-content: center;
    font-size: 36px;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-card {
    width: 150px;
    height: 150px;
    font-size: 60px;
  }
}
</style>