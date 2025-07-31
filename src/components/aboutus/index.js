import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import styles from "./about.module.scss";
const Index = () => {
  return (
    <>
      <section className={styles["about-head"]}>
        <Container>
          <Row>
            <Col lg={12}>
              <div className={styles["content"]}>
                <h2>About Us</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles["about-body"]} my-4`}>
        <Container>
          <Row>
            
            <Col lg={12}>
            <h2>Use It To Believe It</h2>
              <h3 className="mb-3">Introducing Nutsvibe Hair Oil :</h3>
              {/* <br/> */}
            <p>
              QiRah Hair Care is a brand by Heena Style Affairs,
              a pioneering company dedicated to crafting natural hair products
              that empower customers in their journey to combat various hair problems.
              Our formulations are meticulously designed to harness the power of nature,
              providing effective solutions for healthier, more vibrant hair. At QiRah,
              we believe in the beauty of natural ingredients and the transformative impact
              they can have on your hair. Join us in embracing a holistic approach to hair
              care and rediscover the confidence that comes with nourished, revitalized locks.
              <br />
              <br />
              Heena Style Affairs our company started its journey in 2014
              with its clothing line and then established it's other brands
              Zabacc and Nutsvibe. We believe in delivering quality products to our
              customers and help them solve their problems, be it self hygiene or
              hair loss, we fix it all. We acknowledge ourselves as a fast
              growing company that will add value to customers life
            </p>
            </Col>
            <Col lg={12}>
            <h2 className=" my-3">Meet the Founders</h2>
            </Col>
            <Col lg={3}>
              <Image
                src="/images/founder1.jpg"
                alt="Founder 1"
                className={`${styles["img"]} rounded-3 shadow`}
                // layout='responsive'
                // objectFit='contain'
                width={350}
                height={10}
              />
            </Col>
            <Col lg={8} className="offset-lg-1">
              <p className={styles["txt"]}>
                Introducing Mousiq Merchant, the founder instrumental in shaping
                the success of QiRah hair care. With a collaborative spirit,
                Mousiq played a pivotal role in building the brand, contributing
                to its growth and establishment as a prominent name in the
                beauty industry.
                <br />
                <br /> His dedication and partnership alongside Heena Merchant
                reflect the dynamic synergy that has propelled QiRah to new
                heights. He has been instrumental in shaping the success of
                QiRah hair care. With a collaborative spirit, Mousiq, the
                collaborative force behind QiRah hair care, stands as a founder
                whose contributions have been integral to the brand's ascent.
                <br />
                <br /> A key architect in building the company, Mousiq's
                strategic vision and unwavering commitment have played a vital
                role in shaping QiRah into a formidable presence in the hair
                care market. His innovative mindset and shared passion with
                Heena Merchant exemplify the synergy that defines
                QiRah's success story.
              </p>
            </Col>
</Row>
<Row className={styles['row-mob']}>
            <Col lg={8}>
              <p className={styles["txt1"]}>
                Heena Merchant, a trailblazing entrepreneur and the brilliant
                mind behind QiRah hair care, has redefined the landscape of hair
                care solutions. Armed with a vision to harness the potency of
                natural ingredients, she laid the foundation for QiRah, a brand
                synonymous with effective, wholesome hair care.<br/><br/> Heena's journey
                is a testament to her dedication to solving customers' hair
                problems, making QiRah a beacon of excellence in the beauty
                industry. She is the driving force behind QiRah hair care, Who
                is not only a founder but a dedicated advocate for natural
                solutions to hair issues.<br/><br/> Fueled by a desire to revolutionize
                hair care, she meticulously crafted the brand, emphasizing the
                power of natural ingredients. Heena's unwavering commitment and
                innovative approach have positioned QiRah as a trusted name in
                addressing diverse hair care needs.
              </p>
            </Col>
            <Col lg={3} className="offset-lg-1">
              <Image
                src="/images/founder2.jpg"
                alt="Founder 1"
                className={`${styles["img1"]} rounded-3 shadow`}
                // layout='responsive'
                // objectFit='contain'
                width={300}
                height={10}
              />
            </Col>


            
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
