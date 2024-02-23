import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './home.css'
import moment from 'moment'

const Home = () => {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [cp, setCP] = useState(1)
  const recordpage = 5
  const lindex = cp * recordpage
  const findex = lindex - recordpage
  const record = books.slice(findex, lindex)

  const npage = Math.ceil(books.length / recordpage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  useEffect(() => {
    getBooks()
  }, [search])

  const getBooks = () => {
    axios
      .get('/getbooks')
      .then((response) => {
        // Format dates before setting state
        let filteredBooks = response.data
        if (search) {
          filteredBooks = filteredBooks.filter(
            (book) =>
              book.title.toLowerCase().includes(search.toLowerCase()) ||
              book.author.toLowerCase().includes(search.toLowerCase()) ||
              book.genre.toLowerCase().includes(search.toLowerCase()) ||
              book.publishedOn.includes(search)
          )
        }
        setBooks(filteredBooks)
        setCP(1)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  function prePage() {
    if (cp !== findex) {
      setCP(cp - 1)
    }
  }

  function nextPage() {
    if (cp !== lindex) {
      setCP(cp + 1)
    }
  }

  function changeCP(id) {
    setCP(id)
  }

  return (
    <>
      <div className="home">
        <div className="add">
          <Link to="/add" className="link">
            <h1>Add Books</h1>
          </Link>
        </div>

        <div className="filters">
          <div className="total">
            Total Number of books:
            <span>{books.length}</span>
          </div>
          <input
            type="text"
            name="search"
            placeholder="Search by Title, Author, or Published On..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bookContainer">
          <div className="books">
            <h1>Books</h1>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Published On</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((val, key) => {
                    const formattedDate = moment(val.publishedOn).format(
                      'YYYY-MM-DD'
                    )
                    return (
                      <tr key={key}>
                        <td>{val.title}</td>
                        <td>{val.author}</td>
                        <td>{val.genre}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <nav className='navbar'>
              <ul className="pagination">
                <li className="page-item">
                  <button href="" className="page-link" onClick={prePage}>
                    Prev
                  </button>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item${cp === n ? 'active' : ''}`}
                    key={i}
                  >
                    <button className="page-link" onClick={() => changeCP(n)}>
                      {n}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
