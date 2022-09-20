import React from "react";
import "./style.css"

const ForecastBox = ({time,temperature,precipitation,wind,cloud})=>{
    return(
        <div>
            <div className={"inner-container"}>
                <p>Temperature</p>
                <p>Precipitation of type {precipitation.type}</p>
                <p>WindSpeed</p>
                <p>Cloud Coverage</p>
            </div>
            <div className={"inner-container"}>
                <div className={"temp inline"}><p>From {temperature.from} to {temperature.to}</p><p>{temperature.unit}</p></div>
                <div className={"precipitation inline"}><p>From {precipitation.from} to {precipitation.to}</p><p>{precipitation.unit}</p></div>
                <div className={"wind inline"}><p>From {wind.from} to {wind.to}</p><p style={{ marginRight: '15px'}}>{wind.unit}</p><p>{wind.direction}</p></div>
                <div className={"cloud inline"}><p>From {cloud.from} to {cloud.to}</p><p>{cloud.unit}</p></div>
            </div>
        </div>
    )
}