import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import styles from "./refund.module.scss";
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
                  <span> Refund Policy</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles["refund"]} my-5`}>
        <Container>
          <Row>
            <Col lg={12}>
              <h3 className="text-center my-5">REFUND POLICY</h3>
              <h5 className=" mb-5">
               This item is non-returnable due to the nature of the product
              </h5>
              <div className="d-flex">
                {/* <Image 
                src="/images/return.png"
                alt="return1"
               height='10'
               width='80'
                /> */}
                <p className={`${styles['para']} `}> For a Damaged, Defective, Wrong or expired item, you can request a refund or replacement within 5 days of delivery</p>
              </div>
              <div className="d-flex">
                {/* <Image 
                src="/images/return1.png"
                alt="return1"
               height='10'
               width='70'
                /> */}
                <p className={`${styles['para']} `}> You Will need to share the image of the item  and its defects through your Orders for a refund/replacement</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
