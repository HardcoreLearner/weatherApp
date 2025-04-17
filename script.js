const city = document.getElementById("city");

const searchBar = document.getElementById("searchBar");

const searchButton = document.getElementById("searchButton");

const content = document.querySelector(".content");

const weatherQuery = "https://api.weatherapi.com/v1/forecast.json?key=1067373fe0e8446aa5b174319232006&q=conakry&days=7";

const gifQuery = "https://api.giphy.com/v1/gifs/translate?api_key=jCUtpiCEEnK3GjtPG3MjC9bh4aRM4v4W&s=cats";

const abstractIPQuery = "https://ipgeolocation.abstractapi.com/v1/?api_key=96efabe9087b433a8cdd57df08b69d04";

// premiere co, on doit pouvoir trouver la city actuel et update cela dans le bail tout cela dans une fonction

async function firstConn() {
    // lookup IP and city
    let ipInfo = [];
    let forecast = {};
    await fetch(abstractIPQuery, {
        mode: 'cors',
    }).then(response => response.json()).then(response => ipInfo.push(response.city, response.ip_address));
    await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1067373fe0e8446aa5b174319232006&q=${ipInfo[0]}&days=7`, {
        mode: 'cors',
    }).then(response => response.json()).then(response => forecast = response.forecast.forecastday);
    forecast.forEach(elem => weatherCard(elem));
    city.textContent = ipInfo[0];
}

async function weatherCard(day) {
    const wCard = document.createElement("div");
    wCard.classList.add("wCard");

    const dateHolder = document.createElement("div");
    const dateTitle = document.createElement("div");
    dateTitle.classList.add("title");
    const dateP = document.createElement("p");
    const dateT = document.createElement("p");
    dateT.textContent = "Date";
    const date = day.date;
    dateP.textContent = date;
    dateP.classList.add("tempData");
    const dateImg = document.createElement("img");
    dateImg.src = "img/jour.svg";
    dateTitle.appendChild(dateImg);
    dateTitle.appendChild(dateT);
    dateHolder.appendChild(dateTitle);
    dateHolder.appendChild(dateP);

    const tempHolder = document.createElement("div");
    const tempTitle = document.createElement("div");
    tempTitle.classList.add("title");
    const tempP = document.createElement("p");
    const tempT = document.createElement("p");
    tempT.textContent = "Temperature";
    const temp = day.day.avgtemp_c + " °C";
    tempP.textContent = temp;
    tempP.classList.add("tempData");
    const tempImg = document.createElement("img");
    tempImg.src = "img/thermo.svg";
    tempTitle.appendChild(tempImg);
    tempTitle.appendChild(tempT);
    tempHolder.appendChild(tempTitle);
    tempHolder.appendChild(tempP);

    const humHolder = document.createElement("div");
    const humTitle = document.createElement("div");
    humTitle.classList.add("title");
    const humP = document.createElement("p");
    const humT = document.createElement("p");
    humT.textContent = "Humidity";
    const hum = day.day.avghumidity + " %";
    humP.textContent = hum;
    humP.classList.add("tempData");
    const humImg = document.createElement("img");
    humImg.src = "img/humi.svg";
    humTitle.appendChild(humImg);
    humTitle.appendChild(humT);
    humHolder.appendChild(humTitle);
    humHolder.appendChild(humP);

    const precHolder = document.createElement("div");
    const precTitle = document.createElement("div");
    precTitle.classList.add("title");
    const precP = document.createElement("p");
    const precT = document.createElement("p");
    precT.textContent = "Precipitation";
    const prec = day.day.totalprecip_mm + " mm";
    precP.textContent = prec;
    precP.classList.add("tempData");
    const precImg = document.createElement("img");
    precImg.src = "img/rain.svg";
    precTitle.appendChild(precImg);
    precTitle.appendChild(precT);
    precHolder.appendChild(precTitle);
    precHolder.appendChild(precP);

    const illustration = document.createElement('img');
    let url = "";
    const gifText = day.day.condition.text;
    const gifUrl = day.day.condition.icon;

    wCard.appendChild(dateHolder);
    wCard.appendChild(tempHolder);
    wCard.appendChild(humHolder);
    wCard.appendChild(precHolder);
    wCard.appendChild(illustration);

    content.appendChild(wCard);

    await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=jCUtpiCEEnK3GjtPG3MjC9bh4aRM4v4W&s=${gifText}`, {
    mode: 'cors'
    }).then(response => response.json()).then(response => url = response.data.images.original.url).catch(err => url = gifUrl);
    illustration.src = url;
}

async function searchWeather() {
    const searchCity = searchBar.value;
    let forecast = {};
    if (searchCity.length == 0) {
        alert("You must first write a city in the searchbar!");
    } else if (typeof(searchCity) != "string") {
        alert("You must write a city name")
    } else {
        await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1067373fe0e8446aa5b174319232006&q=${searchCity}&days=7`, {
            mode: 'cors',
        }).then(response => response.json()).then(response => forecast = response.forecast.forecastday).catch(err => alert("Check your input! Message Error : " + err));
        content.innerHTML = "";
        forecast.forEach(elem => weatherCard(elem));
        city.textContent = searchCity;
    }
}

searchButton.addEventListener("click", searchWeather)

firstConn();

// chercher l'api avec les 7 prochains jours

// maintenant quand la personne cherche le truc de l'endroit en question