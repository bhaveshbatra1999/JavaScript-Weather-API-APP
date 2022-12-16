const API_KEY = `bf015677b08cd8b4783ddd14cb668f8e` 
/*  for authentication & authorization
    of our Response on openweather Server
 */

const form = document.querySelector("form")
/* 
    to get result, 
    call getWeather() function on submit,
    not refresh the page 
*/      

const search = document.querySelector("#searchBox")
// to get value of search input field //

const weather = document.querySelector("#weather")
// to modify weather details of City //

/*When Submit event is generated on FORM --------------------------*/
form.addEventListener("submit", function(event) 
    {
        if(search.value === "")
        {
            alert('Cannot Submit Empty Search Box')
        }
        else
        {
            getWeather(search.value)
            event.preventDefault();
        }
    }
    /*
        When form is submit (after entering the city),
        eventListner on click event will call function 
        getWeather() to fire API fetch Request
        (search.value === city) 
    */

    /*
        event.preventDefault();
            
        is for not allowing page to reload on click,
        as deafult nature of SUBMIT is to reload the page
    */
)
/*-------------------------------------------------------------------*/


/*This function is to fetch API--------------------------------------*/
const getWeather = async(city) => {
    /* 
        This function is asynchronous   
        and async bcoz it won't wait for response,
       and will go forward without Promise Complete(fetching API) 
    */

    weather.innerHTML = `<h2> Getting Data.. <h2>`
    // Loading will be display before Result(response) display

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    /*
        fetch details from specific URL with passing API_KEY 
        ${API_KEY} :- For valid Authentication and Authoriztion of our Request
        ${city} :- as we want details of that city which is inserted by uesr
    */
    
    const response = await fetch(url);
    /*  
        await :- Wait until Fetching is Completed, then go for next line 
        var rsponse will stored data(XML,HTML,JSON)
        after fetching data from URL  
    */

    const data = await response.json()
    // json() will convert text data into JSON fromat
     
    console.log(data);

    return showWeather(data)
    /* 
        after succesfull completion of geting result
        showResult will now called with JSON-Data as parameter
    */
}
/*-------------------------------------------------------------------*/


/*TO UPDATE HTML DATA after succesfull Data Fetch via API------------*/
const showWeather = (data) => {
    if (data.cod == "404") {
        alert(search.value+" NOT FOUND")
        return;

        /* 
            data.cod as in JSON RESPONSE it is COD="200/404/304" 
            i.e. if unknown city name was input by user 
        */
    }

    const weatherDescription = capitalizeFirstLetter(data.weather[0].description);
    /*
        This variable takes Capitalize String of Weather Description
        this is calling of capitalizeFirstLetter() 
        with parameter "data.weather[0].description"
    */

    weather.classList.add("show");
    /*
        this will show weather DIV only to display details 
        otherwise it will be not shown in Orignal HTML 
    */

    weather.innerHTML = `
            <div class="row_child1">
                <h2>Weather App - Bhavesh Batra</h2>
            </div>        

            <div class="weather_child2">
                <div>
                    <img src="../public/images/temperature.png" id="weatherICON" alt="">
                </div>
                
                <div class="weather_child2_temperature_child">
                    <h1>${data.main.temp}°C</h1>
                </div>

                <div class="weather_child2_mainWeather_child">
                    <p>${weatherDescription}</p>
                </div>
                
                <div class="weather_child2_city_child">
                    <img src="../public/images/location.png" width="22px" height="22px" alt="">
                    <p style="margin-left: .2em;">${data.name}, ${data.sys.country}</p>
                </div>
            </div>

            <div class="weather_child3">
                <div class="weather_child3_innerChild">
                    <img src="../public/images/temperature.png" width="50px" height="50px" alt="">
                    <div>
                        <p>${data.main.feels_like}°C</p>
                        <small>Feels Like</small>                        
                    </div>
                </div>
                <div class="weather_child3_innerChild weather_child3_innerChildBorder">
                    <img src="../public/images/humidity.png" width="50px" height="50px" alt="">
                    <div>
                        <p>${data.main.humidity}%</p>
                        <small>Humidity</small>                        
                    </div>
                </div>
                <div class="weather_child3_innerChild weather_child3_innerChildBorder">
                    <img src="../public/images/wind.png" width="50px" height="50px" alt="">
                    <div>
                        <p>${data.wind.speed} m/s</p>
                        <small>Wind Speed</small>                        
                    </div>
                </div>  
            </div>
    `
    /* 
        updation of html data of (weather id element)
        after succesfull fetching
         
        ${..} :- this is string interpolation in string to (replace variables with values)
    */

        if(data.weather[0].main==="Rain")
        {
            //if weather is Rain then get image of raining
            document.getElementById('weatherICON').src="../public/images/rain.png";  
        }

        else if(
            (data.weather[0].main==="Mist")||(data.weather[0].main==="Smoke")
            ||(data.weather[0].main==="Haze")||(data.weather[0].main==="Dust")
            ||(data.weather[0].main==="Fog")||(data.weather[0].main==="Squall")
            ||(data.weather[0].main==="Sand")||(data.weather[0].main==="Tornado")
            ||(data.weather[0].main==="Ash"))
        {
            //if weather is one of the option then get image of Haze
            document.getElementById('weatherICON').src="../public/images/haze.png";  
        }
        
        else if(data.weather[0].main==="Clear")
        {
            //if weather is clear then get image of clear
            document.getElementById('weatherICON').src="../public/images/clear.png";  
        }

        else if(data.weather[0].main==="Clouds")
        {
            //if weather is cloud then get image of cloud
            document.getElementById('weatherICON').src="../public/images/cloudy.png";  
        }

        else if(data.weather[0].main==="Drizzle")
        {
            //if weather is drizzle then get image of drizzle
            document.getElementById('weatherICON').src="../public/images/drizzle.png";  
        }

        else if(data.weather[0].main==="Thunderstorm")
        {
            //if weather is thunderstorm then get image of thunderstorm
            document.getElementById('weatherICON').src="../public/images/thunderstorm.png";  
        }

        else
        {
            //if weather is snow then get image of snow
            document.getElementById('weatherICON').src="../public/images/snow.png";  
        }
}
/*-------------------------------------------------------------------*/


/*-------------------------------------------------------------------*/
function capitalizeFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/*
    string.charAt(0).Uppercase() :- convert 1st character of string to uppercase (0th index)
    + :- concatenation
    string.slice(1) :- print whole string from 2nd character to end (1st index to last)

    this function is to convert 1st letter of Description String to Upper Case
    this function is called at line 100 when the return value is passed into 
    parameter "weatherDescription"
*/

/*-------------------------------------------------------------------*/
