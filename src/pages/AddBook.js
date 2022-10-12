import React, {useEffect} from "react";
import HeaderModul from "../compenents/HeaderModul";
import "../App.css";
import AddBookForm from "../compenents/AddBookForm";
import Footer from "../compenents/Footer";


const AddBook = (props) => {
useEffect(()=>{
 document.title="Library - Add Book"
},[])

  return (
    <div>
      <HeaderModul />
      <AddBookForm />
      <Footer />
    </div>
  );
};

export default AddBook;
