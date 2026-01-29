<template>
  <div class="form-group" :class="{ 'has-error': error, 'disabled': disabled }">
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <div class="input-wrapper" :class="{ 'with-icon': $slots.prefix || $slots.suffix }">
      <div v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </div>
      
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keyup.enter="$emit('enter', $event)"
      />
      
      <div v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </div>
      
      <div v-if="clearable && modelValue" class="clear-btn" @click="handleClear">
        <i class="fas fa-times"></i>
      </div>
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
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
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
    type: {
      type: String,
      default: 'text',
      validator: (value) => [
        'text', 'password', 'email', 'number', 'tel', 'url', 'search'
      ].includes(value)
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
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    clearable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: null
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    showCounter: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'enter', 'clear'],
  computed: {
    inputClasses() {
      return [
        'form-input',
        `input-${this.size}`,
        {
          'has-error': this.error,
          'has-prefix': this.$slots.prefix,
          'has-suffix': this.$slots.suffix
        }
      ]
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleClear() {
      this.$emit('update:modelValue', '')
      this.$emit('clear')
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

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  background-color: var(--background);
  color: var(--text);
  font-size: 16px;
  font-family: inherit;
  transition: var(--transition);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--shadow);
}

.form-input.has-error {
  border-color: var(--accent);
}

.form-input:disabled,
.form-input:read-only {
  background-color: var(--card-bg);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Sizes */
.input-small {
  padding: 8px 12px;
  font-size: 14px;
}

.input-large {
  padding: 16px 20px;
  font-size: 18px;
}

/* With icons */
.input-prefix,
.input-suffix {
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--text-light);
  background-color: var(--background);
  border: 2px solid var(--border);
  height: 100%;
}

.input-prefix {
  border-right: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.input-suffix {
  border-left: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.has-prefix {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}

.has-suffix {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}

/* Clear button */
.clear-btn {
  position: absolute;
  right: 12px;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.clear-btn:hover {
  color: var(--accent);
  background-color: var(--shadow);
}

.has-suffix + .clear-btn {
  right: 50px;
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
</style>