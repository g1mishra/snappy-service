import React, {  } from "react";
import Hero from "../components/Hero/Hero"
import Banner from "../components/Hero/Banner";
import { Container,} from 'react-bootstrap'
import img1 from "../images/heroImage/chooseBose.jpg"
import img2 from "../images/heroImage/timeschedule.jpeg"
import img3 from "../images/heroImage/money.jpg"
import { Button } from "semantic-ui-react";
import "./page_css/worker.css";
import  { Link } from "react-router-dom"
import {useDispatch} from "react-redux"
import {workerSignup} from "../redux-src/actions"


function Worker(){
    const dispatch = useDispatch()
    return (
      <div className="pro_worker">
         <Hero hero="proHero">
            <Banner title="Get Jobs Make Money">
              <a href="#more" id="more" className="btn-primaryStyle1"> Know more </a>
            </Banner>
          </Hero>
          <Container className=" p-0 pt-4">
            <div className="heading">
              <h1>Are you a skilled, spiritfull, passionate guy looking for an oppurtunity to show your master piece ?</h1>
               <h2> <q> You're at the right place. </q></h2>
            </div>
            <div className="why-we">
              <h1>Why Snappy is best for you?</h1>

              <div className="why_we_step">
                <img src={img1} alt="Choose your own client"></img>
                <div className="img_side_txt">
                  <h2>Choose your own client.</h2>
                  <p>You have freedom to choose where and whose job you want to do.</p>
                </div>
              </div>

              <div className="why_we_step">
                <div className="img_side_txt to_hide">
                  <h2>Choose your schedule time.</h2>
                  <p>You have freedom to choose where and whose job you want to do.</p>
                </div>
                <img src={img2} alt="Choose your own client"></img>
                <div className="img_side_txt to_show">
                  <h2>Choose your schedule time.</h2>
                  <p>You have freedom to choose where and whose job you want to do.</p>
                </div>
              </div>

              <div className="why_we_step">
                <img src={img3} alt="Choose your own client"></img>
                <div className="img_side_txt">
                  <h2>Get money according to your skill.</h2>
                  <p>You have freedom to choose where and whose job you want to do.</p>
                </div>
              </div>

            </div>
            <div className="p-3 pt-4 text-center last_div">
              <h1>So, What are you looking for ?</h1>
              <h2>Sign-up now to start getting jobs and making money. Always free. It’s that simple. </h2>
              <Button as={Link} to="/signup" onClick={()=>dispatch(workerSignup()) } style={{background:"#fff",color:"#f2711c",fontSize:"16px"}}>
                Signup Now
              </Button>
            </div>
          </Container>
      </div>
    );
  }

export default Worker;