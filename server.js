const path = require('path');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//Routes...
app.get('/', routes.home)

app.listen(process.env.PORT || 3000, async () => {
	console.log('Started a server on port 3000');
});
