import React, { useState } from 'react'
import './addBook.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    title: '',
    author: '',
    genre: '',
    publishedOn: '',
  })
  const handleInput = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    console.log(values)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8081/addBook', values)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="body">
      <div className="container">
        <form className="form" action="" onSubmit={handleSubmit}>
          <h1>Add a book</h1>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInput}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleInput}
          />
          <select name="genre" onChange={handleInput}>
            <option value="">Select Genre</option>
            <option value="mystery">Mystery</option>
            <option value="fiction">Fiction</option>
            <option value="science fiction">Science Fiction</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
            <option value="comic">Comic</option>
          </select>
          <input
            type="date"
            name="publishedOn"
            placeholder="Published Date"
            onChange={handleInput}
          />
          <button className='submitBtn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddBook
