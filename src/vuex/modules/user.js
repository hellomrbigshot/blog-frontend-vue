// import Vue from 'vue'
const user = {
  state: {
    username: '',
    page_num: 0,
    draft_num: 0,
    avatar: ''
  },
  getters: {},
  mutations: {
    updateUserInfo (state, obj) {
      const KEY_ARRAY = [
        {
          name: 'page_num',
          type: 'number'
        },
        {
          name: 'draft_num',
          type: 'number'
        },
        {
          name: 'comment_num',
          type: 'number'
        },
        {
          name: 'avatar',
          type: 'string'
        }
      ]
      const user = JSON.parse(localStorage.getItem('user')) || {}

      KEY_ARRAY.forEach(key => {
        if (typeof obj[key.name] !== 'undefined') {
          user[key.name] = state[key.name] = obj[key.name]
        } else {
          user[key.name] = state[key.name] =
            typeof user[key.name] === 'undefined'
              ? key.type === 'number'
                ? 0
                : ''
              : user[key.name]
        }
      })
      localStorage.setItem('user', JSON.stringify(user))
    },
    updateUserName (state, username) {
      state.username = username
    }
  }
}
export default user
