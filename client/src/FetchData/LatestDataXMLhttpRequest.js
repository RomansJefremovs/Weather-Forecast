// import {url} from "./ForecastApiFetch";
//
// export const getDataXHR = (type,city) => {
//     let xhr = new XMLHttpRequest()
//     xhr.open("GET",url(type,city))
//     xhr.send()
//     let temp
//     xhr.onload = async ()=>{
//         if (xhr.status == 200){
//             temp = JSON.parse(xhr.responseText)
//             return temp
//         }else{
//             console.log("error loading the data")
//         }
//     }
// }