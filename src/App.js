import React,{useState} from 'react';
import './App.css';
import * as ReactBootStrap from 'react-bootstrap';
const api = {
  key: "60942fad27208e8a0d76fbbe9c783c61",
  base: "https://api.openweathermap.org/data/2.5/"
}
// City not Found I have to Add
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setloading] = useState(false);

  const search = evt => {
    if (evt.key === "Enter") {
      setloading(true);
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setloading(false);
          console.log(result);
        });
    }
  }
  const search1 = () =>{
    setloading(true);
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setloading(false);
          console.log(result);
        });
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='app'>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="btn" onClick={search1}>CHECK</button>
        </div>
        {(loading===true)?(
  
            <div class="loading"></div>
          
        ):('')}
        {(typeof weather.main != "undefined" && loading===false) ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ((weather.cod === "404") ? (
        <div className="not-found"><div className="inner">{weather.message}</div></div>
        ) : (''))}
      </main>
    </div>
  );
}

export default App;
