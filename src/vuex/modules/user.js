import Vue from 'vue'
const user = {
    state: {
        username: '',
        page_num: 0,
        draft_num: 0
    },
    getters: {

    },
    mutations: {
        updatePageNum (state, obj) {
            // Vue.set(state, 'page_num', obj.page_num)
            // Vue.set(state, 'draft_num', obj.draft_num)
            state.page_num = obj.page_num
            state.draft_num = obj.draft_num
            if (localStorage.getItem('user')) {
                let user = JSON.parse(localStorage.getItem('user'))
                user.page_num = obj.page_num
                user.draft_num = obj.draft_num
                localStorage.setItem('user', JSON.stringify(user))
            } else {
                let user = {
                    page_num: obj.page_num,
                    draft_num: obj.draft_num
                }
                localStorage.setItem('user', JSON.stringify(user))
            }
            
        },
        updateUserName (state, username) {
            state.username = username
        }
    }
}
export default user