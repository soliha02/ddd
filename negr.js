const btn = document.getElementById("send");
const input = document.getElementById("input");
const weatherImg = document.getElementById("weatherImg");
const err = document.getElementById("err");
const tempElement = document.getElementById("temp");
const desElement = document.getElementById("des");
const apiKey = '8555218b286904fc67d31906dd9fb0be';

btn.addEventListener("click", () => {
    const city = input.value;
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(json => weatherView(json))
        .catch(error => {
            err.style.display = "none";
            err.textContent = "Error fetching data!";

        });
});

function weatherView(data) {

    if (data.cod === '404') {
        err.style.display = "block";
        err.textContent = "SHAHAR KIRITING!!!!";
        tempElement.textContent = "";
        desElement.textContent = "";

    } else {
        err.style.display = "none";
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Capitalize first letter

        tempElement.textContent = `${temperature} °C`;
        desElement.textContent = description;
   console.log(data.weather[0].main);
   
   
        switch (data.weather[0].main) {
            case "Clear":
                weatherImg.src = "./sun.png";
                break;
            case "Rain":
                weatherImg.src = "./rain.png";
                break;
            case "Snow":
                weatherImg.src = "./snow.png";
                break;
            case "Clouds":
                weatherImg.src = "./cloud.png";
                break;

        }


        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed);
        document.querySelector('.bottom div:nth-child(1) h3').textContent = `${humidity} % \nHumidity`;
        document.querySelector('.bottom div:nth-child(2) h3').textContent = `${windSpeed} km/hour \nWind Speed`;

        input.value = "";
    }
}
