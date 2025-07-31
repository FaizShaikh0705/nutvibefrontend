import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import parse from 'html-react-parser';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { VscAccount } from 'react-icons/vsc';
import { SlCalender } from 'react-icons/sl';
import { LiaCommentsSolid } from 'react-icons/lia';
import { database } from '../../config/Fire';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import styles from './blog.module.scss'

var $ = require("jquery");
if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
}

const blogContent = ({ blogData: initialBlogData }) => {

    const [blogData, setBlogData] = useState(initialBlogData);

    const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
        ssr: false,
    });

    // useEffect(() => {
    //     const blogRef = database.ref("blog");
    //     const unsubscribe = blogRef.on("value", (snapshot) => {
    //         try {
    //             if (snapshot && snapshot.val()) {
    //                 const updatedBlogData = snapshot.val();
    //                 setBlogData(updatedBlogData);
    //             } else {
    //                 console.error("Firebase snapshot is empty or null");
    //             }
    //         } catch (error) {
    //             console.error("Error processing Firebase data:", error);
    //         }
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

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
                items: 1
            },
        },
    }
    return (
        <>
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
                        </Col>
                        <Col lg={8}>
                            <Row> */}
                        {Object.entries(blogData).filter((status) => status[1].postIsActiveStatus == 1).map((item) => {
                            return (
                                <Col lg={4} className={`${styles['cardh']} mb-4`}>
                                    {console.log(item)}
                                    <div className={`card item shadow h-100 ${styles['']} mb-3`}>
                                        <Image
                                            objectFit="cover"
                                            layout='responsive'
                                            height="300"
                                            width="341"
                                            alt={item[1].postImage}
                                            src={item[1].postImage}
                                        />
                                        <div className="card-body">
                                            <div className={styles['content-height']}>
                                                <h5 className={styles['cardc']}>{item[1].postTopicName}</h5>
                                                <div className={styles['blogcontent-Card-info']}>
                                                    {parse(`${item[1].postLongDetail.substring(0, 100)}...`)}
                                                </div>
                                            </div>
                                            <Link href={`/blog/${(item[1].sluginput).toLowerCase().split(" ").join("-")}`}>
                                                <Button variant="outline-dark" id="button-addon2">Learn More</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Col>
                            );
                        })}
                        {/* </Row>
                        </Col> */}
                    </Row>
                </Container>
            </section >
        </>
    )
}

export default blogContent