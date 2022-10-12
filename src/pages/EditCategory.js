import React, { useEffect, useState } from "react";
import HeaderModul from "../compenents/HeaderModul";
import Footer from "../compenents/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../compenents/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "../compenents/Modal";

const EditCategory = (props) => {
  const { categoryId } = useParams();
  console.log(categoryId);

  /*
iki türlü kullanımı vardır. Bu şekilde de yazılabilir.
const params= useParams();
  console.log(params.categoryId);
*/
  const [category, setCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState();
  const [allCategories, setAllCategories] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:3004/categories`)
      .then((res) => {
        console.log(res.data);
        setAllCategories(res.data);
        const myCategory = res.data.find((item) => item.id == categoryId);
        setCategory(myCategory);
        setNewCategoryName(myCategory.name);
      })
      .catch((err) => console.log("editCatGetErr", err));
  }, []);
  const handleEditCat = (event) => {
    event.preventDefault();
    if (newCategoryName === "") {
      alert("Kategori ismi boş bırakılamaz.");
      return;
    }
    const hasCategory = allCategories.find(
      (item) => item.name.toLowerCase() === newCategoryName.toLowerCase()
    );
    console.log("hasCategory", hasCategory);
    if (hasCategory !== undefined) {
      alert("Kategori ismi veritabanında mevcut");
      return;
    }
    const newCategory = {
      ...category,
      name: newCategoryName,
    };
    axios
      .put(`http://localhost:3004/categories/${category.id}`, newCategory)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "EDIT_CATEORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log("editCatPutErr", err));
  };

  if (allCategories === null) {
    return <Loading />;
  }
  return (
    <div>
      <HeaderModul />
      <div className=" containerAddBook my-4">
        <form onSubmit={handleEditCat}>
          <h3 className="baslik">
            Lütfen Güncellenecek Kategorinin Bilgilerini Yazınız.
          </h3>

          <div className="col d-flex justify-content-center">
            <input
              type="text"
              className="form-control w-50 my-4 "
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              placeholder="Kategori Adı"
            />
          </div>

          <div className="d-flex justify-content-center my-2">
            <button
              id="saveDelete"
              onClick={() => navigate("/categories")}
              type="submit"
              className="btn btn-danger mx-2"
            >
              Vazgeç
            </button>

            <button
              id="saveDelete"
              type="submit"
              className="btn btn-success mx-"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditCategory;
