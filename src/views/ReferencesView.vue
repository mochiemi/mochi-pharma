<template>
  <div class="references-view">
    <div class="container">
      <div class="page-header">
        <h1><i class="fas fa-heartbeat"></i> Quick References</h1>
        <p>Essential pharmacology concepts and definitions at your fingertips</p>
      </div>
      
      <!-- Quick Reference Grid -->
      <div class="references-grid">
        <InfoCard
          v-for="reference in references"
          :key="reference.id"
          :reference="reference"
          @click="showReferenceDetail(reference)"
        />
      </div>
      
      <!-- Pharmacology Terms Section -->
      <div class="terms-section">
        <h2 class="section-title">Pharmacology Glossary</h2>
        <div class="terms-grid">
          <BaseCard 
            v-for="term in glossaryTerms" 
            :key="term.id"
            class="term-card"
          >
            <h3 class="term-title">{{ term.term }}</h3>
            <p class="term-definition">{{ term.definition }}</p>
            <div class="term-example" v-if="term.example">
              <strong>Example:</strong> {{ term.example }}
            </div>
            <div class="term-tags" v-if="term.tags">
              <span 
                v-for="tag in term.tags" 
                :key="tag"
                class="term-tag"
              >
                {{ tag }}
              </span>
            </div>
          </BaseCard>
        </div>
      </div>
      
      <!-- Alert Boxes Section -->
      <div class="alerts-section">
        <h2 class="section-title">Important Reminders</h2>
        <div class="alerts-grid">
          <AlertBox 
            type="info" 
            title="Storage Guidelines"
            icon="fas fa-info-circle"
          >
            Store medications in a cool, dry place away from direct sunlight and out of reach of children.
          </AlertBox>
          
          <AlertBox 
            type="warning" 
            title="Antibiotic Course"
            icon="fas fa-exclamation-triangle"
          >
            Never stop antibiotics early even if you feel better. This can lead to antibiotic resistance.
          </AlertBox>
          
          <AlertBox 
            type="danger" 
            title="Drug Interactions"
            icon="fas fa-exclamation-circle"
          >
            Always inform your doctor about all medications you're taking, including over-the-counter drugs and supplements.
          </AlertBox>
          
          <AlertBox 
            type="info" 
            title="Expiration Dates"
            icon="fas fa-calendar-alt"
          >
            Regularly check medication expiration dates. Do not use expired medications as they may lose effectiveness or become harmful.
          </AlertBox>
        </div>
      </div>
      
      <!-- Reference Detail Modal -->
      <div v-if="selectedReference" class="reference-modal-overlay" @click="selectedReference = null">
        <div class="reference-modal" @click.stop>
          <div class="modal-header">
            <h2>{{ selectedReference.title }}</h2>
            <button class="close-btn" @click="selectedReference = null">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content">
            <div class="reference-detail">
              <div class="detail-icon">
                <i :class="selectedReference.icon"></i>
              </div>
              
              <div class="detail-content">
                <h3>Definition</h3>
                <p>{{ selectedReference.definition }}</p>
                
                <div v-if="selectedReference.formula" class="detail-formula">
                  <h4>Formula</h4>
                  <div class="formula-box">{{ selectedReference.formula }}</div>
                </div>
                
                <div v-if="selectedReference.example" class="detail-example">
                  <h4>Example</h4>
                  <p>{{ selectedReference.example }}</p>
                </div>
                
                <div v-if="selectedReference.application" class="detail-application">
                  <h4>Clinical Application</h4>
                  <p>{{ selectedReference.application }}</p>
                </div>
                
                <div class="detail-tags">
                  <span 
                    v-for="tag in selectedReference.tags" 
                    :key="tag"
                    class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="modal-actions">
              <BaseButton variant="outline" @click="selectedReference = null">
                <i class="fas fa-times"></i> Close
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import BaseCard from '@/components/common/BaseCard.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import InfoCard from '@/components/notes/InfoCard.vue'
import AlertBox from '@/components/common/AlertBox.vue'

export default {
  name: 'ReferencesView',
  components: {
    BaseCard,
    BaseButton,
    InfoCard,
    AlertBox
  },
  setup() {
    const selectedReference = ref(null)
    
    const references = ref([
      {
        id: 1,
        title: 'Half-life',
        definition: 'Time required for the concentration of a drug in the body to reduce by 50%',
        icon: 'fas fa-clock',
        example: 'A drug with a half-life of 6 hours will have its concentration halved every 6 hours',
        application: 'Determines dosing intervals and time to reach steady state',
        tags: ['Pharmacokinetics', 'Dosing']
      },
      {
        id: 2,
        title: 'Therapeutic Index',
        definition: 'Ratio of toxic dose to therapeutic dose (LD50/ED50 or TD50/ED50)',
        icon: 'fas fa-balance-scale',
        formula: 'TI = TD50 / ED50',
        example: 'Warfarin has a narrow therapeutic index requiring frequent monitoring',
        application: 'Indicator of drug safety - higher values indicate safer drugs',
        tags: ['Safety', 'Pharmacodynamics']
      },
      {
        id: 3,
        title: 'Bioavailability',
        definition: 'Fraction of administered drug that reaches systemic circulation unchanged',
        icon: 'fas fa-tablets',
        formula: 'F = (AUC oral / AUC IV) × (Dose IV / Dose oral)',
        example: 'Oral morphine has ~30% bioavailability due to first-pass metabolism',
        application: 'Important for route selection and dose calculation',
        tags: ['Absorption', 'Pharmacokinetics']
      },
      {
        id: 4,
        title: 'Volume of Distribution',
        definition: 'Theoretical volume needed to contain the total amount of drug at the same concentration as in plasma',
        icon: 'fas fa-flask',
        formula: 'Vd = Amount of drug in body / Plasma concentration',
        example: 'Drugs with high Vd distribute extensively into tissues',
        application: 'Determines loading dose and distribution characteristics',
        tags: ['Distribution', 'Pharmacokinetics']
      },
      {
        id: 5,
        title: 'Clearance',
        definition: 'Volume of plasma cleared of drug per unit time',
        icon: 'fas fa-filter',
        formula: 'CL = Rate of elimination / Plasma concentration',
        example: 'Renal clearance contributes to total drug clearance',
        application: 'Determines maintenance dosing rate',
        tags: ['Elimination', 'Pharmacokinetics']
      },
      {
        id: 6,
        title: 'Drug Interaction',
        definition: 'When one drug affects the activity of another drug when administered together',
        icon: 'fas fa-exchange-alt',
        example: 'Grapefruit juice inhibits CYP3A4, increasing levels of many drugs',
        application: 'Important for medication safety and efficacy',
        tags: ['Safety', 'Pharmacology']
      }
    ])
    
    const glossaryTerms = ref([
      {
        id: 1,
        term: 'Pharmacokinetics',
        definition: 'What the body does to the drug (absorption, distribution, metabolism, excretion)',
        example: 'Study of how aspirin is absorbed, distributed, metabolized, and excreted',
        tags: ['Fundamental', 'Process']
      },
      {
        id: 2,
        term: 'Pharmacodynamics',
        definition: 'What the drug does to the body (mechanism of action, effects)',
        example: 'Study of how aspirin inhibits platelet aggregation',
        tags: ['Fundamental', 'Mechanism']
      },
      {
        id: 3,
        term: 'First-pass Metabolism',
        definition: 'Metabolism of orally administered drugs by the liver before reaching systemic circulation',
        example: 'Nitroglycerin undergoes extensive first-pass metabolism',
        tags: ['Metabolism', 'Oral']
      },
      {
        id: 4,
        term: 'Steady State',
        definition: 'When drug administration equals drug elimination, maintaining constant plasma concentration',
        example: 'Achieved after 4-5 half-lives of regular dosing',
        tags: ['Kinetics', 'Dosing']
      },
      {
        id: 5,
        term: 'Prodrug',
        definition: 'Inactive drug that requires metabolic conversion to become active',
        example: 'Enalapril is converted to enalaprilat in the liver',
        tags: ['Metabolism', 'Activation']
      },
      {
        id: 6,
        term: 'Therapeutic Window',
        definition: 'Range of drug concentrations between minimum effective concentration and toxic concentration',
        example: 'Narrow for drugs like digoxin, requiring careful monitoring',
        tags: ['Safety', 'Monitoring']
      },
      {
        id: 7,
        term: 'Loading Dose',
        definition: 'Initial higher dose of drug given to quickly achieve therapeutic concentrations',
        example: 'Used with drugs that have long half-lives',
        tags: ['Dosing', 'Initial']
      },
      {
        id: 8,
        term: 'Maintenance Dose',
        definition: 'Dose required to maintain steady-state concentrations',
        example: 'Regular daily doses after initial loading',
        tags: ['Dosing', 'Maintenance']
      }
    ])
    
    const showReferenceDetail = (reference) => {
      selectedReference.value = reference
    }
    
    return {
      selectedReference,
      references,
      glossaryTerms,
      showReferenceDetail
    }
  }
}
</script>

<style scoped>
.references-view {
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

/* References Grid */
.references-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

/* Terms Section */
.section-title {
  color: var(--primary);
  font-size: 28px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--border);
}

.terms-section {
  margin-bottom: 60px;
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.term-card {
  height: 100%;
  transition: var(--transition);
}

.term-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px var(--shadow);
}

.term-title {
  color: var(--secondary);
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
}

.term-definition {
  color: var(--text);
  line-height: 1.6;
  margin-bottom: 15px;
}

.term-example {
  background-color: rgba(139, 65, 153, 0.1);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.term-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.term-tag {
  background-color: var(--accent-light);
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
}

/* Alerts Section */
.alerts-section {
  margin-bottom: 40px;
}

.alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Reference Modal */
.reference-modal-overlay {
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

.reference-modal {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  max-width: 700px;
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

.reference-detail {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.detail-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
}

.detail-content {
  flex: 1;
}

.detail-content h3 {
  color: var(--primary);
  margin-bottom: 10px;
  font-size: 20px;
}

.detail-content h4 {
  color: var(--secondary);
  margin: 20px 0 10px;
  font-size: 18px;
}

.detail-formula {
  margin: 20px 0;
}

.formula-box {
  background-color: var(--background);
  padding: 15px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 18px;
  text-align: center;
  border: 2px solid var(--border);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.detail-tags .tag {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

@media (max-width: 768px) {
  .references-grid,
  .terms-grid,
  .alerts-grid {
    grid-template-columns: 1fr;
  }
  
  .reference-detail {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .detail-icon {
    margin-bottom: 20px;
  }
  
  .reference-modal {
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