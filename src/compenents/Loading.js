import React from "react";

const Loading = (props) => {
  return (
    <div className="Loader">
      <div className="Loading spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h1 id="Loading">Loading...</h1>
    </div>
  );
};

export default Loading;
