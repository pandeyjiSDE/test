import expess from "express";

const app = expess()
app.use(expess.json())


let books = [
  { id: 1, title: "JS Basics", author: "Harshit", year: 2022 },
  { id: 2, title: "Node.js Guide", author: "Pandey", year: 2023 },
];


app.get("/books",(req,res) => {
    let result  = books;

    //filtering
    if(req.query.author){
        result = result.filter(b => b.author === req.query.author);
    }


    //pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || result.length;
    const start = (page-1) * limit;
    const end = start+limit;
    result = result.slice(start, end)

    res.json(result);
});


// GET single book
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});



// CREATE book
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});


// UPDATE book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.year = req.body.year || book.year;

  res.json(book);
});



// DELETE book
app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.json({ message: "Book deleted" });
});

app.listen(5000, () => console.log("🚀 Book API running on http://localhost:5000"));