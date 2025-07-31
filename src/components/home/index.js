import React from "react";
import HomeBanner from './banner'
import Intro from './intro'
import Product from '../product'
import Offer from './offer'
import Ingredient from "./ingredient";
import Benfits from "./benfits";
import Testimony from "./testimony";
import Reel from './reel';

const Home = ({ productData }) => {
  return (
    <>
      <HomeBanner />
      <Intro />
      <Product productData={productData} />
      {/* <Offer /> */}
      <Ingredient />
      <Benfits />
      <Testimony />
      <Reel />
    </>
  );
};

export default Home;
