import React from "react";
import HomeBanner from './banner'
import Intro from './intro'
import Product from '../product'
import Testimony from "./testimony";
import Premium from "./premium";
import Special from './special';
import Intro1 from './intro1';
import Featured from "./featured";

const Home = ({ productData }) => {
  return (
    <>
      <HomeBanner />
      <Featured />
      <Intro />
      <Special />
      <Intro1 />
      <Premium />
      <Testimony />
    </>
  );
};

export default Home;
