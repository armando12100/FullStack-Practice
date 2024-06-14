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
    const q = "INSERT INTO books (`title`, `descr`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.descr,
        req.body.cover
    ]

    db.query(q,[values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been successfully created!");
    });
 });

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`)
})