const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://harshdasila5555:Harsh%406112@cluster0.muz5vq8.mongodb.net/BooksDB");

const bookSchema = new mongoose.Schema({
    id: Number,
    name: String,
    isbn: String,
    authors: [String],
    country: String,
    number_of_pages:Number,
    publisher: String,
    release_date: String
})

const Book = mongoose.model('bookSchema',bookSchema);

module.exports= {Book}