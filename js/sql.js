// 主要用于连接数据库
// 当需要连接数据库 去操作数据库数据的时候 直接导入该模块即可
let mysql = require('mysql');

// 使用连接池的方式进行连接
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ylc20010506',
    port: '3306',
    database: 'quxue2203',
    multipleStatements: true
})

// sql语句是可变：
// 得到操作数据库的结果 需要做的事情也不一样
module.exports = {
    // 有三个参数 可以把这个参数以对象的形式传递
    query(sql) {
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, res) => {
                if (err) {
                    reject({
                        code: 500,
                        msg: '数据库的连接错误'
                    })
                    return
                }
                resolve(res)
            })
        })
    }
}