<template>
  <div class="rich-text-content">
    <h2 v-if="title">{{ title }}</h2>
    
    <div v-for="(section, index) in content" :key="index" class="content-section">
      <h3 v-if="section.title">{{ section.title }}</h3>
      
      <p v-if="section.text" v-html="formatText(section.text)"></p>
      
      <ul v-if="section.list && section.listType === 'unordered'">
        <li v-for="(item, itemIndex) in section.list" :key="itemIndex" v-html="formatText(item)"></li>
      </ul>
      
      <ol v-if="section.list && section.listType === 'ordered'">
        <li v-for="(item, itemIndex) in section.list" :key="itemIndex" v-html="formatText(item)"></li>
      </ol>
      
      <div v-if="section.note" class="note">
        <i class="fas fa-info-circle"></i>
        <p v-html="formatText(section.note)"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RichTextContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    formatText(text) {
      // Substitui marcadores de highlight
      return text.replace(/\[\[(.*?)\]\]/g, '<span class="highlight">$1</span>')
    }
  }
}
</script>

<style scoped>
.rich-text-content {
  line-height: 1.8;
}

.rich-text-content h2 {
  color: var(--primary);
  margin: 0 0 20px 0;
  font-size: 24px;
}

.rich-text-content h3 {
  color: var(--secondary);
  margin: 15px 0 10px;
  font-size: 20px;
}

.rich-text-content p {
  margin-bottom: 15px;
}

.rich-text-content ul,
.rich-text-content ol {
  padding-left: 25px;
  margin-bottom: 15px;
}

.rich-text-content li {
  margin-bottom: 8px;
}

.highlight {
  background-color: var(--accent-light2);
  color: var(--primary-dark);
  padding: 3px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.note {
  background-color: rgba(139, 65, 153, 0.1);
  border-left: 4px solid var(--secondary);
  padding: 15px;
  margin: 20px 0;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-radius: 8px;
}

.note i {
  color: var(--secondary);
  font-size: 18px;
  margin-top: 3px;
}

.note p {
  margin: 0;
  font-style: italic;
}
</style>