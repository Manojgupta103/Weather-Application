var apiKey;
{
    apiKey = "1f0328296aa7f220db9bc85104cd6593";
}

const url = "https://api.openweathermap.org/data/2.5/weather"

const searchBox = document.getElementById("search-box");
const searchBtn = document.getElementById("search-btn");
const errorMsg = document.getElementById("error-msg");
const mainCard = document.getElementById("main-card");
const temp = document.getElementById("temperature");
const city = document.getElementById("city");
const timeDate = document.getElementById("time-date");

const img = document.getElementById("image");
const weatherMain = document.getElementById("weather-main");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const visibility = document.getElementById("visibility");

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const iconMapping = {
    "01": "clear sky",
    "02": "few clouds",
    "03": "scattered clouds",
    "04": "broken clouds",
    "09": "shower rain",
    "10": "rain",
    "11": "thunderstorm",
    "13": "snow",
    "50": "mist"
}

async function getWeather(query){
    const res = await fetch(url + "?q=" + query + "&appid=" + apiKey + "&units=metric");
    if(res.status === 404){
        errorMsg.innerText = "City Not Found"
        errorMsg.classList.remove("hidden");
        searchBox.classList.add("border-2");
        searchBox.classList.add("border-red-700");
        searchBox.classList.add("h-full");
        mainCard.classList.add("hidden");
        var e = setInterval(()=>{
            errorMsg.classList.add("hidden");
            searchBox.classList.remove("border-2");
            searchBox.classList.remove("border-red-700");
            searchBox.classList.remove("h-full");
        },8000);
    }
    else{
        var data = await res.json();
        temp.innerText = (Math.round((data.main.temp) * 10) / 10) + "°C";
        city.innerText = data.name;
        const t = new Date(Date.now());
        console.log(t);
        console.log(data.timezone);
        const hour = ('0' + t.getHours()).slice(-2);
        const mins = ('0' + t.getMinutes()).slice(-2);
        const date = ('0' + t.getDate()).slice(-2);
        const month = monthNames[t.getMonth()];
        const year = t.getFullYear();
        timeDate.innerHTML = `${hour}<span id="seconds">:</span>${mins} | ${date} ${month} ${year}`;
        const seconds = document.getElementById("seconds");
        var s = setInterval(()=>{
            seconds.classList.toggle("invisible");
        },1000);
        const icon = data.weather[0].icon;
        const key = icon.substr(0,2);
        img.setAttribute("src","images/" + iconMapping[key] + ".png");
        img.setAttribute("alt",data.weather[0].description);
        weatherMain.innerText = data.weather[0].main;
        wind.innerHTML = `${data.wind.speed} m/s`;
        humidity.innerHTML = `${data.main.humidity} %`;
        pressure.innerHTML = `${data.main.pressure} hPa`;
        visibility.innerHTML = `${data.visibility} m`;

        searchBox.value = "";
        mainCard.classList.remove("hidden");
    }
}

searchBtn.addEventListener("click",()=>{
    if(searchBox.value === ""){
        errorMsg.innerText = "Please Enter a City";
        errorMsg.classList.remove("hidden");
        searchBox.classList.add("border-2");
        searchBox.classList.add("border-red-700");
        searchBox.classList.add("h-full");
        mainCard.classList.add("hidden");
        var e = setInterval(()=>{
            errorMsg.classList.add("hidden");
            searchBox.classList.remove("border-2");
            searchBox.classList.remove("border-red-700");
            searchBox.classList.remove("h-full");
        },5000);
    }
    else{
        getWeather(searchBox.value);
    }
})
