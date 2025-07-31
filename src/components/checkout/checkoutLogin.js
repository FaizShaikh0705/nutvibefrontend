import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import Link from 'next/link';
import Image from 'next/image';
import styles from './checkout.module.scss'
import { useRouter } from 'next/router';

const checkoutLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/checkout")
        }
    }, [currentUser])

    return (
        <section className={styles['login-section']}>
            <Container>
                {/* <div className="text-center">
                    <Image
                        key=""
                        height="180"
                        width="180"
                        objectFit="contain"
                        src="/images/logo.jpg"
                        alt="logo_img"
                    />
                </div> */}
                <div className="row justify-content-center">

                    <div className="col-md-5 col-lg-5">
                        <div className="p-4 bg-white border shadow-lg rounded signup-box">
                            <h2 className="text-center">Login</h2>
                            <div>
                                {error && (
                                    <div style={{ color: 'red' }}>
                                        <p>{error}</p>
                                        <p>{error.code}</p>
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="username">UserName</label>
                                <input type="name" className={`${styles['login-bdr']} form-control`} id="username" name="username" value={username} placeholder="Enter a username" onChange={(event) => setUsername(event.target.value)} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className={`${styles['login-bdr']} form-control`} id="password" name="password" value={password} placeholder="Enter a password" onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div className="form-group text-center mt-4">
                                <button onClick={handleClick} className="btn btn-outline-dark btn-md btn-block waves-effect text-center m-b-20">Login Now</button>
                            </div>
                            {/* <div className="or py-3">
                            <h3><span>or</span></h3>
                        </div> */}
                            <div className="row pt-3">
                                <div className="col-lg-12 text-center">
                                    <p class="text-center"> Don't have an account?  <Link href="/register" style={{color:"#d7b56d" ,textDecoration:"none"}}><strong>Sign up</strong></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default checkoutLogin