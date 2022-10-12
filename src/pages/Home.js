import React, { useEffect } from "react";
import Header from "../compenents/Header";
import ListBooks from "../compenents/ListBooks";
import Footer from "../compenents/Footer";

const Home = (props) => {
  useEffect(() => {
    document.title = "Library";
  }, []);
  return (
    <div className="App">
      <Header />
      <ListBooks />
      <Footer />
    </div>
  );
};

export default Home;
