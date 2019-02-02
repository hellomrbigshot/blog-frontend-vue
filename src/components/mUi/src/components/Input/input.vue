<template>
  <input 
    :type="type"
    :value="currentValue"

    @input="handleInput"
    @blur="handleBlur"/>
</template>
<script>
import Emitter from '../../mixins/emitter.js';
import mFormItem from '../form/form-item';
export default {
  name: 'mInput',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: [String, Number]
    },
    cols: {
      type: [String, Number]
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  },
  methods: {
    handleInput (event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('mFormItem', 'on-form-change', value);
    },
    handleBlur () {
      console.log('blur');
      this.dispatch('mFormItem', 'on-form-blur', this.currentValue);
    }
  },
}
</script>

