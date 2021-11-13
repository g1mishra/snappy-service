import React from 'react'
import Hero from "../components/Hero/Hero"
import {Container,Row,Col} from "react-bootstrap"
import Banner from '../components/Hero/Banner'
import { Link,} from "react-router-dom";
import img1 from "../images/category/cat1.jpg"
import img2 from "../images/category/cat2.jpg"
import img3 from "../images/category/cat3.jpg"
import img4 from "../images/category/cat4.jpg"
import img5 from "../images/category/cat5.jpg"
import img6 from "../images/category/cat6.jpg"

import "./page_css/Services.css"
export default function Services() {
    // let { 
    //     // path,
    //      url } = useRouteMatch();
    var cradValue = [
        {
            id:1,
            img:img1,
            name:"Plumbers",
            desc:"A person whose job is to supply and connect or repair water pipes, baths, toilets,etc."
        },
        {
            id:2,
            img:img2,
            name:"Carpenters",
            desc:"A person whose job is making and repairing wooden objects and structures."

        },
        {
            id:3,
            img:img5,
            name:"Labours",
            desc:"A person who can do work like cleaning, loading and delivering materials, etc."

        },
        {
            id:4,
            img:img6,
            name:"House-Cleaners",
            desc:"A person who remove mess, trash, and dirt from houses so the house looks neat."

        },
        {
            id:5,
            img:img4,
            name:"Painters",
            desc:"A person whose job is to paint surfaces, such as walls, roofs and doors."

        },
        {
            id:6,
            img:img3,
            name:"Electricians",
            desc:"A person who puts in, checks, and repairs electrical wires and electrical equipment"

        }
    ]

    return (
        <section id="Services" className="pb-5">
            <Hero hero="servicesHero-1">
                <Banner title="Our Services" subtitle="We provide you every type of assistance">
                </Banner>
            </Hero>
            <Container className="p-0">
                <h5 className="section-title h1">OUR Services</h5>
                <Row className="cards-container m-0">
                    {
                        cradValue.map(item => 
                            <Col key={item.id} md={4} sm={6} xs={11} className="m-auto ">
                                <div className="frontside">
                                    <div className="card">
                                        <div className="card-body text-center">
                                            <p><img className="img-fluid" src={item.img}  alt={item.name}/></p>
                                            <h4 className="card-title"> {item.name} </h4>
                                            <p className="card-text"> {item.desc} </p>
                                            <Link to=  {{   pathname: `hire/`,
                                                            state: { Profession: item.name }
                                                        }}
                                            className="btn btn-primary btn-sm"> Hire {item.name} </Link>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    }
                    
                </Row>
               
            </Container>
        </section>
    );
}
