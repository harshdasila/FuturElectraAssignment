const express = require('express');
const app = express();
const cors = require('cors')
const port = 8080;
const {Book}  = require('./db')
app.use(express.json());
app.use(cors());

app.get("/api/external-books", async (req, res) => {
    
    try {
        const bookName = (req.query.name);
        const response = await fetch(`https://anapioficeandfire.com/api/books?name=${bookName}`);
        const dataJSON = await response.json();
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        
        const filteredData = dataJSON.length === 0 ? [] : dataJSON.map(book => ({
            name: book.name,
            isbn: book.isbn,
            authors: book.authors,
            number_of_pages: book.numberOfPages,
            publisher: book.publisher,
            country: book.country,
            release_date: book.released.slice(0,10)
        }));

        const api_response = {
            status_code: 200,
            status: "success",
            data: filteredData
        }
        
        res.send(api_response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/v1/books',async(req,res)=>{
    const name = req.body.bookName;
    const isbn = req.body.isbn;
    const authors = req.body.authors;
    const number_of_pages = req.body.numberOfPages;
    const publisher = req.body.publishers;
    const country = req.body.country;
    const release_date = req.body.releaseDate;
    // const id = parseInt(Math.random()*100);

    const inputData = {
        name,
        isbn,
        authors,
        number_of_pages,
        publisher,
        country,
        release_date
    }

    await Book.create(inputData)
      
    const api_response = {
        status_code: 201,
        status: "success",
        data: [
            {
                "book": {
                    name,
                    isbn,
                    authors,
                    number_of_pages,
                    publisher,
                    country,
                    release_date
                }
            }
        ]
    }
   
    res.send(api_response)
})

app.get('/api/v1/books',async (req,res)=>{
    const booksData = await Book.find({});
    const api_response = {
        status_code: 200,
        status: "success",
        data: booksData
    }
    res.send(api_response);
})

app.post('/api/v1/books/:id/update', async (req, res) => {
    try {
        const ID = req.params.id;
        const {
            name,
            isbn,
            authors,
            number_of_pages,
            publisher,
            country,
            release_date
        } = req.body;

        const inputData = {
            name,
            isbn,
            authors,
            number_of_pages,
            publisher,
            country,
            release_date
        };

        const data = await Book.findOneAndUpdate(
            { _id: ID },
            { $set: inputData },
            { new: true } 
        );

        if (!data) {
            res.status(404).json({ message: 'Book not found' });
            return; 
        }

        const api_response = {
            status_code: 200,
            status: 'success',
            message: `The Book ${data.name} has been updated successfully`,
            data: data
        };

        res.status(200).json(api_response);
    } catch (error) {
        if (error.name === 'CastError') {
            // Handle invalid ID format
            res.status(400).json({ message: 'Invalid book ID format' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

app.delete('/api/v1/books/:id',async(req,res)=>{
    
    try{
        const ID = req.params.id;
        const deleteBook = await Book.findByIdAndDelete(ID);
        // .log(deleteBook)console
        if(deleteBook){
            res.send({
                status_code: 200,
                status: 'success',
                message: `The Book ${deleteBook.name} has been deleted successfully`,
                data: []
            })
        }
        else{
            res.send({
                mssg: "NOT DELETED"
            })
        }
    }
    catch (error) {
        if (error.name === 'CastError') {
            // Handle invalid ID format
            res.status(400).json({ message: 'Invalid book ID format' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
})

app.get('/api/v1/books/:id', async(req,res)=>{
    try{
        const ID = req.params.id;
        const book = await Book.findOne({_id: ID});
        const api_response = {
        status_code: 200,
        status: "success",
        data: book
    }
    res.send(api_response);
    }
    catch (error) {
        if (error.name === 'CastError') {
            // Handle invalid ID format
            res.status(400).json({ message: 'Invalid book ID format' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
})


app.listen(port,()=>{console.log(`listning on port ${port}`)})