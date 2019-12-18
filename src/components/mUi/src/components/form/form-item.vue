<template>
  <div>
    <label
      v-if="label"
      :class="{ 'm-form-item-label-required': isRequired }"
    >{{ label }}</label>
    <div>
      <slot></slot>
      <div
        v-if="validateState === 'error'"
        class="m-form-item-message"
      >{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter.js'
import AsyncValidator from 'async-validator'
export default {
  name: 'mFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data () {
    return {
      isRequired: false, // 是否必填
      validateState: '', // 校验状态
      validateMessage: '' // 校验不通过时的提示信息
    }
  },
  computed: {
    // 从 Form 的 model 中动态获取当前表单组件的数据
    fieldValue () {
      return this.form.model[this.prop]
    }
  },
  mounted () {
    // 如果没有传入 prop，则无需校验也无需缓存
    if (this.prop) {
      this.dispatch('mForm', 'on-form-item-add', this)

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue
      this.setRules()
    }
  },
  beforeDestroy () {
    this.dispatch('mForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules () {
      const rules = this.getRules()
      if (rules.some(rule => rule.required)) this.isRequired = true
      this.$on('on-form-blur', this.onFiledBlur)
      this.$on('on-form-change', this.onFiledChange)
    },
    // 从 Form 的 rules 属性中获取当前 FormItem 的检验规则
    getRules () {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return formRules
    },
    // 充值数据
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    },
    // 只支持 blur 和 change，过滤出符合要求的 rule
    getFilteredRule (trigger) {
      const rules = this.getRules()
      return rules.filter(rule => rule.trigger && rule.trigger.indexOf(trigger) > -1)
    },
    validate (trigger, callback = function () { }) {
      const rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }

      // 设置状态为校验中
      this.validateState = 'validating'

      // 调用 async-validator 库
      const descriptor = {
        [this.prop]: rules
      }
      const validator = new AsyncValidator(descriptor)
      validator.validate({ [this.prop]: this.form.model[this.prop] }, (errors, fields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    onFiledBlur (value) {
      this.validate('blur')
    },
    onFiledChange () {
      this.validate('change')
    }
  }
}
</script>
<style>
.m-form-item-label-required:before {
  content: "*";
  color: #f56c6c;
}
.m-form-item-message {
  color: #f56c6c;
}
</style>
