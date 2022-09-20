import React from "react"
import "./style.css"



const LatestData = ({time,temperature,precipitation,wind,cloud})=>{
    return(
        <div className={"latest-data"}>
            <h1 className={"header-data"}>Latest data</h1>
            <p className={"time"}>Updated at {time}</p>
            <div className={"data-container"}>
                <div className={"inner-container"}>
                    <p>Temperature</p>
                    <p>Precipitation of type {precipitation.type}</p>
                    <p>WindSpeed</p>
                    <p>Cloud Coverage</p>
                </div>
                <div className={"inner-container"}>
                    <div className={"temp inline"}><p>{temperature.value}</p><p>{temperature.unit}</p></div>
                    <div className={"precipitation inline"}><p>{precipitation.value}</p><p>{precipitation.unit}</p></div>
                    <div className={"wind inline"}><p>{wind.value}</p><p style={{ marginRight: '15px'}}>{wind.unit}</p><p>{wind.direction}</p></div>
                    <div className={"cloud inline"}><p>{cloud.value}</p><p>{cloud.unit}</p></div>
                </div>
            </div>
        </div>
    )
}

export default LatestData