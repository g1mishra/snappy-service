import React from 'react'

export default function Title({title,underline="15px",children}) {
    const style={width : underline}
    return (
        <div className="section-title">
            <h4> {title} </h4>
            <div style={style} />
            {children}
        </div>
    )
}
