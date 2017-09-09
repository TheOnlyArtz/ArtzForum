const path = require('path');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, async () => {
	console.log('Started a server on port 3000');
});
