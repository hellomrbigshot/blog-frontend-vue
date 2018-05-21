const Tag = require('../lib/tag').Tag

module.exports = {
    // 创建 tag
    create (tag) {
        return Tag.create(tag)
    },
    // 编辑 tag
    edit (id, updates) {
        let condition = {_id: id}
        return Tag
            .update(condition, { $set: updates })
            .exec()
    },
    // 获取 tag 列表
    getTagList (pageSize=10, Count=0) {
        return Tag
            .find()
            .skip(Count)
			.limit(pageSize)
            .exec()
    },
    // 获取 tag 数量
    getTagNum () {
        return Tag
            .find()
            .count()
            .exec()
    }
}