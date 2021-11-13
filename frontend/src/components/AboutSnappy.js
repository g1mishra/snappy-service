import React from 'react'
import {Container, Row, Col } from "react-bootstrap"
import "./componentCss/AboutSnappy.css"
import img from "../images/about-img.png"
import { Icon } from 'semantic-ui-react'
export default function AboutSnappy() {
return ( 
        <div className="aboutus-section">
            <Container>
                <Row className="m-0">
                    <Col className="p-0 aboutus-container" >
                        <div className="aboutus ">
                            <h2 className="aboutus-title">About Us</h2>
                            <div></div>
                            <p className="aboutus-text pb-2 m-0">No More time wasting, your time is valued and we make sure its used to its full extent.
                                WELCOME TO SNAPPY. Here you can find the workers according to your needs.
                            </p>
                            <p className="aboutus-text">NO HUSTLE,you are just One search away from finding your Crew. We offer you the Educated, Un-Educated, 
                                Skilled, Non-Skilled, Experienced, Non-Experienced.</p>
                            <a className="aboutus-more" href="/">read more</a>
                        </div>
                    </Col>
                    <Col className="aboutus-banner-container">
                        <div className="aboutus-banner">
                            <img className="about-image" src={img} alt=""/>
                        </div>
                    </Col>
                    <Col className="feature-container">
                        <div className="feature">
                            <div className="feature-box">
                                    <div className="iconset">
                                        <span>                                
                                            <Icon name="heart" />
                                        </span>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Work with heart</h4>
                                        <p>
                                            We value your MASTERPIECE and the time you spend 
                                            creating them. You work with your full dedication and we got you hooked.
                                        </p>
                                    </div>
                                </div>
                            <div className="feature-box">
                                    <div className="iconset">
                                        <span>                                        
                                            <Icon name="thumbs up" />
                                        </span>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Reliable services</h4>
                                        <p>Get workers who are consistently good in quality or performance. Our workers are able to be trusted</p>
                                    </div>
                                </div>
                            <div className="feature-box">
                                    <div className="iconset">
                                        <span>                                       
                                            <Icon name="settings" />
                                        </span>
                                    </div>
                                    <div className="feature-content">
                                        <h4>Great support</h4>
                                        <p>We provide assistance in just a few amount of time and it acts as a great support for you. </p>
                                    </div>
                                </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
