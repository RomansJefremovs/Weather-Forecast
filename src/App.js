import './App.css';
import LatestData from "./Components/LatestData";

function App() {
    const testObject = {
        time: "some date",
        temperature: {value:13,unit:"C"},
        precipitation:{value:0,unit:"mm",type:"rain"},
        wind:{value:2 ,unit:"m/s", direction:"North"},
        cloud:{value:100, unit:"%"}
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
    </div>
  );
}

export default App;
