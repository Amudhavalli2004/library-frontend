import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AddBook from './AddBook'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<AddBook />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
