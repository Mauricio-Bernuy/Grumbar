var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
const cors = require('cors');

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var testDBRouter = require('./routes/testDB');
var assetRouter = require('./routes/assetRoutes');
var mapRouter = require('./routes/mapRoutes');
var userRouter = require('./routes/userRoutes');

var config = require('./config');

var app = express();
app.use(cors());

app.set('port', process.env.PORT || 9000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRouter);
//app.use('/testAPI', testAPIRouter);
app.use('/api/testDB', testDBRouter);
app.use('/api/assets', assetRouter);
app.use('/api/maps', mapRouter);
app.use('/api/users', userRouter);

app.use(express.static('public'));
app.use('/api/assets', express.static('./files/assets')); // this the one

app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, '../files/assets')));

app.listen(app.get('port'));
console.log('Server on port: ', app.get('port'));
