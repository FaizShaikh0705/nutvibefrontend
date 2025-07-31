import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from './failure.module.scss'
const Failure = () => {
  return (
    <>
      <section className={styles['failure']}>
        <Container>
          <Row>
            <Col lg ={12}>
              <div className={styles['failure-content']}>
              <div className='justify-content-center d-flex mb-4'>
                                <Image 
                                    src='/images/cross.png'
                                    height='10'
                                    width='50'
                                />
                            </div>
                            <h2 className='justify-content-center d-flex'> Your order has been Cancelled.</h2>
                            <p className='justify-content-center d-flex mt-4'>Your Order Number is <strong> 456789123487215</strong></p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Failure
