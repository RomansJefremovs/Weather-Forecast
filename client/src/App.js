import './App.css';
import {useEffect,useState} from "react"
import LatestData from "./Components/LatestData/data.index";
import ForecastBox from "./Components/ForecastBox/forecast.index";
import CityButton from "./Components/CityButton/button.index";
import {getForecast,url} from "./FetchData/ForecastApiFetch"

function App() {

    const [forecast,setForecast] = useState([])
    const [status, setStatus] = useState(false)
    const [city, setCity] = useState("Horsens")
    const effect = async ()=>{
        let temp = await getForecast(url("Aarhus"))
        setForecast(temp)
        setStatus(forecast!=[] ? true : false)
    }

    const handleClick = async ()=>{
        let temp = await getForecast(url(city))
        setForecast(temp)
    }
    // console.log(forecast)
    // console.log(status)
    // console.log(city)
    useEffect(()=>{
            effect()
    },[])
        const testObject = {
            time: "some date",
            temperature: {value: 13, unit: "C"},
            precipitation: {value: 0, unit: "mm", type: "rain"},
            wind: {value: 2, unit: "m/s", direction: "North"},
            cloud: {value: 100, unit: "%"}
        }
        const testObjectForecast = {
            time: "",
            temperature: {from: status ? forecast[0].from: 11 , to: forecast[0] ? forecast[0].to:11, unit: "C"},
            precipitation: {from: 11, to: 11, unit: "mm", type: "rain"},
            wind: {from: 11, to: 11, unit: "m/s", direction: "North"},
            cloud: {from: 11, to: 11, unit: "%"}
        }


        return (
            <div className="App">
                <LatestData
                    time={forecast[0] ? forecast[0].time : testObjectForecast.time}
                    temperature={testObject.temperature}
                    precipitation={testObject.precipitation}
                    wind={testObject.wind}
                    cloud={testObject.cloud}
                />
                <ForecastBox
                    time={status ? forecast[0].time : testObjectForecast.time}
                        temperature={testObjectForecast.temperature}
                    precipitation={testObjectForecast.precipitation}
                    wind={testObjectForecast.wind}
                    cloud={testObjectForecast.cloud}
                />
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
