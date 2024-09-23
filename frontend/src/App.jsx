//import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
// import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Footer from "./components/Footer";
function App() {
 // const [count, setCount] = useState(0)
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/bookmark" element={<CountryNews />} />
          <Route path="/signup" element={<SignUp/>}></Route> 
          <Route path="/login" element={<Login/>}></Route> 
        </Routes>
         <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
