import React from "react";
import PropTypes from "prop-types";
import Footer from "./footer";
import Header from "./header";

const MasterLayout = ({ children }) => {

  return (
    <>
      <Header/>
         <main className="main-container">{children}</main>
      <Footer/>
    </>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MasterLayout;
