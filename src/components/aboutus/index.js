import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "./about.module.scss";
import Banner from '../home/banner'
import Intro from '../home/intro'
import Special from '../home/special'
import Premium from '../home/premium'
import Intro1 from '../home/intro1'
import Testimony from '../home/testimony'
import Featured from '../home/featured'
const Index = () => {
  return (
    <>
      <Banner />
      <Featured />
      <Intro />
      <Special />
      <Intro1 />
      <Premium />
      <Testimony />
    </>
  );
};

export default Index;
