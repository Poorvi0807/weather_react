import React, { useState, useEffect } from 'react';
import LocationDropdown from './components/LocationDropdown';
import WeatherDisplay from './components/WeatherDisplay';
import { getCurrentWeather, getWeatherForecast } from './services/weatherService';
import './App.css';
const App = () => {
    const [selectedCity, setSelectedCity] = useState(() => 
        localStorage.getItem('selectedCity') || 'Ho Chi Minh'
    );
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        localStorage.setItem('selectedCity', selectedCity);
        const fetchWeather = async () => {
            const weatherResponse = await getCurrentWeather(selectedCity);
            const forecastResponse = await getWeatherForecast(selectedCity);
            setWeatherData({
                city: selectedCity,
                temp: (weatherResponse.data.main.temp - 273.15).toFixed(2),
                condition: weatherResponse.data.weather[0].description,
                forecast: forecastResponse.data.list
            });
        };
        fetchWeather();
    }, [selectedCity]);

    return (
        <div>
            <h1 style={{margin:'auto'}}>Weather Forecast</h1>
            <LocationDropdown selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
            <WeatherDisplay weatherData={weatherData} />
        </div>
    );
};

export default App;
