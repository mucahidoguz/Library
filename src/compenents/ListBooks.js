import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const ListBooks = (props) => {
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log("categoriesState", categoriesState);
	console.log("booksState", booksState);
  const dispatch = useDispatch;

  const [filteredBooks, setFilteredBooks] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(false);
  const [silinecekKitapIsmi, setSilinecekKitapIsmi] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const filtered = booksState.books.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    console.log("filtered", filtered);
    setFilteredBooks(filtered);
  }, [booksState, searchText]);

  const deleteBook = (id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios
      .delete(`http://localhost:3004/books/${id}`)
      .then((res) => {
        console.log(res);
        dispatch({ type: "DELETE_BOOK", payload: id });
        setDidUpdate(!didUpdate);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  if (booksState.success !== true || categoriesState.success !== true || filteredBooks === null ) {
    return <Loading />;
  }

  return (
    <div className="container mb-5">
      <div className="my-2 d-flex justify-content-end">
        <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Kitap Ara"
              aria-label="Search"
            />
          </form>
          <Link to="/add-book" className="btn btn-primary">
          {" "}
          Kitap Ekle
        </Link>
      </div>
      <div id="tableScroll">
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
              <th scope="col">OKUNDU</th>
            </tr>
          </thead>

          <tbody>
            {filteredBooks.map((book) => {
              const category = categoriesState.categories.find(
                (cat) => cat.id == book.categoryId
              );
              return (
                <tr key={book.id} className="table-primary text-center">
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{category.name}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <div className="d-flex" aria-label="Basic example">
                      <Link
                        to={`/edit-book/${book.id}`}
                        type="button"
                        className="btnn btn btn-primary rounded-3 "
                      >
                        Düzelt
                      </Link>
                      <button
                        type="button"
                        className="btnn btn btn-danger rounded-3"
                        onClick={() => {
                          setShowModal(true);
                          //deleteBook(book.id)
                          setSilinecekKitap(book.id);
                          setSilinecekKitapIsmi(book.name);
                        }}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                  <td className="table-primary ">
                    <input
                      className="tick form-check"
                      type="checkbox"
                      value=""
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal === true && (
          <Modal
            aciklama="Silmek İstediğinize Emin Misiniz?"
            title={silinecekKitapIsmi}
            onConfirm={() => deleteBook(silinecekKitap)}
            onCancel={() => setShowModal(false)}
          />
        )}
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
