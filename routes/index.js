var express = require('express');
var router = express.Router();
const connection = require('./../db/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 电影院接口
router.get('/cinema', function(req, res, next) {
  let sql = `SELECT * FROM cinema`
  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      results = JSON.parse(JSON.stringify(results))
      res.json({result: {code: 200, data: results}})
    }
  })
});

// 电影接口
router.get('/cmovie', function(req, res, next) {
  let sql = `SELECT * FROM cmovie`
  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      results = JSON.parse(JSON.stringify(results))
      res.json({result: {code: 200, data: results}})
    }
  })
});

// 用户接口
router.get('/users', function(req, res, next) {
  let userName = req.query.userName
  let password = req.query.password

  let sql = `SELECT * FROM users WHERE userName = '${userName}' AND password = '${password}'`
  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      if (results) {
        results = JSON.parse(JSON.stringify(results))
        res.json({result: {code: 200, data: results}})
      } else {
        res.json({result: {code: 1000, message: '用户名或密码错误'}})
      }
    }
  })
});

//
router.get('/row', function(req, res, next) {

  let sql = `SELECT * FROM row`
  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      results = JSON.parse(JSON.stringify(results))
      res.json({result: {code: 200, data: results}})
    }
  })
});

//
router.get('/searchRow', function(req, res, next) {
  let movieName = req.query.movieName
  let cinemaName = req.query.cinemaName
  let playday = req.query.playday
  let playtime = req.query.playtime

  let sql = `SELECT cinemaName,movieName,date_format(playday, '%Y-%c-%d') as playday,playtime,language,playroom,price,seat FROM row WHERE`
  if (movieName) {
    sql += ` movieName='${movieName}'`
  }
  if (cinemaName) {
    sql += ` AND cinemaName='${cinemaName}'`
  }
  if (playday) {
    sql += ` AND playday='${playday}'`
  }
  if (playtime) {
    sql += ` AND playtime='${playtime}'`
  }
  console.log(sql)

  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      results = JSON.parse(JSON.stringify(results))
      res.json({result: {code: 200, data: results}})
    }
  })
});

router.get('/order', function(req, res, next) {
  let userName = req.query.userName
  let movieName = req.query.movieName
  let cinemaName = req.query.cinemaName
  let price = req.query.price

  let sql = `INSERT INTO order(userName, movieName, cinemaName, price, paytime) VALUES('${userName}', '${movieName}', '${cinemaName}', '${price}', 'date_format(NOW(), '%Y-%c-%d %h:%i:%s')')`
  connection.query(sql, (errors, results) => {
    if (errors) {
      console.log(errors)
      res.json({result: {code: 2000, message: '数据库异常'}});
    } else {
      // results = JSON.parse(JSON.stringify(results))
      res.json({result: {code: 200, message: '生成订单成功'}})
    }
  })
});

module.exports = router;
