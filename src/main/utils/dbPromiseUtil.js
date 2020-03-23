import path from 'path'
import remote from 'electron'
import dbUtil from './dbUtil'


/**
 * 同步执行
 * @param {Object} database
 */
function DB(database) {
	this.db = dbUtil[database]
}

/**
 * 
 * @param {Object} offset
 * @param {Object} limit
 */
DB.prototype.limit = function(offset, limit) {
    this.offset = offset || 0;
    this.limit = limit || 15;
    return this;
}

/**
 * 
 * @param {Object} orderby
 */
DB.prototype.sort = function(orderby) {
    this.orderby = orderby;
    return this;
}

/**
 * 
 * @param {Object} query
 * @param {Object} select 第二个参数传入projections对象，来规定返回字段。比如： {a:1, b:1}指定只返回a和b字段，{a:0, b:0}指定省略a和b这两个字段。
// _id默认返回，不需要返回设置_id: 
 */
DB.prototype.find = function(query, select) {
    return new Promise((resolve, reject) => {
        let stmt = this.db.find(query || {});
        if (this.orderby !== undefined) {
            stmt.sort(this.orderby);
        }
        if (this.offset !== undefined) {
            stmt.skip(this.offset).limit(this.limit);
        }
        if (select != undefined) {
            stmt.projection(select || {});
        }
        stmt.exec((err, docs) => {
            if (err) {
                return reject(err);
            }
            resolve(docs);
        })
    })
};




/**
 * 
 * @param {Object} query
 * @param {Object} select
 */
DB.prototype.count = function(query) {
    return new Promise((resolve, reject) => {
        let stmt = this.db.count(query || {});
        stmt.exec((err, count) => {
            if (err) {
                return reject(err);
            }
            resolve(count);
        })
    })
}

/**
 * 
 * @param {Object} query
 * @param {Object} select
 */
DB.prototype.findOne = function(query, select) {
    return new Promise((resolve, reject) => {
        let stmt = this.db.findOne(query || {});
        if (this.sort !== undefined) {
            stmt.sort(this.sort);
        }
        if (select != undefined) {
            stmt.projection(select || {});
        }
        stmt.exec((err, doc) => {
            if (err) {
                return reject(err);
            }
            resolve(doc);
        })
    })
}

/**
 * 
 * @param {Object} values
 */
DB.prototype.insert = function(values) {
    return new Promise((resolve, reject) => {
        this.db.insert(values, (err, newDoc) => {
            if (err) {
                return reject(err);
            }
            resolve(newDoc);
        })
    })
}

/**
 * 
 * @param {Object} query
 * @param {Object} values
 * @param {Object} options
 */
DB.prototype.update = function(query, values, options) {
    return new Promise((resolve, reject) => {
        this.db.update(query || {}, values || {}, options || {}, (err, numAffected) => {
            if (err) {
                return reject(err);
            }
            resolve(numAffected);
        })
    });
}

/**
 * 
 * @param {Object} query
 * @param {Object} options
 */
DB.prototype.remove = function(query, options) {
    return new Promise((resolve, reject) => {
        this.db.remove(query || {}, options || {}, (err, numAffected) => {
            if (err) {
                return reject(err);
            }
            resolve(numAffected);
        })
    });
}

/**
 * 
 */
export default (database) => {
    return new DB(database);
}