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
    getCommentList (query) {
        const type = query.type
        const content = query.content
        const pageSize = query.pageSize
        const Count = query.Count
        let query_obj = {}
        if (type === 'page') {
            query_obj.page_id = content
        } else if (type === 'create_user') {
            query_obj.create_user = content
        } else if (type === 'to_user') {
            query_obj.to_user = content
        }
        if (pageSize && Count) {
            return Comment
                .find(query_obj)
                .skip(Count)
                .limit(pageSize)
                .exec()
        } else {
            return Comment
                .find(query_obj)
                .exec()
        }
        
    },
    // 查询评论数量
    getCommentNum (type, content) {
        let query_obj = {}
        if (type === 'page') {
            query_obj.page_id = content
        } else if (type === 'create_user') {
            query_obj.create_user = content
        } else if (type === 'to_user') {
            query_obj.to_user = content
        }
        return Comment
            .find(query_obj)
            .count()
            .exec()
    }

}