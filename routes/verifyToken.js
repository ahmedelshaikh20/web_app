const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

var express = require('express');

var app = express();

app.use(cookieParser());

module.exports = function (req, res, next) {
  let cookie = req.cookies['token'];
  const token = cookie;
  console.log(token);
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
