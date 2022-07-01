var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
const cors = require('cors');

var indexRouter = require('./routes/index');
var testAPIRouter = require('./routes/testAPI');
var testDBRouter = require('./routes/testDB');
var assetRouter = require('./routes/assetRoutes');
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
app.use('/api/users', userRouter);

app.use(express.static('public'));
app.use('/api/assets', express.static('./uploads')); // this the one

app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(app.get('port'));
console.log('Server on port: ', app.get('port'));
