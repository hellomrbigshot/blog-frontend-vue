<template>
  <label>
    <span>
      <input 
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
export default {
  name: 'mCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data () {
    return {
      currentValue: false
    }
  },
  watch: {
    value (val) {
      if ([this.trueValue, this.falseValue].includes(val)) {
        this.updateModel();
      } else {
        throw new Error('Value should be trueValue or falseValue');
      }
    }
  },
  methods: {
    change (event) {
      if (this.disabled) return false;
      const checked = event.target.checked;
      this.currentValue = checked;
      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('input', value);
      this.$emit('on-change', value);
      this.$emit('mFormItem', 'on-form-change', value);
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue;
    }
  }
}
</script>