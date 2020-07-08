if(process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path')
require('./database.js');

//settings
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes.js'))

//Static
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'),function (){
	console.log('server on port ' + app.get('port'));
})