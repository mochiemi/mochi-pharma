<template>
  <div class="form-group" :class="{ 'has-error': error, 'disabled': disabled }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <div class="select-wrapper">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :multiple="multiple"
        :size="size"
        :class="selectClasses"
        @change="handleChange"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <option 
          v-if="placeholder" 
          value="" 
          disabled 
          hidden
        >
          {{ placeholder }}
        </option>
        
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
        
        <slot></slot>
      </select>
      
      <div class="select-arrow">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
    
    <div v-if="helpText && !error" class="help-text">{{ helpText }}</div>
    <div v-if="error" class="error-text">{{ error }}</div>
    
    <div v-if="selectedLabel" class="selected-label">
      Selected: <strong>{{ selectedLabel }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: null
    },
    selectSize: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
  computed: {
    selectClasses() {
      return [
        'form-select',
        `select-${this.selectSize}`,
        {
          'has-error': this.error,
          'multiple': this.multiple
        }
      ]
    },
    selectedLabel() {
      if (!this.modelValue && this.modelValue !== 0) return ''
      
      if (this.multiple && Array.isArray(this.modelValue)) {
        const selectedOptions = this.options.filter(option => 
          this.modelValue.includes(option.value)
        )
        return selectedOptions.map(opt => opt.label).join(', ')
      }
      
      const selectedOption = this.options.find(option => option.value === this.modelValue)
      return selectedOption ? selectedOption.label : ''
    }
  },
  methods: {
    handleChange(event) {
      let value
      if (this.multiple) {
        value = Array.from(event.target.selectedOptions).map(option => option.value)
      } else {
        value = event.target.value
      }
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--primary);
}

.required {
  color: var(--accent);
  margin-left: 2px;
}

.select-wrapper {
  position: relative;
}

.form-select {
  width: 100%;
  padding: 12px 16px;
  padding-right: 40px;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text);
  font-size: 16px;
  font-family: inherit;
  transition: var(--transition);
  appearance: none;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--shadow);
}

.form-select.has-error {
  border-color: var(--accent);
}

.form-select:disabled {
  background-color: var(--card-bg);
  cursor: not-allowed;
  opacity: 0.7;
}

.form-select.multiple {
  padding-right: 16px;
  height: auto;
  min-height: 120px;
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  pointer-events: none;
  transition: var(--transition);
}

.form-select:focus + .select-arrow {
  color: var(--accent);
}

.form-select.multiple + .select-arrow {
  display: none;
}

/* Sizes */
.select-small {
  padding: 8px 12px;
  padding-right: 32px;
  font-size: 14px;
}

.select-small + .select-arrow {
  right: 12px;
}

.select-large {
  padding: 16px 20px;
  padding-right: 48px;
  font-size: 18px;
}

.select-large + .select-arrow {
  right: 20px;
}

/* Help and error text */
.help-text {
  margin-top: 6px;
  font-size: 14px;
  color: var(--text-light);
}

.error-text {
  margin-top: 6px;
  font-size: 14px;
  color: var(--accent);
  font-weight: 500;
}

/* Selected label */
.selected-label {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: rgba(139, 65, 153, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text);
}

/* Styling for options */
.form-select option {
  padding: 8px;
  background-color: var(--card-bg);
  color: var(--text);
}

.form-select option:disabled {
  color: var(--text-light);
  font-style: italic;
}
</style>