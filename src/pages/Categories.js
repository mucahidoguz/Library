import React, { useEffect } from "react";
import HeaderModul from "../compenents/HeaderModul";
import Footer from "../compenents/Footer";
import ListCategories from "../compenents/ListCategories";


const CategoriesList = () => {
  useEffect(() => {
    document.title = "Library - Categories";
  }, []);

  return (
    <div className="">
      <HeaderModul />
      <ListCategories />
      <Footer />
    </div>
  );
};

export default CategoriesList;
