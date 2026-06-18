import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App