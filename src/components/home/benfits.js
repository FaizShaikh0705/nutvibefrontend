import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from './home.module.scss';
const Benfits = () => {
  return (
    <>
      <section className={`${styles['benfits']} py-4`}>
        <Container>
            <Row>
                <Col lg={12}>
                    <h2 className='text-center mb-4'>Benefits Of Nutsvibe Hair Oil</h2>
                </Col>
                <Col lg={6}>
                <Image
              className={`${styles["intro-image"]} `}
              height="380"
              width="450"
              objectFit="contain"
              src="/images/displayimagemain.jpg"
              alt="logo_img"
            />
                </Col>
                <Col lg={6}>
                    {/* <div className=''>
                    <ul>
                        <li>Rapid Hair Fall Control</li>
                        <li>Helps in Hair Growth</li>
                        <li>Increases Hair Length</li>
                        <li>Increases Hair Volume</li>
                        <li>Makes Hair Shiny and Smooth</li>
                        <li>Reduces Dandruff</li>
                        <li>strengthenes Scalp</li>
                        <li>Smells Good</li>
                    </ul>
                    </div> */}
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Rapid Hair Fall Control</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Helps in Hair Growth</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Increases Hair Length</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Increases Hair Volume</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Makes Hair Shiny and Smooth</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Reduces Dandruff</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Strengthen Scalp</p>
                    </div>
                    <div className={`${styles['ben-list']} box rounded-3 p-3 `}>
                      <p>Smells Good</p>
                    </div>

                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default Benfits
