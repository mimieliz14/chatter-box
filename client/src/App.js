import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from './pages/Dashboard'
import Channel from "./pages/Channel";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/channels/:channelId" element={<Channel />} />
        </Routes>
      </div>
    </BrowserRouter>
  )

}

export default App