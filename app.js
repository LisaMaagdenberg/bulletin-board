const express = require('express');
const pg = require('pg');
const app = express();

app.use(express.static('static'));
app.set('views', './views');
app.set('view engine', 'pug');

//get home '/' page
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/messageboard', (req, res) => {
	res.render('message');
})

//server
app.listen(3000, () => {
	console.log('server has started');
});