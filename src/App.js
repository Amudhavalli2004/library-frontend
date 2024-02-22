import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import AddBook from './AddBook'
import axios from 'axios'

axios.defaults.baseURL = 'https://2dcd-13-48-67-35.ngrok-free.app'
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'ngrok-skip-browser-warning': '69420',
}

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
