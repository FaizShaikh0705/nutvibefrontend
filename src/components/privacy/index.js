import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./privacy.module.scss";
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
                  <span> Privacy Policy</span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={styles["privacy"]}>
        <Container>
          <Row>
            <Col lg={12}>
              <h3 className="text-center my-5">PRIVACY POLICY</h3>
              <p>
                This privacy statement describes how Nutsvibe Hair Oil collects and
                uses the personal information you provide on our Web site:
                www.qirah-haircare.com It also describes the choices available to you
                regarding our use of your personal information and how you can
                access and update this information.
              </p>

              <h5>Collecting Personal Information</h5>
              <p>
                When you register for an account on the site, make a purchase,
                sign up to receive promotional emails from us, or contact us for
                support or with questions the types of information we will
                collect about you includes:
                <br />
                Your Name, Address, Phone Number, Email Address
              </p>

              <h5>How We Use Your Personally Identifiable Information</h5>
              <p>
                The site is an online shopping portal and uses the submitted
                information for sale-related transactions only. Information
                about customer's email id is used during the course of order
                processing to make enquiries and get additional
                inputs/clarifications. The address and telephone number is used
                for the purpose of mailing the ordered consignment. Other than
                these areas, the information has no commercial usage.
              </p>
              <h5>Online Payment</h5>
              <p>
                We use RayzorPay for processing online payments. We/RayzorPay money
                do not store your card data on their servers. The data is
                encrypted through the Payment Card Industry Data Security
                Standard (PCI-DSS) when processing payment. Your purchase
                transaction data is only used as long as is necessary to
                complete your purchase transaction. After that is complete, your
                purchase transaction information is not saved.
                <br />
                <br /> Our payment gateway adheres to the standards set by
                PCI-DSS as managed by the PCI Security Standards Council, which
                is a joint effort of brands like Visa, MasterCard, American
                Express and Discover.
                <br />
                <br />
                PCI-DSS requirements help ensure the secure handling of credit
                card information by our store and its service providers.
              </p>
              <h5>Newsletters</h5>
              <p>
                If you wish to subscribe to our newsletter(s), we will use your
                name and email address to send the newsletter to you. You may
                unsubscribe from these communications at any time by following
                the instruction contained within each of the communications you
                receive.
              </p>
              <h5>Service-related Announcements</h5>
              <p>
                We will send you strictly service-related announcements on rare
                occasions when it is necessary to do so. For instance, if our
                service is temporarily suspended for maintenance, we might send
                you an email. Generally, you may not opt-out of these
                communications, which are not promotional in nature. If you do
                not wish to receive them, you have the option to deactivate your
                account.
              </p>
              <h5>Facebook Connect</h5>
              <p>
                You can log in to our site using sign-in services such as
                Facebook Connect or an Open ID provider. These services will
                authenticate your identity and provide you the option to share
                certain personal information with us such as your name and email
                address to pre-populate our sign up form. Services like Facebook
                Connect give you the option to post information about your
                activities on this Web site to your profile page to share with
                others within your network.
              </p>
              <h5>Service Providers</h5>
              <p>
                We use other third parties such as a shipping company to fulfill
                orders, and a payment gateway company to bill you for goods and
                services, and an email service provider to send out emails on
                our behalf. 
                {/* We use Live Chat to assist you if you have questions
                while using our site or regarding your order.  */}
                When you sign up
                for our services, we will share your personal information as
                necessary for the third party to provide that service.
              </p>
              <h5>Legal Disclaimer</h5>
              <p>
                We reserve the right to disclose your personally identifiable
                information as required by law and when we believe that
                disclosure is necessary to protect our rights and/or to comply
                with a judicial proceeding, court order, or legal process served
                on our Web site
              </p>
              <h5>Security</h5>
              <p>
                The security of your personal information is important to us. We
                follow generally accepted industry standards to protect the
                personal information submitted to us, both during transmission
                and once we receive it. Nutsvibe is not responsible for any breach
                of security or for any actions of any third parties that receive
                Your Personal Information. The Website also linked to many other
                sites and we are not/shall be not responsible for their privacy
                policies or practices as it is beyond our control.
              </p>

              <h5>Cookies</h5>
              <p>
                A cookie is a small text file that is stored on a user's
                computer for record-keeping purposes. We use cookies on this
                site. We do not link the information we store in cookies to any
                personally identifiable information you submit while on our
                site.
                <br />
                <br />
                We use persistent cookies. A persistent cookie remains on your
                hard drive for an extended period of time. You can remove
                persistent cookies by following directions provided in your
                Internet browser's "help" file.
                <br />
                <br />
                We set a persistent cookie to store your passwords, so you don't
                have to enter it more than once. Persistent cookies also enable
                us to track and target the interests of our users to enhance the
                experience on our site.
                <br />
                <br />
                If you reject cookies, you may still use our site, but your
                ability to use some areas of our site, such as contests or
                surveys, will be limited The use of cookies by our [partners,
                affiliates, tracking utility company, service providers] is not
                covered by our privacy statement. We do have access or control
                over these cookies. Our [partners, affiliates, tracking utility
                company, service providers] use session ID cookies to make it
                easier for you to navigate our site, in order for you to use the
                shopping cart, etc.
              </p>
              {/* <h5>Web Beacons</h5>
              <p>
                We employ [or our third party advertising partner employs] a
                software technology called Web Beacons, that help us better
                manage content on our site by informing us what content is
                effective. Web Beacons are tiny graphics with a unique
                identifier, similar in function to cookies, and are used to
                track the online movements of Web users. In contrast to cookies,
                which are stored on a user's computer hard drive, Web Beacons
                are embedded invisibly on Web pages and are about the size of
                the period at the end of this sentence. We tie the information
                gathered by clear gifts to our customers' personally
                identifiable information.
              </p>
              <h5>Log Files</h5>
              <p>
                As is true of most Web sites, we use third-party tracking
                services to gather certain information automatically and store
                it in log files. This information includes internet protocol
                (IP) addresses, browser type, internet service provider (ISP),
                referring/exit pages, operating system, date/time stamp, and
                clickstream data.
                <br />
                <br />
                We use this information, which does not identify individual
                users, to analyze trends, to administer the site, to track
                users' movements around the site and to gather demographic
                information about our user base as a whole.
              </p> */}
              <h5>Public Forums</h5>
              <p>
                Our Web site offers publicly accessible blogs or community
                forums. You should be aware that any information you provide in
                these areas may be read, collected, and used by others who
                access them.
              </p>
              <h5>Changes in this Privacy Statement</h5>
              <p>
                We may update this privacy statement to reflect changes to our
                information practices. If we make any material changes we will
                notify you by email (sent to the e-mail address specified in
                your account) or by means of a notice on this Site prior to the
                change becoming effective. We encourage you to periodically
                review this page for the latest information on our privacy
                practices.
              </p>
              
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Index;
