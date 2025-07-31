import React from 'react'
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./home.module.scss";

const Offer = () => {
  return (
    <>
      <section className={`${styles['offer']} `}>
        {/* <Container fluid>
            <Row>
                <Col lg={12}> */}
                    {/* <img
                        src='/images/offerbanner.jpg'
                        alt='demo'
                    /> */}
                {/* </Col>
            </Row>
        </Container> */}
      </section>
    </>
  )
}

export default Offer
