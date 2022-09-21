import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((resBook) => {
        console.log(resBook);
        setBooks(resBook.data);
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            setTimeout(() => {
              setCategories(resCat.data);
            }, 2000);
          })
          .catch((err) => console.log("categories err", err));
      })
      .catch((err) => console.log("books err", err));
  }, [didUpdate]);

  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log(res);
        setDidUpdate(!didUpdate);
      })
      .catch((err) => console.log(err));
  };

  if (books === null || categories === null) {
    return <Loading />;
  }

  return (
    <div className="container mb-5">
      <div className="my-2 d-flex justify-content-end">
        <Link to="/add-book" className="btn btn-primary">
          {" "}
          Kitap Ekle
        </Link>
      </div>
      <div id="tableScroll" >
        <table className="table table-striped">
          <thead>
            <tr className="table-success text-center">
              <th scope="col">KİTAP ADI</th>
              <th scope="col">YAZARI</th>
              <th scope="col">KATEGORİSİ</th>
              <th scope="col">ISBN</th>
              <th className="text-center" scope="col">
                İŞLEM
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => {
              const category = categories.find(
                (cat) => cat.id === book.categoryId
              );
              return (
                <tr className="table-primary text-center">
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{category.name}</td>
                  <td>{book.ısbn}</td>
                  <td>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        type="button"
                        className="btn btn-success rounded-3"
                      >
                        Okundu
                      </button>
                      <Link
                        to={`edit-book/${book.id}`}
                        type="button"
                        className=" mx-2 btn btn-primary rounded-3"
                      >
                        Düzelt
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger rounded-3 px-4"
                        onClick={() => deleteBook(book.id)}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    /*
<table classNameName="table-primary">...</table>
<table classNameName="table-secondary">...</table>
<table classNameName="table-success">...</table>
<table classNameName="table-danger">...</table>
<table classNameName="table-warning">...</table>
<table classNameName="table-info">...</table>
<table classNameName="table-light">...</table>
<table classNameName="table-dark">...</table>
*/
  );
};

export default ListBooks;
