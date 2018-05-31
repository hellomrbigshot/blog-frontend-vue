const Page = require('../lib/page').Page

module.exports = {
    // 创建文章
    create (page) {
        return Page.create(page)
    },
    // 编辑文章
    update (id, updates) {
        let condition = {_id: id}
        return Page
            .update(condition, { $set: updates })
            .exec()
    },
    // 通过 id 获取文章
    getPageById (id) {
        return Page
            .findOne({ _id: id })
            .exec()
    },
    /**
     * @获取文章列表
     * @params {string} type='' - 根据类型获取 ['', 'creator', 'tag']
     * @params {string} content='' - 对应 type 的值
     * @params {sting} content='normal'
     * @params {number} pageSize
     * @params {number} Count
     * @params {boolean} secret
     */
    getPageList (type='', content='', status='normal', pageSize=10, Count=0, secret) {
        let query_obj ={
            status
        }
        if (type === 'create_user') {
            query_obj.create_user = content
        }
        if (typeof(secret)==='boolean') {
            query_obj.secret = secret
        }
        if (type === 'tag') {
            query_obj.tags = content
        }
        return Page
            .find(query_obj)
            .skip(Count)
			.limit(pageSize)
            .sort({ 'create_date': -1 })
            .exec()
    },
    /**
     * @查询文章数量
     * @params {string} type='' - 根据类型获取 ['', 'creator', 'tag']
     * @params {string} content='' - 对应 type 的值
     * @params {sting} content='normal'
     * @params {number} pageSize
     * @params {number} Count
     * @params {boolean} secret
     */
    getPageNum (type='', content='', status='normal', secret) {
        let query_obj = { status: status }
        if (type === 'create_user') {
            query_obj.create_user = content
        }
        if (typeof(secret) === 'boolean') {
            query_obj.secret = secret
        }
        if (type === 'tag') {
            query_obj.tags = content
        }
        return Page
            .find(query_obj)
            .count()
            .exec()
    }
}