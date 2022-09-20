import './App.css';
import LatestData from "./Components/LatestData/data.index";
import ForecastBox from "./Components/ForecastBox/forecast.index";
import CityButton from "./Components/CityButton/button.index";

function App() {
    const testObject = {
        time: "some date",
        temperature: {value:13,unit:"C"},
        precipitation:{value:0,unit:"mm",type:"rain"},
        wind:{value:2 ,unit:"m/s", direction:"North"},
        cloud:{value:100, unit:"%"}
    }
    const testObjectForecast = {
        time: "some date",
        temperature: {from:11,to:11,unit:"C"},
        precipitation:{from:11,to:11,unit:"mm",type:"rain"},
        wind:{from:11,to:11,unit:"m/s", direction:"North"},
        cloud:{from:11,to:11, unit:"%"}
    }
  return (
    <div className="App">
      <LatestData
          time={testObject.time}
          temperature={testObject.temperature}
          precipitation={testObject.precipitation}
          wind={testObject.wind}
          cloud={testObject.cloud}
      />
        <ForecastBox
            time={testObjectForecast.time}
            temperature={testObjectForecast.temperature}
            precipitation={testObjectForecast.precipitation}
            wind={testObjectForecast.wind}
            cloud={testObjectForecast.cloud}
        />
        <CityButton city={"Aarhus"} cb={()=>{}}/>
    </div>
  );
}

export default App;
