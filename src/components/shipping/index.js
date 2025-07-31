import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./shipping.module.scss";
const Index = () => {
  return (
    <>
      <section className={`${styles["breadcrum"]}`}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <p>
                  <span>
                    <Link href="/#">Home</Link>
                  </span>{" "}
                  <span>/</span>
                  <span> Shipping Policy</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles["refund"]} mb-4`}>
        <Container>
          <Row>
            <Col lg={12}>
              <h3 className="text-center my-5">SHIPPING POLICY</h3>
              <ul>
                <li>Shipping Charges vary based on location across India.</li>
                <li>
                  Cash On Delivery Available
                </li>
                <li>All products are quality checked before shipping</li>
                <li>
                  All products are dispatched in Secure Box to
                  ensure the product reaches you safely
                </li>
                <li>
                  All orders placed between Monday to Friday are processed
                  immediately
                </li>
                <li>
                  Orders placed on Saturday & Sunday are processed on Monday
                </li>
                <li>
                  Our logistic
                  partners are only allowed to deliver sealed & packed products.
                  Our logistic partners are not authorized to do open
                  deliveries.
                </li>
                <li>Estimated Delivery time is 3-8 Business Days</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
