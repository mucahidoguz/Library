import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";

const ListCategories = () => {
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log("CatState", categoriesState);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [deleteCategoryName, setDeleteCategoryName] = useState("");
  const dispatch = useDispatch();

  const deleteCategorys = (id) => {
    axios
      .delete(`http://localhost:3004/categories/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        const booksHasCategory = booksState.books.filter(
          (item) => item.categoryId == id
        );
        console.log("booksHasCat", booksHasCategory);
        booksHasCategory.map((item) =>
          dispatch({ type: "DELETE_BOOK", payload: item.id })
        );
      })

      .catch((err) => console.log("Delete category err", err));
  };

  if (categoriesState.success !== true) {
    return <Loading />;
  }

  return (
    <div className="containerCategory">
      <div className="my-4 d-flex justify-content-center">
        <Link to="/add-category" className="btn btn-primary">
          {" "}
          Kategori Ekle
        </Link>
      </div>
      <div id="tableScrollCategory">
        <table className="table table-striped my-1">
          <thead>
            <tr className=" text-center">
              <th>KATEGORİ ADI</th>
              <th>İŞLEM</th>
            </tr>
          </thead>

          <tbody>
            {categoriesState.categories.map((category) => {
              return (
                <tr key={category.id} className="table-primary text-center">
                  <td>{category.name}</td>

                  <td className="text-center">
                    <div className="" aria-label="Basic example">
                      <Link
                        to={`/edit-category/${category.id}`}
                        type="button"
                        className="btnn btn btn-primary rounded-3 "
                      >
                        Düzelt
                      </Link>
                      <button
                        type="button"
                        className="btnn btn btn-danger rounded-3"
                        onClick={() => {
                          setShowDeleteModal(true);
                          //deleteCategory(category.id)
                          setDeleteCategory(category.id);
                          setDeleteCategoryName(category.name);
                        }}
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                  <td className="table-primary "></td>
                </tr>
              );
            })}
          </tbody>
        </table>{" "}
        {showDeleteModal === true && (
          <Modal
            aciklama="Silmek İstediğinize Emin Misiniz?"
            title={deleteCategoryName}
            onConfirm={() => deleteCategorys(deleteCategory)}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ListCategories;
