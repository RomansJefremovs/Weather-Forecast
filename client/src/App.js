import './App.css';
import {useEffect,useState} from "react"
import React from "react";
import LatestData from "./Components/LatestData/data.index";
import ForecastBox from "./Components/ForecastBox/forecast.index";
import CityButton from "./Components/CityButton/button.index";
import SendData from "./Components/SendData/send.index"
import {getForecast,url} from "./FetchData/ForecastApiFetch"
import SunLogo from "./sunlogo.png"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


function App() {

    const [forecast,setForecast] = useState([])

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
    }

    const handleClick = async (type,city)=>{
        let temp = await getForecast(url(type,city))
        let resultArray = testFor(temp)
        setForecast(resultArray)
    }

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
                    <div className={"navbar"}>
                        <img alt={"logo"} src={SunLogo}/>
                        <div className={"links"}>
                            <Link to={"/"} style={{ textDecoration: 'none'}}>Forecast</Link>
                            <Link to={"/latest"} style={{ textDecoration: 'none'}}>Latest Data</Link>
                            <Link to={"/send"} style={{ textDecoration: 'none'}}>Send Data</Link>
                        </div>
                    </div>
                    <Routes>
                        <Route exact path={"/"} element={
                           <div className={"forecast-app"}>
                               <div className={"switch"}>
                                   <CityButton city={"Aarhus"}
                                               cb={()=>{
                                       handleClick("forecast","Aarhus")
                                   }}
                                   />
                                   <CityButton city={"Horsens"} cb={() => {
                                       handleClick("forecast","Horsens")
                                   }}/>
                                   <CityButton city={"Copenhagen"} cb={() => {
                                       handleClick("forecast","Copenhagen")
                                   }}/>
                               </div>
                               <DisplayForecast className={"display-forecast"}/>
                           </div>
                        } />
                        <Route  path={"/latest"} element={
                            <LatestData />
                        }>
                        </Route>
                        <Route  path={"/send"} element={
                            <SendData />
                        }>
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>

        );
    }
export default App;
