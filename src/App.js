import React, { useEffect } from "react";
import "./App.css";
import "./pages/Home";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import CategoriesList from "./pages/Categories";
import AddCategories from "./pages/AddCategories";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditCategory from "./pages/EditCategory";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //categories
    dispatch({ type: "FETCH_CATEGORIES_START" });
    axios
      .get(" http://localhost:3004/categories")
      .then((res) => {
        dispatch({ type: "FETCH_CATEGORIES_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_CATEGORIES_FAIL",
          payload: "Kategori Çekme Hatası !",
        });
      });
    //books
    dispatch({ type: "FETCH_BOOKS_START" });
    axios
      .get(" http://localhost:3004/books")
      .then((res) => {
        dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_BOOKS_FAIL",
          payload: "Kitap Çekme Hatası !",
        });
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        /URL ile yanına parametre ekleme. Edit sayfasına gidip kitabın ID sini
        eklesin. "/" kullanılarak birden fazla parametre verilebilir/
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/add-category" element={<AddCategories />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
