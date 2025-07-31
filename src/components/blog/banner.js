import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Link from "next/link";
import styles from './blog.module.scss'

const banner = () => {
    return (
        <>
            <section className={styles['breadcrumb']}>
            <Container>
          <Row>
            <Col lg={12}>
              <div className={styles['content']}>
                <h2>Blogs</h2>
                <p>
              <span>
                <Link href="/">Home</Link>
              </span>{" "}
              <span>/</span>
              <span> Blog</span>
            </p>
              </div>
            </Col>
          </Row>
        </Container>
            </section>
        </>
    )
}

export default banner