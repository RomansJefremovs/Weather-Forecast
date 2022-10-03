import React from "react";
import {sendMessageWS} from "../../FetchData/ForecastApiFetch";
import CityButton from "../CityButton/button.index";
import "./send.style.css"


const SendData = ()=>{
    let urlString = "ws://localhost:3090/warnings"
    let subscribe = "subscribe"
    let unsubscribe = "unsubscribe"

    const subHandler = ()=>{
        sendMessageWS(subscribe,urlString)
    }

    const unsubHandler = ()=>{
        sendMessageWS(unsubscribe,urlString)
    }

    return(
        <div className={"subscription-container"}>
            <h1>Subscribe to WebSocket here:</h1>
            <div className={"subscription"}>
                <CityButton
                    city={"Subscribe"}
                    cb={()=>{
                        subHandler()
                    }}
                />
                <CityButton
                    city={"Unsubscribe"}
                    cb={()=>{
                        unsubHandler()
                    }}
                />
            </div>
        </div>

    )
}

export default SendData