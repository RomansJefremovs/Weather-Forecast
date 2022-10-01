import React, {useEffect, useState} from "react"
import "./data.style.css"
import {url} from "../../FetchData/ForecastApiFetch";
// import {useState} from "@types/react";


// {time,temperature,precipitation,wind,cloud}
const LatestData = ()=>{
    const [data,setData] = useState([])
    const [latest,setLatest] = useState([])
    const [status, setStatus] = useState("")

    const getDataXHR = () => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET",url("data","Aarhus"))
        xhr.send()
        let temp
        xhr.onload = async ()=>{
            if (xhr.status == 200){
                temp = JSON.parse(xhr.responseText)
                setData(temp)
                let num = temp.length - 4
                let resArr = []
                for (let i = num; i < temp.length; i++) {
                    resArr.push(temp[i])
                }
                setLatest(resArr)
                // data.length !==0 ? setStatus("Data Ready"):setStatus("Data Not Ready")
            }else{
                console.log("error loading the data")
            }
        }
    }
    // const getLatestMeasurements = (arr)=>{
    //     let temp = arr.length - 4
    //     let resArr = []
    //     for (let i = temp; i < arr.length; i++) {
    //         resArr.push(data[i])
    //     }
    //     setLatest(resArr)
    // }

    useEffect(()=>{
        getDataXHR()
        // if (data.length != 0 ){
        //     getLatestMeasurements()
        // }
    },[])

    console.log(data)
    console.log(latest)
    return(
        <div className={"latest-data"}>
            <h1 className={"header-data"}>Latest data</h1>
            <p className={"time"}>Updated at {latest.time}</p>

            <div className={"data-container"}>
                <div className={"inner-container"}>
                    <p>Temperature</p>
                    <p>Precipitation of type {latest.type}</p>
                    <p>WindSpeed</p>
                    <p>Cloud Coverage</p>
                </div>
                <div className={"inner-container"}>
                    <div className={"temp inline"}><p>{latest.length !==0 ? latest[0].place :"Loading"}</p><p></p></div>
                {/*    <div className={"precipitation inline"}><p>{latest[0].value}</p><p>{latest[0].unit}</p></div>*/}
                {/*    <div className={"wind inline"}><p>{latest[0].value}</p><p style={{ marginRight: '15px'}}>{latest[0].unit}</p><p>{latest[0].direction}</p></div>*/}
                {/*    <div className={"cloud inline"}><p>{latest[0].value}</p><p>{latest[0].unit}</p></div>*/}
                </div>
            </div>
        </div>
    )
}

export default LatestData