/* Global Variables */
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "02b1e54fe4fd83b66a92178e84e1c3ef"; // Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + "." + d.getDate() + "." + d.getFullYear();


const userInfo = document.getElementById("userInfo");

// event listener to work with the button press
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", performAction);

function performAction(e) {
  e.preventDefault();

  //get html elements to be in hands
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;

  if (zipCode !== "") {
    generateBtn.classList.remove("invalid");
    getWeatherData(baseUrl, zipCode, apiKey)
      .then(function (data) {
        // add data to POST request
        postData("/add", {
          temp: kelvintocel(data.main.temp),
          date: newDate,
          content: content,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        });
      })
      .then(function () {
        // update ui to reflect for the browser
        updateUI();
      })
      .catch(function (error) {
        console.log(error);
        alert("The zip code is invalid. Try again");
      });
    userInfo.reset();
  } else {
    generateBtn.classList.add("invalid");
  }
}

/* getting api info from server */
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* postdata function to apply to the ui */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log(allData);
    // update new entry values

    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("humidity").innerText = allData.humidity;
    document.getElementById("wind").innerText = allData.wind;
  } catch (error) {
    console.log("error", error);
  }
};

// helper function to convert temperature from Kelvin to Celsius
function kelvintocel(kelvin) {
  if (kelvin < 0) {
    return " ";
  } else {
    return (kelvin - 273.15).toFixed(2);
  }
}
// prevent typing non numerical values in
document.getElementById("zip").addEventListener("keypress", function (evt) {
  if (evt.which < 48 || evt.which > 57) {
    evt.preventDefault();
  }
});