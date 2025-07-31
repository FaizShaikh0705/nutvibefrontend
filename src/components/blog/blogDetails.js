import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './blog.module.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { database } from '../../config/Fire';


var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}

const BlogDetailsContainer = ({ blogDetailsData: initialBlogDetailsData }) => {
    const [blogDetailsData, setBlogDetailsData] = useState(initialBlogDetailsData);

    useEffect(() => {
        const blogDetailsRef = database.ref('blog');
        const handleData = (snapshot) => {
            try {
                if (snapshot && snapshot.val()) {
                    const updatedBlogDetailsData = snapshot.val();
                    setBlogDetailsData(updatedBlogDetailsData);
                } else {
                    console.error('Firebase snapshot is empty or null');
                }
            } catch (error) {
                console.error('Error processing Firebase data:', error);
            }
        };

        blogDetailsRef.on('value', handleData);

        return () => {
            blogDetailsRef.off('value', handleData);
        };
    }, []);

    const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
        ssr: false,
    });

    const state = {
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    }

    const { postTopicName, postImage, postLongDetail } = initialBlogDetailsData;


    return (
        <>
            <section className={styles['breadcrumb']}>
                <Container>
                    <Row>
                        {/* <h3>Blogs</h3>
                        <p><span>Home</span> <span>/</span><span> Blogs</span><span> / </span><span>{postTopicName}</span></p> */}
                        <Col lg={12}>
              <div className={styles['content']}>
                <h2>{postTopicName}</h2>
                <p>
              <span>
                <Link href="/">Home</Link>
              </span>{" "}
              <span>/</span>
              <span><Link href="/blog"> Blog</Link></span>
              
            </p>
              </div>
            </Col>
                    </Row>
                </Container>
            </section>
            <section className={`${styles['blogcontent-main']} my-4`}>
                <Container>
                    <Row>
                        {/* <Col lg={4} className={styles['recent-div']}>
                            <div className={styles['recent-tittle']}>
                                <h3>Recent Articles</h3>
                            </div>
                            <div className='d-flex' style={{ marginBottom: '20px' }}>
                                <Col lg={4}>
                                    <Image
                                        objectFit="cover"
                                        layout='responsive'
                                        height="120"
                                        width="161"
                                        alt="alt-img"
                                        src="/images/blog1.png"
                                    />
                                </Col>
                                <Col lg={8}>
                                    <h5 className={styles['cardc']}>The Taste of Nature In Oil</h5>
                                    <div className={styles['blogcontent-Card-info']}>
                                        Waeds cum sociis natoque penatibus et...
                                    </div>
                                </Col>
                            </div>
                            <div className='d-flex' style={{ marginBottom: '20px' }}>
                                <Col lg={4}>
                                    <Image
                                        objectFit="cover"
                                        layout='responsive'
                                        height="120"
                                        width="161"
                                        alt="alt-img"
                                        src="/images/blog1.png"
                                    />
                                </Col>
                                <Col lg={8}>
                                    <h5 className={styles['cardc']}>The Taste of Nature In Oil</h5>
                                    <div className={styles['blogcontent-Card-info']}>
                                        Waeds cum sociis natoque penatibus et...
                                    </div>
                                </Col>
                            </div>
                            <div className={styles['famous-products']}>
                                <h3>Famous Products</h3>
                            </div>
                            <OwlCarousel className='owl-theme testimonials' responsive={state.responsive} loop nav autoplay={true} autoplayTimeout={5000} dots={false}>
                                <Card className={styles['product-card']}>
                                    <Card.Img variant="top" src="/images/product1.png" />
                                    <Card.Body>
                                        <Card.Title>Organic Oil</Card.Title>
                                        <Card.Text>Rs. 119.00</Card.Text>
                                        <Button
                                            style={{ marginBottom: '5px' }}
                                            className={styles['newsbtn']}
                                            variant="outline-secondary" id="button-addon2">
                                            ADD TO CART
                                        </Button>
                                    </Card.Body>
                                </Card>
                                <Card className={styles['product-card']}>
                                    <Card.Img variant="top" src="/images/product2.png" />
                                    <Card.Body>
                                        <Card.Title>Organic Oil</Card.Title>
                                        <Card.Text>Rs. 119.00</Card.Text>
                                        <Button
                                            style={{ marginBottom: '5px' }}
                                            className={styles['newsbtn']}
                                            variant="outline-secondary" id="button-addon2">
                                            ADD TO CART
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </OwlCarousel>
                        </Col> */}
                        {/* <Col lg={12} className={`${styles['blogdetail1']}`}>
                            <h2 className='text-center mb-3'>{postTopicName}</h2>
                            </Col> */}
                            <Col lg={12}>
                            <Image
                                        className={styles['blogdetails-image']}
                                        // objectFit="containt"
                                        // layout='responsive'
                                        height={10}
                                        width={500}
                                        alt={postImage}
                                        src={postImage}
                                    />
                                    <div className={`${styles['blogdetailP']} mt-3`}>
                                        {parse(postLongDetail)}
                                    </div>
                                    
                        </Col>
                    </Row>
                </Container>
            </section>
             {/* <div className={`${styles['blogdetailflex']} row`}>
                                <div className='col-lg-6'>
                                    <Image
                                        className={styles['blogdetails-image']}
                                        objectFit="containt"
                                        layout='responsive'
                                        height="180"
                                        width="181"
                                        alt={postImage}
                                        src={postImage}
                                    />
                                </div>
                                <div className='col-lg-6'>
                                    <div className={styles['blogdetailP']}>
                                        {parse(`${postLongDetail.substring(0, 870)}`)}
                                    </div>
                                </div>
                            </div>

                            <div className={`${styles['blogdetailP2']}`}>
                                {parse(`${postLongDetail.substring(870)}`)}
                            </div> */}
        </>
    )
}

export default BlogDetailsContainer;

