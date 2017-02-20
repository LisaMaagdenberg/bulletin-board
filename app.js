const express = require('express');
const app = express();
const connectionString = 'postgres://' + 
	process.env.POSTGRES_USER + ':' + 
	process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';
const Sequelize = require('sequelize')
const sequelize = new Sequelize(connectionString)

app.use(express.static('static'));
app.set('views', './views');
app.set('view engine', 'pug');

//set table messages
var Message = sequelize.define('message', {
	title: Sequelize.STRING,
	body: Sequelize.STRING
});

Message.create({
	title: 'testtest',
	body: 'fjklaj gjrganv ajoi rhg vawkhfoiawjev nkl.'
});

//get home '/' page
app.get('/', (req, res) => {
	res.render('index');
});

//get messageboard page
app.get('/messageboard', (req, res) => {
	Message.findAll()
	.then(function(result){
		res.render('message', result)
	})
	// pg.connect(connectionString, (err, client, done) => {
	// 	client.query(`select title, body from messages order by id desc`, (err, result) => {
	// 		console.log(`${result.rowCount}`);
	// 		var titles = []
	// 		var bodies = []
	// 		for (var i = 0; i < result.rowCount; i++) {
	// 			console.log(`the title of ${i+1} is ${result.rows[i].title}`)
	// 			titles.push(result.rows[i].title)
	// 			console.log(`the body of ${i+1} is ${result.rows[i].body}`)
	// 			bodies.push(result.rows[i].body)
	// 		}
	// 		console.log(titles)
	// 		console.log(bodies)
	// 		var showMessageTitle = {allTitles:titles}
	// 		var showMessageBody = {allBodies:bodies}
	// 		done();
	// 		pg.end();
	// 		res.render('message', showMessageTitle);
	// 	})
	// })
	
})

//server
sequelize.sync({force: true})
	.then(function(){
		app.listen(3000, () => {
			console.log('server has started');
		});
	})
