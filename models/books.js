'use strict'

var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
	title: String,
	description: String,
	price: Number,
	images: String
})

var Books = mongoose.model("Books", booksSchema);
module.exports = Books;