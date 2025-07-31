import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import Link from 'next/link';
import Image from 'next/image';
import styles from './forgotPassword.module.scss'
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

const index = () => {
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5002/api/users/forgot-password', {
        email: values.email,
      });

      setMessage('If an account with that email exists, you will receive a password reset link.');
    } catch (error) {
      setMessage('Error: Unable to send password reset email.');
      console.error('Error:', error);
    }
    setSubmitting(false);
  };
  return (
    <>
      <section className={`${styles['forgot-password-section']}`}>
        <Container>
          <div className="row justify-content-center">
            <div className="col-md-5 col-lg-5">
              <div className="p-4 bg-white border shadow-lg rounded signup-box">
                <h2 className="text-center">Forgot Password</h2>
                {message && <div className="alert alert-info">{message}</div>}
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string().email('Invalid email').required('Email is required'),
                  })}
                  onSubmit={handleFormSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email address</label>
                        <Field type="email" className={`${styles['login-bdr']} form-control`} id="email" name="email" placeholder="Enter your email" />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                      </div>
                      <div className="form-group text-center">
                        <Button type="submit" disabled={isSubmitting} variant='outline-dark'>
                          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="row pt-3">
                  <div className="col-lg-12 text-center">
                    <p className="text-center">
                      Remembered your password?{' '}
                      <Link href="/login" style={{ color: "#d7b56d", textDecoration: "none" }}>
                        <strong>Login</strong>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default index