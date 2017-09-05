'use strict'
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//APIs
var mongoose = require('mongoose');

//mongo lab db
mongoose.connect('mongodb://testUser:lcelwair@ds121674.mlab.com:21674/bookshopdb');

//LOCAL DB
//mongoose.connect('mongodb://localhost:27017/bookshop')
var Books = require('./models/books.js')

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'));
//SET UP USER SESSION
app.use(session({
	secret: 'mySecretString',
	saveUninitialized: false,
	resave: false,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
	store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

//SAVE TO SESSION
app.post('/cart', function(req, res){
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if(err) throw err;
		res.json(req.session.cart);
	})
})

//GET SESSION CART API
app.get('/cart', function(req, res){
	if(typeof req.session.cart !== 'undefined'){
		res.json(req.session.cart)
	}
})
//END SESSION SET UP

// POST BOOKS
app.post('/books', function(req, res){
	var books = req.body;

	Books.create(books, function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	})
});

//GET BOOKS
app.get('/books', function(req, res){
	Books.find(function(err, books){
		if(err){
			throw err;
		}
		res.json(books)
	})
});

//DELETE BOOKS
app.delete('/books/:_id', function(req, res){
	var query = {_id: req.params._id};

	Books.remove(query, function(err, books){
		if(err) throw err;

		res.json(books)
	})	
});

//UPDATE BOOK
app.put('/books/:_id', function(req, res){
	var book = req.body;
	var query = req.params._id;

	var update ={
		'$set':{
			title: book.title,
			description: book.description,
			image: book.image,
			price: book.price
		}
	};

	var options = {new: true}

	Books.findOneAndUpdate(query, update, options, function(err, books){
		if(err) throw err;
		res.json(books)
	})
});

//GET BOOKS IMAGES

app.get('/images', function(req, res){
	const imgFolder = __dirname + '/public/images/';
	//REQUIRE FILE SYSTEM
	const fs = require('fs');
	//READ ALL FILES IN DIRECTORY
	fs.readdir(imgFolder, function(err, files){
		if(err) return console.error(err);
		const filesArr = files.map(file => {return {name: file}});
		res.json(filesArr);
	})
})
//END APIs

app.listen(3001, function(err){
	if(err){
		return console.log(err)
	}
	console.log('server running on localhost:3001')
});
