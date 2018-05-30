const Tag = require('../lib/tag').Tag

module.exports = {
    // 创建 tag
    create (tag) {
        return Tag.create(tag)
    },
    findTagByName (name) {
        return Tag
            .findOne({ name })
            .exec()
    },
    // 编辑 tag
    edit (name, updates) {
        let condition = { name: name }
        return Tag
            .update(condition, { $set: updates })
            .exec()
    },
    // 获取 tag 列表（含分页）
    getTagList (pageSize=10, Count=0) {
        return Tag
            .find()
            .skip(Count)
			.limit(pageSize)
            .exec()
    },
    getAllTags () {
        return Tag
            .find()
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