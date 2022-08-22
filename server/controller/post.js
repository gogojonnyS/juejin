const database = require("../database/mysql")

class PostController {
    async getarticle(req, res, next) {
        let querySql = 'SELECT article.id, article.userid, article.title, article.content, article.keywords, article.followcount, article.replycount, article.viewcount, article.posttime, article.photo, users.username, users.profile FROM juejin.article INNER JOIN juejin.users ON article.userid=users.id ORDER BY article.id DESC LIMIT ?,?;'
        let params = [
            req.body.index,
            req.body.num
        ]
        try {
            let result = await database.exec(querySql, params)
            if (result.length > 0) {
                res.json({
                    code: 201,
                    msg: "请求推荐列表成功",
                    data: result
                })
            } else {
                res.json({
                    code: 409,
                    msg: "请求推荐列表失败",
                })
            }
            // console.log(result);
        } catch (error) {
            res.json({
                code: 500,
                msg: "服务器错误",
                error
            })
        }
    }





}
module.exports = new PostController()