import Vue from 'vue'
const user = {
    state: {
        username: '',
        page_num: 0,
        draft_num: 0
    },
    mutations: {
        updatePageNum (state, obj) {
            state.page_num = obj.page_num
            state.draft_num = obj.draft_num
        },
        updateUserName (state, username) {
            state.username = username
        }
    }
}
export default user