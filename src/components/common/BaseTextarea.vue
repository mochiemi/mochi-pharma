<template>
  <div class="form-group" :class="{ 'has-error': error, 'disabled': disabled }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <div class="textarea-wrapper">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        :class="textareaClasses"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keyup.enter="$emit('enter', $event)"
      ></textarea>
      
      <div v-if="resizable" class="resize-handle"></div>
    </div>
    
    <div v-if="helpText && !error" class="help-text">{{ helpText }}</div>
    <div v-if="error" class="error-text">{{ error }}</div>
    
    <div v-if="showCounter && maxlength" class="counter">
      {{ modelValue?.length || 0 }} / {{ maxlength }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTextarea',
  props: {
    modelValue: {
      type: String,
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
    readonly: {
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
    rows: {
      type: Number,
      default: 4
    },
    maxlength: {
      type: [Number, String],
      default: null
    },
    resizable: {
      type: Boolean,
      default: true
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'enter'],
  computed: {
    textareaClasses() {
      return [
        'form-textarea',
        `textarea-${this.size}`,
        {
          'has-error': this.error,
          'no-resize': !this.resizable
        }
      ]
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
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

.textarea-wrapper {
  position: relative;
}

.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text);
  font-size: 16px;
  font-family: inherit;
  transition: var(--transition);
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--shadow);
}

.form-textarea.has-error {
  border-color: var(--accent);
}

.form-textarea:disabled,
.form-textarea:read-only {
  background-color: var(--card-bg);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Sizes */
.textarea-small {
  padding: 8px 12px;
  font-size: 14px;
  min-height: 80px;
}

.textarea-large {
  padding: 16px 20px;
  font-size: 18px;
  min-height: 160px;
}

/* No resize */
.no-resize {
  resize: none;
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

/* Counter */
.counter {
  margin-top: 6px;
  text-align: right;
  font-size: 12px;
  color: var(--text-light);
}

/* Resize handle styling */
.resize-handle {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 12px;
  height: 12px;
  cursor: se-resize;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.textarea-wrapper:hover .resize-handle {
  opacity: 0.7;
}
</style>