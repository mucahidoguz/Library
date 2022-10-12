import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../compenents/Footer";
import HeaderModul from "../compenents/HeaderModul";
import Loading from "../compenents/Loading";
import Modal from "../compenents/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditBook = (props) => {
  useEffect(() => {
    document.title = "Library - Edit Book";
  }, []);
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  const params = useParams();
  const navigate = useNavigate();
  console.log("params", params);

  const [bookname, SetBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(booksState.books, params.bookId);
    const searchBook = booksState.books.find(
      (item) => item.id == params.bookId
    );
    //Edit sayafası yenilendiğinde anasayfa yönlendirmesi//
    if (searchBook === undefined) {
      navigate("/");
      return;
      // axios
      //   .get(`http://localhost:3004/books/${params.bookId}`)
      //   .then((res) => {
      //     console.log(res.data);
      //     SetBookname(res.data.name);
      //     setAuthor(res.data.author);
      //     setIsbn(res.data.isbn);
      //     setCategory(res.data.categoryId);
      //     axios
      //       .get("http://localhost:3004/categories")
      //       .then((res) => {
      //         setCategories(res.data);
      //       })
      //       .catch((err) => console.log("categories error", err));
      //   })
      //   .catch((err) => console.log("books error", err));
    }
    document.title = `Library - Edit Book - ${searchBook.name}`;

    console.log(searchBook);
    SetBookname(searchBook.name);
    setAuthor(searchBook.author);
    setIsbn(searchBook.isbn);
    setCategory(searchBook.categoryId);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const editBook = () => {
    if (bookname === "" || author === "" || category === "") {
      alert("Kitap Adı, Yazarı ve Kategori boş bırakılamaz");
      return;
    }
    const updatedBook = {
      id: params.bookId,
      name: bookname,
      author: author,
      categoryId: category,
      isbn: isbn,
    };
    console.log("updatedBook", updatedBook);
    axios
      .put(`http://localhost:3004/books/${params.bookId}`, updatedBook)
      .then((res) => {
        console.log(res);
        dispatch({ type: "EDIT_BOOK", payload: updatedBook });
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => console.log("edit error", err));
  };

  if (categoriesState.success !== true || booksState.success !== true) {
    return <Loading />;
  }

  return (
    <div>
      <HeaderModul />;
      <div className=" containerEditBook my-4">
        <h3 className="baslik">
          Lütfen Güncellenecek Kitaba Ait Bilgileri Giriniz.
        </h3>
        <form onSubmit={handleSubmit} className="mx-5">
          <div className="row mt-5">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kitap Adı"
                value={bookname}
                onChange={(event) => SetBookname(event.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Yazarı"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="ISBN"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />
            </div>
            <div className="col">
              <select
                class="form-select"
                onChange={(event) => setCategory(event.target.value)}
              >
                <option value={""} selected>
                  Lütfen Kategori Seçiniz
                </option>
                {categoriesState.categories.map((cat) => {
                  return <option value={cat.id}>{cat.name}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <button
              id="saveDelete"
              onClick={() => navigate("/")}
              type="submit"
              className="btn btn-danger mx-2"
            >
              Vazgeç
            </button>
            <button id="saveDelete" type="submit" className="btn btn-success">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      {showModal === true && (
        <Modal
          aciklama="Kitabı Güncellemek İstediğinize Emin Misiniz ?"
          title={`${bookname}`}
          onCancel={() => setShowModal(false)}
          onConfirm={() => editBook()}
        />
      )}
      <Footer />
    </div>
  );
};

export default EditBook;
