import React from 'react'
import {Container, Icon, Button,} from 'semantic-ui-react'
import "./Footer.css"
import logo from "../../images/Logo.png"
import { Col, Row } from 'react-bootstrap'
function Footer() {
    return (
        <footer className="footer">
            <Container className="p-0 pb-3">
                <Row className="m-0 p-0">
                    <Col md={4} sm={12} className="logo_social_media">
                        <div className="logo ">
                            <img src={logo} alt="Logo"/>
                        </div>
                        <ul className="social_media_links">
                            <li><a href="https://www.facebook.com"><Icon size="big" name="facebook" /></a></li>
                            <li><a href="https://www.instagram.com"><Icon size="big" name="instagram" /></a></li>
                            <li><a href="https://www.linkedin.com"><Icon size="big" name="linkedin" /></a></li>
                            <li><a href="https://www.youtube.com"><Icon size="big" name="youtube"/></a></li>
                        </ul>
                        
                    </Col>
                    <Col md={4} sm={7} className="pt-3 text-white offset-md-1 p-0 footer_contact_us">
                        <h3>Contact us</h3>
                        <p>Phone - 1 : +91 1234567890</p>
                        <p>Phone - 2 : +91 1234567890</p>
                        <p>E-mail : snappy@gmail.com</p>
                        <p>yahoo : snappy@yahoo.com</p>
                        <p><Button  color="blue" > Join as Worker </Button>
                        <Button className="mt-1" color="teal">Join as Customer</Button></p>
                    </Col>
                    <Col md={2} sm={4} className=" p-0 pt-3 offset-md-1 offset-sm-1 footer_navbar_container ">
                        <h3>Go to</h3>
                        <ul className="footer_navbar">
                            <li><Icon name="right arrow" /> <a href="/"> Home </a> </li>
                            <li><Icon name="right arrow" /> <a href="/service"> Services </a> </li>
                            <li><Icon name="right arrow" /> <a href="/pro-worker"> Pro </a> </li>
                            <li><Icon name="right arrow" /> <a href="/customer"> Customer </a> </li>
                            <li><Icon name="right arrow" /> <a href="/hire"> Hire </a> </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
                <Row className="copy-right">
                    <Col md={12}>                    
                        <p className="h6">Snappy &copy; 2020. developed by <a href="https://www.linkedin.com/in/jeevan-kumar-618a95153" className="text-dark">Jeevan</a></p>
                    </Col>  
                </Row>
        </footer>
    )
}

export default Footer
