import React from "react";
import Header from "../compenents/Header";
import "../App.css";
import AddBookForm from "../compenents/AddBookForm";
import Footer from "../compenents/Footer";

const AddBook = (props) => {
  return (
    <div>
      <Header />
      <AddBookForm />
      <Footer />
    </div>
  );
};

export default AddBook;
