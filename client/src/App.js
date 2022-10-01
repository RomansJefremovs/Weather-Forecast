import './App.css';
import {useEffect,useState} from "react"
import React from "react";
import LatestData from "./Components/LatestData/data.index";
import ForecastBox from "./Components/ForecastBox/forecast.index";
import CityButton from "./Components/CityButton/button.index";
import Measurement from "./Components/Measurement/measurement.index"
import {getForecast,url} from "./FetchData/ForecastApiFetch"

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


function App() {
    //
    const [forecast,setForecast] = useState([])
    // const [data,setData] = useState([])
    // const [latest,setLatest] = useState([])
    // const [status, setStatus] = useState("")

    //
    const testFor = (arr)=> {
        let resultArr = []
        for (let i = 0; i < arr.length; i = i + 4) {
            let measurements = {}
            measurements.temperature = arr[i]
            measurements.precipitation = arr[i + 1]
            measurements.wind = arr[i + 2]
            measurements.cloud = arr[i + 3]
            resultArr.push(measurements)
        }
        return resultArr
    }

    const getForecastFiltered = async ()=>{
        let temp = await getForecast(url("forecast","Aarhus"))
        temp.forEach((item,i) => {
            item.id = i + 1
        })
        let resultArray = testFor(temp)
        setForecast(resultArray)
        // forecast.length !==0 ? setStatus("Forecast Ready"): setStatus("Forecast Not Ready")
    }
    const handleClick = async (type,city)=>{
        let temp = await getForecast(url(type,city))
        let resultArray = testFor(temp)
        setForecast(resultArray)
    }

    // console.log(forecast)
    useEffect(()=>{
            getForecastFiltered()
        },[])

        const DisplayForecast = () => {
            if (forecast.length === 24){
                return forecast.map(item => {
                    return (<ForecastBox
                        obj1={item.temperature}
                        obj2={item.precipitation}
                        obj3={item.wind}
                        obj4={item.cloud}
                    />)
                })
            } else {
             return <p>Loading</p>}
        }

        return (
            <BrowserRouter>
                <div className="App">
                    <div>
                        <Link to={"/"}>Forecast</Link>
                        <Link to={"/latest"} >Latest Data</Link>
                    </div>

                    <Routes>
                        <Route exact path={"/"} element={
                           <div>
                               <CityButton city={"Aarhus"} cb={()=>{
                                   // setCity()
                                   handleClick("forecast","Aarhus")
                                   // console.log(forecast)
                               }}/>
                               <CityButton city={"Horsens"} cb={() => {
                                   handleClick("forecast","Horsens")
                                   // console.log(forecast)
                               }}/>
                               <CityButton city={"Copenhagen"} cb={() => {
                                   // setCity()
                                   handleClick("forecast","Copenhagen")
                                   // console.log(forecast)
                               }}/>
                               <DisplayForecast />
                           </div>
                        } />
                        <Route  path={"/latest"} element={
                            // <p>{latest.length != 0 ? latest[0]:"Loading"}</p>
                            <LatestData />

                        }>

                            {/*<LatestData*/}
                            {/*    time={forecast[0] ? forecast[0].time : testObjectForecast.time}*/}
                            {/*    temperature={testObject.temperature}*/}
                            {/*    precipitation={testObject.precipitation}*/}
                            {/*    wind={testObject.wind}*/}
                            {/*    cloud={testObject.cloud}*/}
                            {/*/>*/}
                            {/*<div>{ForecastMapping}</div>*/}
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>

        );
    }
export default App;
