import React, {useEffect, useState} from "react"
import "./data.style.css"
import {getForecast, url} from "../../FetchData/ForecastApiFetch";
import CityButton from "../CityButton/button.index";
// import {useState} from "@types/react";


// {time,temperature,precipitation,wind,cloud}
const LatestData = ()=>{
    const [data,setData] = useState([])
    const [latest,setLatest] = useState([])
    // const [status, setStatus] = useState("")

    const getDataXHR = (city) => {
        let xhr = new XMLHttpRequest()
        xhr.open("GET",url("data",city))
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
    const handleClickData = async (city)=>{
        getDataXHR(city)
    }

    const getMinTempLastDay = ()=>{
        let min = 100
        for (let i = data.length-96; i < data.length; i++) {
            if (data[i].type === "temperature" && data[i].value < min){
                min = data[i].value
            }
        }
        return min
    }
    const getMaxTempLastDay = ()=>{
        let max = -100
        for (let i = data.length-96; i < data.length; i++) {
            if (data[i].type === "temperature" && data[i].value > max){
                max = data[i].value
            }
        }
        return max
    }

    const getTotalPrecipitationLastDay = ()=>{
        let total = 0
        for (let i = data.length - 96; i < data.length; i++) {
            if (data[i].type === "precipitation"){
                total += data[i].value
            }
        }
        return total
    }
    const getAverageWindLastDay = ()=>{
        let total = 0
        let count = 0
        for (let i = data.length - 96; i < data.length; i++) {
            if (data[i].type === "wind speed"){
                total += data[i].value
                count++
            }
        }
        let avg = total/count
        return avg
    }

    useEffect(()=>{
        getDataXHR("Aarhus")
    },[])

    return(
        <div className={"latest-data-container"}>
            <div className={"switch-latest"}>
                <CityButton city={"Aarhus"} cb={()=>{
                    handleClickData("Aarhus")
                }}/>
                <CityButton city={"Horsens"} cb={()=>{
                    handleClickData("Horsens")
                }}/>
                <CityButton city={"Copenhagen"} cb={()=>{
                handleClickData("Copenhagen")
            }}/>
            </div>
            <div className={"latest-data"}>
                <h1 className={"header-data"}>Latest data</h1>
                <p className={"time"}>Updated at {latest.length !==0 ? latest[0].time : "Loading"}</p>
                <div className={"data-container"}>
                    <div className={"inner-container"}>
                        <p>City</p>
                        <p>Temperature</p>
                        <p>Precipitation of type {latest.length !==0 ? latest[1].precipitation_type:"Loading"}</p>
                        <p>WindSpeed</p>
                        <p>Cloud Coverage</p>
                    </div>
                    {latest.length !==0 ?
                        <div className={"inner-container"}>
                            <div className={"city inline"}><p>{latest[0].place}</p><p></p></div>
                            <div className={"temp inline"}><p>{ latest[0].value}</p><p>{latest[0].unit}</p></div>
                            <div className={"precipitation inline"}><p>{latest[1].value}</p><p>{latest[1].unit}</p></div>
                            <div className={"wind inline"}><p>{latest[2].value}</p><p style={{ marginRight: '15px'}}>{latest[2].unit}</p><p>{latest[0].direction}</p></div>
                            <div className={"cloud inline"}><p>{latest[3].value}</p><p>{latest[3].unit}</p></div>
                        </div>
                        : <p>Loading</p>
                    }
                </div>
            </div>
            <div className={"latest-data"}>
                <h1 className={"header-data"}>Measurements</h1>
                <div className={"data-container"}>
                    <div className={"inner-container"}>
                        <p>Temperature</p>
                        <p>Total Precipitation</p>
                        <p>Average WindSpeed</p>
                    </div>
                    {latest.length !==0 ?
                        <div className={"inner-container"}>
                            <div className={"temp inline"}><p>Min { getMinTempLastDay()} and Max {getMaxTempLastDay()}</p><p  style={{ marginRight: '15px'}}>{latest[0].unit}</p></div>
                            <div className={"precipitation inline"}><p>{getTotalPrecipitationLastDay()}</p><p  style={{ marginRight: '15px'}}>{latest[1].unit}</p></div>
                            <div className={"wind inline"}><p>{getAverageWindLastDay()}</p><p style={{ marginRight: '15px'}}>{latest[2].unit}</p></div>
                        </div>
                        : <p>Loading</p>
                    }
                </div>
        </div>
        </div>

    )
}

export default LatestData