import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete("http://localhost:3000/books/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="font-bold pb-10 pt-4 pl-4 text-center">Mandos Bookshop</h1>
      <div className="pl-4 flex justify-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="border-2 border-black flex flex-col text-center px-4 mr-8 rounded-lg mb-10"
          >
            {book.cover && <img src={book.cover} alt="" />}
            <h2 className="font-bold pb-4">{book.title}</h2>
            <p className="pb-4">{book.descr}</p>
            <p className="pb-4">{book.price}</p>

            <div className="pb-4 pr-3">
              <button
                className="bg-purple-300 cursor-pointer rounded-lg px-4 py-2 ml-4
       hover:text-purple-300 hover:bg-white hover:border-pink-200 
       hover:border-2 sm:mb-3" 
              >
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
              <button
                className="bg-purple-300 cursor-pointer rounded-lg px-4 py-2 ml-4
       hover:text-purple-300 hover:bg-white hover:border-pink-200 
       hover:border-2" onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-purple-300 cursor-pointer rounded-lg px-4 py-2 ml-4
       hover:text-purple-300 hover:bg-white hover:border-pink-200 
       hover:border-2"
        >
          <Link to="/add">Add New Book</Link>
        </button>
      </div>
    </div>
  );
};

export default Books;
