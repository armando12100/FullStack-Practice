import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [book, setBook] = useState({
    title: "",
    descr: "",
    cover: "",
    in_stock: "",
    price: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }));
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", book)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Add New Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="description" onChange={handleChange} name="descr"/>
      <input type="text" placeholder="cover picture" onChange={handleChange} name="cover"/>
      <input type="text" placeholder="stock" onChange={handleChange} name="in_stock"/>
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      <button
        className="bg-purple-300 cursor-pointer rounded-lg px-4 py-2 ml-4
       hover:text-purple-300 hover:bg-white hover:border-pink-200 
       hover:border-2" onClick={handleClick}
      >
        Add Book
      </button>
    </div>
  )
}

export default Add