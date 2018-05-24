const PageTagMap = require('../lib/pageTagMap').PageTagMap

module.exports = {
    // 创建 page-tag 关系
    create (pageTag) {
        return PageTagMap.create(pageTag)
    },
    // 编辑 page-tag 关系
    edit (id, updates) {
        let condition = { _id: id }
        return PageTagMap
            .update(condition, { $set: updates })
            .exec()
    },
    // 查询 page-tag 关系
    getPageTagMapList (query) {
        return PageTagMap
            .find(query)
            .exec()
    },
    // 查询  page-tag 数量
    getPageTagMapNum (query) {
        return PageTagMap
            .find(query)
            .count()
            .exec()
    },
}