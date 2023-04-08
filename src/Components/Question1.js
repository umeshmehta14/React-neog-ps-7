import React, { useEffect, useState } from 'react'
// Create a React component that fetches weather data from an API endpoint using useEffect hook and displays the current temperature, humidity, and wind speed on the screen using the useState hook. Add a button which toggles between Celsius and Fahrenheit units for the temperature.

// Multiply the °C temperature by 1.8. Add 32 to this number. This is the answer in °F.

//  °F = (°C × 9/5) + 32

// It's just as easy to convert Fahrenheit to Celcius;

// °C = (°F − 32) x 5/9

const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/weather") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            temperature: 21,
            humidity: 50,
            windSpeed: 10
          }
        });
      } else {
        reject({
          status: 404,
          message: "Weather data not found."
        });
      }
    }, 2000);
  });
};

const Question1 = () => {
    const [weatherData, setWeatherData] =  useState({});
    const [weatherData2, setWeatherData2] =  useState({});
    const [currentMeasurement, setCurrentMeasurement] =  useState("Fahrenheit");
    const [loading, setLoading] =  useState(true);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/weather")
            setWeatherData(response.data);
            setWeatherData2(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])
    const ChangeMeasurement = ()=>{
        if(currentMeasurement === "Fahrenheit")
        {

            const F = (weatherData2.temperature * 9/5) + 32;
            setWeatherData({...weatherData, temperature: Math.ceil(F)})
            setCurrentMeasurement("Celsius")
        }
        else{
            setWeatherData({...weatherData, temperature: weatherData2.temperature})
            setCurrentMeasurement("Fahrenheit")
        }
    }
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <div>
        <p>Temperature:{weatherData.temperature}<sup>o</sup> {currentMeasurement === "Fahrenheit"?"C":"F"}</p>
        <p>Humidity:{weatherData.humidity}</p>
        <p>Wind Speed:{weatherData.windSpeed}</p>
      </div>
        <button onClick={ChangeMeasurement}>Switch to { currentMeasurement === "Fahrenheit"?"Fahrenheit":"Celsius"}</button>
    </div>
  )
}

export default Question1
