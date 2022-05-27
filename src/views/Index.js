/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import { useState } from "react";
// // node.js library that concatenates classes (strings)
// import classnames from "classnames";
// // javascipt plugin for creating charts
// import Chart from "chart.js";
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";

// // core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

// import Header from "components/Headers/Header.js";
import React from "react";
// import Lottie from 'react-lottie';
//  import rocket  from '../../assets/lottie/72284-rocket-animation.json'
// import rocket from 'assets/lottie/signup.json'

import {
    Button,

    Row,
    Col,
} from "reactstrap";
import "dist/css/style.scss";
import illustration from "../dist/images/header-illustration-light.svg";
import globe from "../assets/images/multiple-location.svg";
import heroIllustration from "../dist/images/hero-media-illustration-light.svg";
import heroMedia from "../dist/images/hopital.jpg";
import featureIllustration from "../dist/images/features-illustration-light.svg";
import featureBox from "../dist/images/features-box-light.svg";
import featureTop from "../dist/images/features-illustration-top-light.svg";
import feature01 from "../dist/images/feature-01-light.svg";
import feature02 from "../dist/images/feature-02-light.svg";

import feature03 from "../dist/images/feature-03-light.svg";

import { Link } from 'react-router-dom';


import logo from "../assets/img/enquirelogo.png";

import Lottie from "lottie-react";
import groovyWalkAnimation from "assets/lottie/signup.json";

const Index = (props) => {
    // const defaultOptions = {
    //     loop: true,
    //     autoplay: true,
    //     animationData: rocket,
    //     rendererSettings: {
    //         preserveAspectRatio: 'xMidYMid slice'
    //     }
    // };
    return (
        <>
            <body className="is-boxed has-animations BaapClass">
                <div className="body-wrap boxed-container">
                    <header className="site-header">
                        <div className="container">
                            <nav className="navbar">

                                <div className="site-header-inner">
                                    <div className="brand header-brand">
                                        <h1 className="m-0">
                                            {/* <a href="#">
                                                {/* <img className="header-logo-image asset-light" src={logoLight} alt="Logo"/> 
                                            </a> */}
                                        </h1>
                                    </div>
                                </div>
                                <a href="#" className="nav-logo"><img src={logo} style={{ 'height': '60px', 'width': '160px', 'marginLeft': '20px' }} alt="" /></a>
                                <ul className="nav-menu" style={{ 'width': '0%' }}>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">Home
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="hotel.html" className="nav-link">Services</a>
                                    </li>

                                    <li className="nav-item">
                                        <a href="contact.html" className="nav-link">Contact</a>
                                    </li>


                                </ul>
                                <Link to="/login">
                                    <Button className=" nav-button button-text" color="primary" type="button">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className=" nav-button button-text" color="primary" type="button" >
                                        Sign Up
                                    </Button></Link>

                            </nav>

                        </div>
                    </header>

                    <main>
                        <section className="hero">
                            <div className="container">
                                <div className="hero-inner">
                                    <div className="hero-copy">
                                        <h1 className="hero-title mt-0" style={{ 'color': 'DarkBlue' }}>Enquire</h1>
                                        <p className="hero-paragraph" style={{ 'color': 'Blue' }}>Book Appointments with Easy.</p>
                                        <p className="hero-paragraph" style={{ 'color': 'Blue' }}>With our Online Booking feature, your clients can make bookings 24x7. All you have to do is signup and add your data then you are ready to go

</p>


                                    </div>
                                    <div className="hero-media" style={{ 'width': '40%' }}>
                                        <div className="header-illustration">
                                            <img className="header-illustration-image asset-light" src={illustration} alt="Header illustration" />

                                        </div>
                                        <div className="hero-media-illustration">
                                            <img className="hero-media-illustration-image asset-light" src={heroIllustration} alt="Hero media illustration" />

                                        </div>
                                        <div className="hero-media-container" style={{ 'width': '100%', 'margin': '0' }}>
                                            <img className=" asset-light" src={globe} style={{ 'width': '80%', 'backgroundSize': '100% 100%', 'borderRadius': '15px' }} alt="Hero media" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>



                        <section className="features section">
                            <div className="container">
                                <div className="features-inner section-inner has-bottom-divider">
                                    <div className="features-header text-center">
                                        <div className="container-sm">
                                            <h2 className="section-title mt-0">Features</h2>
                                            <p className="section-paragraph">
                                                It helps you in realtime tracking of the your appointment, easy booking and avalability status

                                            </p>
                                            <div className="features-image">

                                                <img className="features-illustration asset-light" src={featureIllustration} alt="Feature illustration" />
                                                <img className="features-box asset-light" src={"https://easyflow.tech/wp-content/uploads/2021/05/Queue-Management-1.jpg"} alt="Feature box" />
                                                <img className="features-illustration asset-light" src={featureTop} alt="Feature illustration top" />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="features-wrap">
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src={feature01} alt="Feature 01" />
                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Realtime Tracking</h3>
                                                    <p className="text-sm mb-0">Keep track of your number</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src={feature02} alt="Feature 02" />
                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Nearest Hospital/Clinic</h3>
                                                    <p className="text-sm mb-0">
                                                        Get the distance and travel time of every hospital/clinic from your location
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="feature is-revealing">
                                            <div className="feature-inner">
                                                <div className="feature-icon">
                                                    <img className="asset-light" src={feature03} alt="Feature 03" />
                                                    <img className="asset-dark" src="dist/images/feature-03-dark.svg" alt="Feature 03" />
                                                </div>
                                                <div className="feature-content">
                                                    <h3 className="feature-title mt-0">Availability status of a Doctor</h3>
                                                    <p className="text-sm mb-0">
Keep the track of doctor availbility                                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section style={{ 'height': '100%', backgroundColor: '#21AEE4' }}>
                            {/* <span className="mask bg-gradient-info opacity-7" /> */}
                            <Row className="py-4">


                                <Col lg='6' className="text-white p-3 ml-5 pl-5"><h2 className="text-white">Register Your Hospital Here</h2>

                                    <p>Register Your Clinics , Hospitals Here...</p>
                                    <a href="/admin-register"><Button style={{ color: '#4fa9e2', padding:'10px',fontSize:'1rem' }}>Sign Up</Button></a>

                                    <hr style={{width:'50%', color:"85f1fe" , "marginLeft":'0'}}></hr>
                                    <h4  style={{ color:"#FFF"}}>Already Signed Up...</h4>
                                    <p>Click Here to Login</p>
                                    <a href="/AdminLogin"><Button style={{ color: '#4fa9e2', padding:'10px',fontSize:'1rem'}}>Sign In</Button></a>


                                </Col>
                                <Col lg='4'>
                                    {/* <Lottie options={defaultOptions}
                                        height={400}
                                        width={500}></Lottie> */}
                                       <Lottie animationData={groovyWalkAnimation} />
                                </Col>
                            </Row>
                        </section>

                        <section className="cta section">
                            <div className="container-sm">
                                <div className="cta-inner section-inner">
                                    <div className="cta-header text-center">
                                        <h2 className="section-title mt-0">Get it and Switch</h2>
                                        <p className="section-paragraph">Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    <footer className="site-footer has-top-divider" >
                        <div className="container" style={{ 'height': '180px' }}>
                            <div className="site-footer-inner">
                                <div className="brand footer-brand">
                                    <a href="#">
                                        {/* <img className="asset-light" src={logoLight} alt="Logo"/> */}
                                    </a>
                                </div>
                                <ul className="footer-links list-reset">
                                    <li>
                                        <a href="#">Contact</a>
                                    </li>
                                    <li>
                                        <a href="#">About us</a>
                                    </li>
                                    <li>
                                        <a href="#">FAQ's</a>
                                    </li>
                                    <li>
                                        <a href="#">Support</a>
                                    </li>
                                </ul>
                                <ul className="footer-social-links list-reset">
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Facebook</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Twitter</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="screen-reader-text">Google</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFF" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                                <div className="footer-copyright">&copy; 2022 Enquire, all rights reserved</div>
                            </div>
                        </div>
                    </footer>
                </div>

                <script src="dist/js/main.min.js"></script>
            </body></>
    );
};

export default Index;
