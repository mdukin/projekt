const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.sendFile('C:/5sem/projekt/me/index.html')
});

app.get('/create', (req, res, next) => {
  res.sendFile('C:/5sem/projekt/me/create.html')
});
app.get('/join', (req, res, next) => {
  res.sendFile('C:/5sem/projekt/me/join.html')
});


const server = app.listen(3000);

