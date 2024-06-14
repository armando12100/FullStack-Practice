import { useEffect, useState } from "react"
import axios from 'axios'

const Books = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books")
        setBooks(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllBooks()
  }, [])

  return (
    <div>
      <h1>Mandos Bookshop</h1>
      <div>
        {books.map(book => (
          <div key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.descr}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books