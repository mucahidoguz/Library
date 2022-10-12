import React, { useEffect } from "react";
import AddCategoriesForm from "../compenents/AddCategoriesForm";
import Footer from "../compenents/Footer";
import HeaderModul from "../compenents/HeaderModul";

const AddCategories = (props) => {
  useEffect(() => {
    document.title = "Library - Categories - Add Categories";
  }, []);

  return (
    <div>
      <HeaderModul />
      <AddCategoriesForm />
      <Footer />
    </div>
  );
};

export default AddCategories;
