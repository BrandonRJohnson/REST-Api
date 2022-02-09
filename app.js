const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const Books = [{ id:301, title: "Game of Thrones", author: "George R.R. Martin "}]

app.get('/books', (_, res) => {
    res.json(Books);
});

app.get('/', (_, res) => {
    res.send(Books)
});


app.post('/addbook', (req, res) => {
    const { id, title, author } = req.body;
    if ( id && title && author ) {
        users.push({ id, title, author });
        res.json(Books);
    }
});

app.put('/:id', function(req, res){
    const updateIndex = Books.map(function(book){
        return book.id;
    }).indexOf(parseInt(req.params.id));

    if(updateIndex === -1){
        //book not found, create new
        Books.push({
           id: req.params.id,
           title: req.body.name,
           author: req.body.year,
        });
        res.json({message: "New Book created.", location: "/books/" + req.params.id});
     } else {
        //Update existing book
        Books[updateIndex] = {
           id: req.params.id,
           title: req.body.name,
           author: req.body.year,
        };
        res.json({message: "Book id " + req.params.id + " updated.",
           location: "/books/" + req.params.id});
    }
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));