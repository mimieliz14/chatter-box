import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (

    <BrowserRouter>
    <Header/>
      <div className="App">
      
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;