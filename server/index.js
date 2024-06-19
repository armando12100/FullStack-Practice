import express from "express"
import mysql from "mysql"
import cors from 'cors';

const app = express();

 const PORT = 3000;

 const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"test"
 });

 // allows me to post via postman
 app.use(express.json());

 // connects frontend with backend
 app.use(cors());


 // get request for homepage
 app.get("/", (req, res) => {
    res.json("Hello from the server!")
 });

 // get request that gets all books
 app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
 });

 app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `descr`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.descr,
        req.body.cover,
        req.body.price,
    ]

    db.query(q,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been successfully created!");
    });
 });

 app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    })
 });

 app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `descr` = ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully.");
    })
 })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})