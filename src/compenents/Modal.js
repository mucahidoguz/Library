import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, title, aciklama } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "540px",
          height: "250px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          paddingButtom: "100px",
          boxShadow: "0px 1px 20px red",
        }}
      >
        <h2 className="text-center mx-5 my-2 py-2">{aciklama}</h2>
        <h3 className="titleClass text-center ">{title}</h3>
        <div className="my-3 d-flex justify-content-center">
          <button onClick={onCancel} className="btn btn-danger mx-3">
            Vazgeç
          </button>
          <button onClick={onConfirm} className="btn btn-success px-3">
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
