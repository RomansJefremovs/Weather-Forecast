import React from "react";
import "./forecast.style.css"

const ForecastBox = ({time,temperature,precipitation,wind,cloud})=>{
    return(
        <div className={"forecast-container"}>

            <div className={"inner-f-container"}>
                <p>Temperature</p>
                <p>Precipitation of type {precipitation.type}</p>
                <p>WindSpeed</p>
                <p>Cloud Coverage</p>
            </div>
            <div className={"inner-f-container"}>
                <div className={"inner-inline"}><p>From {temperature.from} to {temperature.to}</p><p>{temperature.unit}</p></div>
                <div className={"inner-inline"}><p>From {precipitation.from} to {precipitation.to}</p><p>{precipitation.unit}</p></div>
                <div className={"inner-inline"}><p>From {wind.from} to {wind.to} to the {wind.direction}</p><p>{wind.unit}</p></div>
                <div className={"inner-inline"}><p>From {cloud.from} to {cloud.to}</p><p>{cloud.unit}</p></div>
            </div>
        </div>
    )
}
export default ForecastBox