import React, { Component } from "react";
import Hero from "../components/Hero/Hero"
import Banner from "../components/Hero/Banner";
import "./page_css/Customer.css"
import img1 from "../images/category/cat1.jpg"
import img2 from "../images/category/cat2.jpg"
import img3 from "../images/category/cat3.jpg"
import img4 from "../images/category/cat4.jpg"
import img5 from "../images/category/cat5.jpg"
import img6 from "../images/category/cat6.jpg"


import { Container, Row , Col } from "react-bootstrap/";
class Customer extends Component {

  render() {
    return (
      <div className="customer">
         <Hero hero="customerHero">
           <Banner title="Got a job to do?" subtitle="You're at the right place">
           </Banner>
         </Hero>
         <Container className="pt-3 pb-3 text-center">
           <Row className="m-0 p-0">
             <Col md={12} sm={12} className=" customer-heading">
             <h1 style={{fontSize:"38px",opacity:".9",fontWeight:"bold"}}>No more searching for Pros.</h1>

                <p className="para">
                    Are you home alone, are you a house working lady whose husband is at job and you don't 
                    know what to do for getting workers, are you in hurry for doing something and don't 
                    know what to do and need some assistance. Sit back , Relax you are at the right place . 
                    SNAPPY? Yes. This website you can find every type of assistance. Well you know a lot of time 
                    is wasted in finding workers. On Snappy it is just a matter of few seconds. The workers who 
                    will be working for you are just a click away. You can have every type of work for experienced, 
                    non experienced, any type of labour you want.
                </p>
             <p className="btn btn-primary mb-3">Hire Now</p>
             </Col>
              {/*Hey customer welcome to Snappy. Your he right place for getting your work done.
              If you havent seen our services then go to the services tab. 
              (Button link to services tab)

              Are you read to save your time? */}

            
             <Col md={12} sm={12} className="second-container">
                <ul className="gallery_box">
                  <li>
                    <a href="#0"><img src={img1} alt="Plumber"/>
                    <div className="box_data">
                      <span>Plumber</span>
                    </div>
                    </a>
                  </li>
                    <li>
                    <a href="#0"><img src={img2} alt="carpenter"/>
                    <div className="box_data">
                      <span>Carpenter</span>
                    </div></a>
                  </li>
                    <li>
                    <a href="#0"><img src={img3} alt="Electrician"/>
                    <div className="box_data">
                      <span>Electrician</span>
                    </div></a>
                  </li>
                      <li>
                    <a href="#0"> <img src={img4} alt="Painter"/>
                    <div className="box_data">
                      <span>Painter</span>
                    </div></a>
                  </li>
                      <li>
                    <a href="#0"><img src={img6} alt="Home Cleaner"/>
                    <div className="box_data">
                      <span>Home Cleaner</span>
                    </div></a>
                  </li>
                  <li>
                    <a href="#0"><img src={img5} alt="General Labour"/>
                    <div className="box_data">
                      <span>General Labour</span>
                    </div></a>
                  </li>
                  
                </ul>
                <h1 style={{fontSize:"38px",opacity:".8",fontWeight:"bold"}}>No more headaches to get your job done.</h1>
                <p className="para">
                  Snappy provides you with on-demand access to the very best home service 
                  professionals in your area. With Snappy, say goodbye to unreliable technicians.
                  
                  </p>
                  <p className="btn btn-primary mb-3">Hire Now</p>
                </Col>
           </Row>
         </Container>
      </div>
    );
  }
}

export default Customer;