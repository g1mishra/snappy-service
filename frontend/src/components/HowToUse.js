import React, { Component } from 'react'
import {Image} from "semantic-ui-react"
import Title from "./Title"
import img1 from "../images/SnappyWorkingStep/step1.png"
import img2 from "../images/SnappyWorkingStep/step2.png"
import img3 from "../images/SnappyWorkingStep/step3.png"
import img4 from "../images/SnappyWorkingStep/step4.png"
import { Container } from 'react-bootstrap'
export default class HowToUse extends Component {
    state={
        steps:[
            {
                icon:img1,
                title:'Select your service',
                info:"Choose the service you need which we are providing "
            },
            {
                icon:img2,
                title:'Choose your worker',
                info:"Select and request one out of our top-rated pros "
            },
            {
                icon:img3,
                title:"Realx! nothing to do now",
                info:"Our pro is on the way and will be there soon"
            },
            {
                icon:img4,
                title:"Pay for what we provide you",
                info:"Pay when work gets done"
            }
        ]
    }
    render() {
        return (
            <Container fluid className="m-0 p-0 ">
                <section className="working-step-container">
                    <Title title="How To Use Snappy" underline="10rem"/>
                        {/* underline value is half of total char in title n(em) , 15 char :- 7em */}
                    <div className="working-step-center">
                        {this.state.steps.map((item,index)=>{
                            return <article key={index} className="working-step">
                                <span><Image size='big' src={item.icon}/></span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        })}
                    </div>
                </section>
            </Container>
        )
    }
}
