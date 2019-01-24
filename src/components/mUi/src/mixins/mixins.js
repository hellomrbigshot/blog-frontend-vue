import Emitter from './emitter.js'

export default {
  mixins: [Emitter],
  methods: {
    handleDispatch () {
      this.dispatch();
    },
    handleBroadcast () {
      this.broadcast();
    }
  },
}