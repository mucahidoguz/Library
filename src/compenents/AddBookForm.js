import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AddBookForm = (props) => {
  //yeni kitap eklendiğinde ana safyaya yönlendirme navigate//
  const navigate = useNavigate();

  //redux değişkenleri
  const { categoriesState } = useSelector((state) => state);
  const dispatch = useDispatch();

  // const [categories, setCategories] = useState(null);
  const [bookname, SetBookname] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [category, setCategory] = useState(null);

  /*
  useEffect(() => {
    axios
      .get("  http://localhost:3004/categories")
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  */

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bookname === "" || author === "" || category === "") {
      alert("Kitap Adı, Yazarı ve Kategori boş bırakılamaz");
      return;
    }
    const newBook = {
      id: new Date().getTime(),
      name: bookname,
      author: author,
      isbn: isbn,
      categoryId: category,
    };
    axios
      .post("http://localhost:3004/books", newBook)
      .then((res) => {
        console.log("kitap ekle res", res);
        dispatch({type:"ADD_BOOK", payload: newBook})
        SetBookname("");
        setAuthor("");
        setIsbn("");
        setCategory("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div className=" containerAddBook my-5">
      <h3 className="baslik">Lütfen Eklenecek Kitaba Ait Bilgileri Giriniz.</h3>
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
              className="form-select"
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value={""} selected>
                Lütfen Kategori Seçiniz
              </option>
              {categoriesState.categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            id="saveDelete"
            onClick={() => navigate("/")}
            type="submit"
            className="btn btn-danger mx-2"
          >
            Vazgeç
          </button>
          <button id="saveDelete" type="submit" className="btn btn-success mx-">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
