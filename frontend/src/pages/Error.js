import React from 'react'
import Hero from "../components/Hero/Hero"
import Banner from '../components/Hero/Banner'
import {Link} from "react-router-dom"

export default function Error() {
    return (
        <div className="Error">
            <Hero hero="errorHero">
                 <Banner title="Error 404" subtitle="Oops page not found">
                    <Link to = "/" className="btn-primaryStyle">return home</Link>
                </Banner>
            </Hero>
        </div>
    )
}
