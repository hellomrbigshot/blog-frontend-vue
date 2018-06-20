const Comment = require('../lib/comment').Comment

module.exports = {
    // 创建评论
    create (comment) {
        return Comment.create(comment)
    },
    // 通过 id 获取评论
    getCommentById (id) {
        return Comment
            .findOne({ _id: id })
            .exec()
    },
    // 查询评论列表
    getCommentList (type, content) {
        let query_obj = {}
        if (type === 'page') {
            query_obj.pageid = content
        } else if (type === 'create_user') {
            query_obj.createuser = content
        } else if (type === 'to_user') {
            query_obj.touser = content
        }
        return Comment
            .find(query_obj)
            .exec()
    },
    // 查询评论数量
    getCommentNum (type, content) {
        let query_obj = {}
        if (type === 'page') {
            query_obj.pageid = content
        } else if (type === 'create_user') {
            query_obj.createuser = content
        } else if (type === 'to_user') {
            query_obj.touser = content
        }
        return Comment
            .find(query_obj)
            .count()
            .exec()
    }

}