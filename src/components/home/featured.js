import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./home.module.scss";
import Link from "next/link";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { motion } from "framer-motion";



const products = [
    {
        name: "California Almonds",
        category: "Nuts",
        weight: "250 grams",
        price: 525,
        image: "/images/almonds.jpg",
    },
    {
        name: "dryfigs",
        category: "Dry Fruit",
        weight: "250 grams",
        price: 180,
        image: "/images/dryfigs.jpg",
    },
    {
        name: "Walnut Kernels",
        category: "Nuts",
        weight: "250 grams",
        price: 250,
        image: "/images/walnuts.jpg",
    },
    {
        name: "kishmis",
        category: "Dry Fruit",
        weight: "250 grams",
        price: 180,
        image: "/images/kishmis.jpg",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};


const featured = () => {
    return (
        <section className={styles.productsec} style={{ padding: "50px 0" }}>
            <Container>
                <h2 className={` ${styles.ptitle} text-start mb-4 fw-bold`}>Featured Product's</h2>
                <h5 className={`${styles.subtitle} text-start mb-4 fw-bold`}>Top - Featured Product's</h5>
                <Row>
                    {products.map((product, index) => (
                        <Col xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex align-items-stretch">
                            <motion.div
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="w-100"
                            >
                                <Card className={styles.card}>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className={styles.pimageWrapper}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={200}
                                            className="rounded"
                                            layout="responsive"
                                        />
                                    </motion.div>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between">
                                            <Card.Title className={styles.productName}>{product.name}</Card.Title>
                                            <span className={styles.weight}>{product.weight}</span>
                                        </div>
                                        <Card.Text className={styles.category}>{product.category}</Card.Text>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className={styles.price}>Rs. {product.price.toFixed(2)}</span>
                                            <Button className={styles.cartButton}>Add to Cart</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default featured
