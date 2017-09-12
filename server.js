const path = require('path');

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
global.r = require('rethinkdbdash')({
	db: 'Forum',
	discovery: false,
	pool: true,
	buffer: 100,
	max: 4000,
	timeout: 60,
	pingInterval: -1,
	timeoutError: 1000,
	timeoutGb: 60 * 60 * 1000,
	maxExponent: 6,
	silent: false,
	servers: [
    {host: 'localhost', port: 28015}
	],
	optionalRun: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public/css')));
//Get Routes...
app.get('/', routes.home)
app.get('/subject/:subject', routes.subject)
app.get('/subject/:subject/newPost', routes.subjectPost)
app.get('/subject/:subject/post/:post', routes.postPage)
app.get('/*', routes.notFound)

//Post Routes...
app.post('/subject/:subject/newPost', routes.subjectSubmittedPost)
app.post('/subject/:subject/post/:post/submitted', routes.commentSubmitted)
app.listen(process.env.PORT || 3000, async () => {
	console.log('Started a server on port 3000');
});
