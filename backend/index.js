const express = require('express');
const app = express();
const port = 8080;
const {Book}  = require('./db')
app.use(express.json());

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
        
        res.json(api_response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/v1/books',async(req,res)=>{
    const name = req.body.name;
    const isbn = req.body.isbn;
    const authors = req.body.authors;
    const number_of_pages = req.body.number_of_pages;
    const publisher = req.body.publisher;
    const country = req.body.country;
    const release_date = req.body.release_date;
    const id = parseInt(Math.random()*100);

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
    console.log(booksData)
    const api_response = {
        status_code: 200,
        status: "success",
        data: booksData
    }
    res.json({api_response});
})

app.post('/api/v1/books/:id',async(req,res)=>{
    const _id = req.query.id;
    console.log(_id);
    res.send({
        mssg: "received"
    })
})

app.listen(port,()=>{console.log(`listning on port ${port}`)})