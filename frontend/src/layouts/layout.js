import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";

function Layouts({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer/>
    </>
  );
}

export default Layouts;
