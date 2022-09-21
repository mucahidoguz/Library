import React from "react";
import "./App.css";
import "./pages/Home";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        /URL ile yanına parametre ekleme. Edit sayfasına gidip kitabın ID sini
        eklesin. "/" kullanılarak birden fazla parametre verilebilir/
        <Route path="/edit-book/:bookId" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
