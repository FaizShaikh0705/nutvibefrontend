import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import styles from './home.module.scss'
import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';

const ingredient = () => {
    return (
        <section className={`${styles['ingredient-main']} my-4`}>
            <Container fluid>
                <Row className='text-center'>
                <h2 className='mb-4'>Effective Hair Oil</h2>
                    <div className='col-xl-3 col-12'>
                        
                        <Row>
                        <div className={`${styles['ingredient-side-content']} col-xl-12 col-md-6`} style={{ padding: '0px 30px'}}>
                                <Image
                                    height="20"
                                    width="30"
                                    objectFit="contain"
                                    src="/images/nochemicals.png"
                                    alt="logo_img" />
                                <h4>No Chemicals</h4>
                                <p>Embrace chemical-free hair care with our formula, designed to give your hair the gentle treatment it deserves, without harsh chemicals.</p>
                            </div>

                            <div className={`${styles['']} col-xl-12 col-md-6`} style={{ padding: '0px 30px'}}>
                                <Image
                                    height="20"
                                    width="30"
                                    objectFit="contain"
                                    src="/images/Herbal.png"
                                    alt="logo_img" />
                                <h4>Herbal</h4>
                                <p>Experience the purity of nature with our herbal blend, crafted from natural ingredients for healthier hair.</p>
                            </div>
                        </Row>
                    </div>
                    <div className='col-xl-6 col-12' >
                        <div>
                            <Image
                                className={styles['ingredient-image']}
                                height="380"
                                width="500"
                                objectFit="contain"
                                src="/images/productwithingredientmain.png"
                                alt="logo_img" />
                        </div>
                    </div>
                    <div className='col-xl-3 col-12'>
                        <Row>
                            <div className={`${styles['ingredient-side-content']} col-xl-12 col-md-6`} style={{ padding: '0px 30px'}}>
                                <Image
                                    height="20"
                                    width="30"
                                    objectFit="contain"
                                    src="/images/noperfume.png"
                                    alt="logo_img" />
                                <h4>No Perfumes</h4>
                                <p>Enjoy the authentic scent of nature with our fragrance-free formula, providing pure nourishment without added perfumes.</p>
                            </div>
                            <div className={`${styles['']} col-xl-12 col-md-6`} style={{ padding: '0px 30px'}}>
                                <Image
                                    height="20"
                                    width="30"
                                    objectFit="contain"
                                    src="/images/naturalicon.png"
                                    alt="logo_img" />
                                <h4>Natural</h4>
                                <p>Unlock your hair's true potential with our entirely natural formula, offering the care you deserve.</p>
                            </div>
                        </Row>
                    </div>
                </Row>
            </Container>
        </section>
    )
}

export default ingredient