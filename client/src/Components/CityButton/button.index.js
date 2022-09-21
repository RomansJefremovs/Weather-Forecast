import React from "react";
import "./button.style.css"

const CityButton = ({city,cb})=>{
    return(
        <div className={"button-container"}>
            <a onClick={cb}>
                <p>{city}</p>
            </a>
        </div>

    )
}

export default CityButton