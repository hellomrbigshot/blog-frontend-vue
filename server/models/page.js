const Page = require('../lib/page').Page

module.exports = {
    // 创建一篇蚊帐
    create (page) {
        return Page.create(user)
    },
    // 通过 id 获取文章
    getPageById (id) {
        return Page
            .findOne({ _id: id })
            .exec()
    }
    // 获取文章列表
    getPageList (type='', content='') {
        if (type === 'creator') {
            return Page
                .find({ create_user: content })
                .exec()

        } else if (type === 'tag') {
            return Page
                .find({})
                .exec()

        } else {
            return Page
                .find()
                .exec()
        }
    } 
}