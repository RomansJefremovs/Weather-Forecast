import './App.css';
import {useEffect,useState} from "react"
import LatestData from "./Components/LatestData/data.index";
import ForecastBox from "./Components/ForecastBox/forecast.index";
import CityButton from "./Components/CityButton/button.index";
import Measurement from "./Components/Measurement/measurement.index"
import {getForecast,url} from "./FetchData/ForecastApiFetch"

function App() {

    const [forecast,setForecast] = useState([])
    const [status, setStatus] = useState(false)
    const [city, setCity] = useState("Horsens")
    const [testObj, setTestObj] = useState({
        from:0,
        to:0,
        type:"",
        unit:"",
        time:""
    })

    const effect = async ()=>{
        let temp = await getForecast(url("Aarhus"))
        setForecast(temp)
        setStatus(forecast!=[] ? true : false)
    }

    const handleClick = async ()=>{
        let temp = await getForecast(url(city))
        setForecast(temp)
        console.log(forecast)
    }

    useEffect(()=>{
            effect()
        setTestObj(forecast[0])
        console.log(forecast)
    },[status])

        // const testObject = {
        //     time: "some date",
        //     temperature: {value: 13, unit: "C"},
        //     precipitation: {value: 0, unit: "mm", type: "rain"},
        //     wind: {value: 2, unit: "m/s", direction: "North"},
        //     cloud: {value: 100, unit: "%"}
        // }

        // const testObjectForecast = {
        //     time: "",
        //     temperature: {from: status ? forecast[0].from: 11 , to: forecast[0] ? forecast[0].to:11, unit: "C"},
        //     precipitation: {from: 11, to: 11, unit: "mm", type: "rain"},
        //     wind: {from: 11, to: 11, unit: "m/s", direction: "North"},
        //     cloud: {from: 11, to: 11, unit: "%"}
        // }

        // const ForecastMapping = forecast.map((obj) => {
        //
        //     return <ForecastBox
        //             obj1={obj}
        //             obj2={obj}
        //             obj3={obj}
        //             obj4={obj}
        //     />
        // })

        return (
            <div className="App">
                {/*<LatestData*/}
                {/*    time={forecast[0] ? forecast[0].time : testObjectForecast.time}*/}
                {/*    temperature={testObject.temperature}*/}
                {/*    precipitation={testObject.precipitation}*/}
                {/*    wind={testObject.wind}*/}
                {/*    cloud={testObject.cloud}*/}
                {/*/>*/}
                {/*<div>{ForecastMapping}</div>*/}

                <p>{status ? "All Good":"Loading"}</p>
                {/*<ForecastBox*/}
                {/*    obj1={testObj}*/}
                {/*    obj2={testObj}*/}
                {/*    obj3={testObj}*/}
                {/*    obj4={testObj}*/}
                {/*/>*/}
                <CityButton city={"Aarhus"} cb={()=>{
                    setCity("Aarhus")
                    handleClick()
                }}/>
                <CityButton city={"Horsens"} cb={() => {
                    setCity("Horsens")
                    handleClick()
                }}/>
                <CityButton city={"Copenhagen"} cb={() => {
                    setCity("Copenhagen")
                    handleClick()
                }}/>

            </div>
        );
    }
export default App;
