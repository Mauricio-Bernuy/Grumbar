var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var testDBRouter = require('./routes/testDB');
var imageRouter = require('./routes/imageRoutes');

var config = require('./config');

var app = express();

app.set('port', process.env.PORT || 9000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter);
app.use('/testDB', testDBRouter);
app.use('/api/images', imageRouter);

app.use(express.static('public'));
app.use('/api/assets', express.static('./uploads'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(app.get('port'));
console.log('Server on port: ', app.get('port'));
