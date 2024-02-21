import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './home.css'

const Home = () => {
  const [books, setBooks] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    page: 1,
  })

  useEffect(() => {
    getBooks()
  }, [filters])

  const getBooks = () => {
    axios
      .get('http://localhost:8081/getbooks', { params: filters })
      .then((response) => {
        // Format dates before setting state
        const formattedBooks = response.data.map((book) => {
          return {
            ...book,
            // Assuming the date is stored as a string
            publishedOn: new Date(book.publishedOn).toLocaleDateString('en-GB'),
          }
        })
        setBooks(formattedBooks)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value, page: 1 })
  }

  const handleNextPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }))
  }

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page - 1,
      }))
    }
  }

  return (
    <div className="home">
      <div className="add">
        <Link to="/add" className="link">
          <h1>Add Books</h1>
        </Link>
      </div>
      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search by Title, Author, or Published On..."
          onChange={handleChange}
        />
      </div>
      <div className='bookContainer'>
        <div className="books">
          <h1>Books</h1>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Book Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Published On</th>
                </tr>
              </thead>
              <tbody>
                {books.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.id}</td>
                      <td>{val.title}</td>
                      <td>{val.author}</td>
                      <td>{val.genre}</td>
                      <td>{val.publishedOn}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="btnsDiv">
            <button
              className="prevPage"
              onClick={handlePrevPage}
              disabled={filters.page === 1}
            >
              Previous
            </button>

            <button onClick={handleNextPage}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
