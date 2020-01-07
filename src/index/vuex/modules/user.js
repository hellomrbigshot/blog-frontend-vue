import Cookies from 'js-cookie'
const userModule = {
  state: {
    username: Cookies.get('user') || ''
  },
  mutations: {
    updateUser (state, payload) {
      state.username = payload.username
    }
  }
}
export default userModule
