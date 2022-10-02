import React from "react"
import "./measurement.style.css"


const Measurement = ({type,from,to,unit,precipitation_types,directions})=>{
    precipitation_types = precipitation_types || 0
    directions = directions || 0
    return(
        <div className={"measurement"}>
            <div>
                <p>{`The ${type} ${precipitation_types !=0 ? precipitation_types: directions != 0 ? directions : ""}`}</p>
                <p>{}</p>

            </div>
            <div className={"measurement-inline"}>
                <p>{`From ${from} `}</p> <p>{`  To ${to}  `}</p> <p>{unit}</p>
            </div>
        </div>
    )
}

export default Measurement