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
    const effect = async ()=>{
        let temp = await getForecast(url("Aarhus"))
        temp.forEach((item,i) => {
            item.id = i + 1
        })
        let resultArray = testFor(temp)
        setForecast(resultArray)
        setStatus(forecast.length != 0 ? true : false)
    }
   // con

    const handleClick = async (city)=>{
        let temp = await getForecast(url(city))
        let resultArray = testFor(temp)
        setForecast(resultArray)
        console.log(resultArray)
    }

    // console.log(forecast)
    useEffect(()=>{
            effect()
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
                <CityButton city={"Aarhus"} cb={()=>{
                    // setCity()
                    handleClick("Aarhus")
                    // console.log(forecast)
                }}/>
                <CityButton city={"Horsens"} cb={() => {
                    handleClick("Horsens")
                    // console.log(forecast)
                }}/>
                <CityButton city={"Copenhagen"} cb={() => {
                    // setCity()
                    handleClick("Copenhagen")
                    // console.log(forecast)
                }}/>
                <DisplayForecast/>
            </div>
        );
    }
export default App;
