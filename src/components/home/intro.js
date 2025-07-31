import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./home.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";

const intro = () => {
  return (
    <section className={`${styles["intro-main"]} my-4`} id="about">
      <Container>
        <Row>
          <Col lg={6}>
            <h2>Use It To Believe It</h2>
              <h3>Introducing NutsvibeDry Fruits</h3>
              <br/>
            <p>
              QiRah Hair Care is a brand by Heena Style Affairs,
              a pioneering company dedicated to crafting natural hair products
              that empower customers in their journey to combat various hair problems.
              Our formulations are meticulously designed to harness the power of nature,
              providing effective solutions for healthier, more vibrant hair. At QiRah,
              we believe in the beauty of natural ingredients and the transformative impact
              they can have on your hair. Join us in embracing a holistic approach to hair
              care and rediscover the confidence that comes with nourished, revitalized locks.
              <br />
              <br />
              Heena Style Affairs our company started its journey in 2014
              with its clothing line and then established it's other brands
              Zabacc and Nutsvibe. We believe in delivering quality products to our
              customers and help them solve their problems, be it self hygiene or
              hair loss, we fix it all. We acknowledge ourselves as a fast
              growing company that will add value to customers life.
            </p>
            <br/>
            <Button
              // style={{ marginBottom: "30px" }}
              className={styles["newsbtn"]}
              href="/aboutus"
              variant="outline-dark"
              id="button-addon2"
            >
              Know More
            </Button>
          </Col>
          <Col className="offset-lg-1" lg={5}>
            <Image
              className={styles["intro-image"]}
              height="380"
              width="450"
              objectFit="contain"
              src="/images/displayimagemain.jpg"
              alt="logo_img"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default intro;
