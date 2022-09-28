import React from "react";
import Header from "../compenents/Header";
import ListBooks from "../compenents/ListBooks";
import Footer from "../compenents/Footer";

const Home = (props) => {
  return (
    <div className="App">
      <Header />
      <ListBooks />
      <Footer/>
    </div>
  );
};

export default Home;
