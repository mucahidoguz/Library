import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const AddCategoriesForm = (props) => {
  const navigate = useNavigate();
  const [categoryName, SetCategoryName] = useState("");
  const { categoriesState } = useSelector((state) => state);
  const dispacth = useDispatch();

  console.log(categoriesState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryName === "") {
      alert("Kategori ismi boş bırakılamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      /*toLowerCase tüm yazıları küçük harfe çevirilir. 
      Böylece eklenecek kategoride küçük büyük harf hatasından undefind vermesin*/
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (hasCategory !== undefined) {
      alert("Bu kategori kayıtlıdır.");
      return;
    }
    const newCategory = {
      id: new Date().getTime(),
      // toUpperCase + substring yapılarak baş harflerinin otomatik büyük yapılması sağlanmıştır.
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    };
    axios
      .post("http://localhost:3004/categories", newCategory)
      .then((res) => {
        console.log(res.data);
        dispacth({ type: "ADD_CATEGORY", payload: newCategory });
        navigate("/categories");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" containerAddBook my-4">
      <form onSubmit={handleSubmit}>
        <h3 className="baslik">Lütfen Eklenecek Kategorinin Adını Yazınız.</h3>

        <div className="col d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50 my-4 "
            placeholder="Kategori Adı"
            value={categoryName}
            onChange={(event) => SetCategoryName(event.target.value)}
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

          <button id="saveDelete" type="submit" className="btn btn-success mx-">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoriesForm;
