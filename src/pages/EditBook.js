import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../compenents/Footer";
import Header from "../compenents/Header";
import Loading from "../compenents/Loading";
import Modal from "../compenents/Modal";

const EditBook = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  console.log("params", params);

  const [bookname, SetBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/books/${params.bookId}`)
      .then((res) => {
        console.log(res.data);
        SetBookname(res.data.name);
        setAuthor(res.data.author);
        setIsbn(res.data.isbn);
        setCategory(res.data.categoryId);
        axios
          .get("http://localhost:3004/categories")
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => console.log("categories error", err));
      })
      .catch((err) => console.log("books error", err));
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
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => console.log("edit error", err));
  };

  if (categories === null) {
    return <Loading />;
  }

  return (
    <div>
      <Header />;
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
                {categories.map((cat) => {
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
