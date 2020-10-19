var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var cookieParser = require('cookie-parser')
// var router = express.Router();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'xiaomiuser'
});
connection.connect(function () {
    console.log("数据库连接成功");
});
app.use("/Web", express.static("./WWW"));
app.use("/data", express.static("./WWW/data"));
app.use("/images", express.static("./WWW/images"));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())


app.get("/checkusername", function (req, res) {
    var {
        username
    } = req.query;
    connection.query(`SELECT * FROM user WHERE username='${username}'`, function (error, results, fields) {
        if (error) throw error;
        // console.log('The solution is:', results);
        if (results[0]) {
            // res.end(JSON.stringify({error: 1, data: "用户名已存在"}))
            res.send({
                error: 1,
                data: '用户名已存在'
            });
        } else {
            res.send({
                error: 0,
                data: '用户名可以使用'
            });
        }
    });

})

app.post("/register", function (req, res) {
    // console.log(JSON.stringify(req.body))
    var {
        username,
        password
    } = req.body;
    // "INSERT INTO user VALUES ('王老七1', '123456')"
    connection.query(`INSERT INTO user VALUES ('${username}', '${password}')`, function (error, results, fields) {
        if (error) throw error;
        // console.log(results);
    })
    res.send({
        error: 0,
        data: "注册成功"
    })
})

app.post("/login", function (req, res) {
    // console.log(JSON.stringify(req.body))
    var {
        username,
        password
    } = req.body;
    connection.query(`SELECT * FROM user WHERE username='${username}' and password='${password}'`, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        console.log(JSON.stringify(results));

        if (results[0]) {
            res.cookie('isLogin','1',{maxAge:60000,path:'/',expires:60000})
            res.send({
                error: 0,
                data: '登录成功'
            });
        } else {
            res.send({
                error: 1,
                data: '用户名或密码错误'
            });
        }
    })

})

app.listen(3000)