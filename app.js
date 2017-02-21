const express = require('express');
const app = express();
const connectionString = 'postgres://' + 
	process.env.POSTGRES_USER + ':' + 
	process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
const Sequelize = require('sequelize')
const sequelize = new Sequelize(connectionString)
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));  
app.use(bodyParser.json());
app.set('views', './views');
app.set('view engine', 'pug');

//set table messages
var Message = sequelize.define('message', {
	title: Sequelize.STRING,
	body: Sequelize.STRING
});

//get home '/' page
app.get('/', (req, res) => {
	res.render('index');
});

//get messageboard page
app.get('/messageboard', (req, res) => {
	Message.findAll()
	.then(function(result){
		const allMessages = {allTheMessages: result}
		res.render('message', allMessages)
	})
})

app.post('/messageboard', (req, res) => {
	Message.create({
		title: req.body.title,
		body: req.body.message
	})
	.then(function(){
		res.redirect('/messageboard')
	})
})

//server
sequelize.sync()
	.then(function(){
		app.listen(3000, () => {
			console.log('server has started');
		});
	})
