import React from 'react'
import "./Hero.css"
export default function Banner({children,title,subtitle}) {
    return (
        <div className="banner">
            <h1> {title} </h1>
            <div className="uline"/>
            <p> {subtitle} </p>
            {children}
        </div>
    )
}
