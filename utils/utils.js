//Validate email when signing up/updating user
export function validateEmail(email) {
    //if email string does not contain '@' 
    if (email.indexOf('@') > -1) {
      const emailArray = email.split('@');
      if( emailArray.length == 2 ){
        return true;
      }
    }
    return false;
  }
  
  //STATION UTILS
  //Sort stations alphabetically on Dashboard
  export function sortListAlphabeticallyByName(inputList) {
    return inputList.sort((a,b) => a.name.localeCompare(b.name));
  }
  
  //Convert temperature Kelvin to Celcius
  export function kelvinToCelcius(tempKelvin){
    const celcius = tempKelvin - 273;
    return celcius.toFixed(1);
  }
  
  //Convert temperature Kelvin to Fahrenheit
  export function kelvinToFahrenheit(tempKelvin){
    const fahrenheit = ((tempKelvin-273.15)*1.8)+32;
    return fahrenheit.toFixed(1);
  }
  
  //REPORT UTILS
  //Assign value to cardinal direcction points
  export function cardinalDirectionToDegrees(cardinalDirection) {
    switch(cardinalDirection) {
      case "N":
        return 0 +' N';
      case "NNE":
        return 22.5 +' NNE';
      case "NE":
        return 45 +' NE';
      case "ENE":
        return 67.5 +' ENE';
      case "E":
        return 90 +' E';
      case "ESE":
        return 112.5 +' ESE';
      case "SE":
        return 135 +' SE';
      case "SSE":
        return 157.5 +' SSE';
      case "S":
        return 180 +' S';
      case "SSW":
        return 202.5 +' SSW';
      case "SW":
        return 225 +' SW';
      case "WSW":
        return 247.5 +' WSW';
      case "W":
        return 270 +' W';
      case "WNW":
        return 292.5 +' WNW';
      case "NW":
        return 315 +' NW';
      case "NNW":
        return 337.5 +' NNW';
      default:
        return 0;
    }
  }
  
  //Convert degrees to its cardinal direction point
  export function degreesToCardinalDirection(degrees) {
    const position = Math.floor((degrees/22.5)+.5)
    const cardinalDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" ];
    return cardinalDirections[(position % 16)];
  }
  
  //Get the correcty icon based on weather code from the API
  export function getWeatherIcon(code){
    let weatherIcon = "";
  
    if (code >= 200 && code <= 232){
        weatherIcon = 'icons/thunderstorm';
    } else if(code >= 300 && code <= 321){
        weatherIcon = 'icons/drizzle';
    } else if(code >= 500 && code <= 531){
        weatherIcon = 'icons/rain';
    } else if(code >= 600 && code <= 622){
        weatherIcon = 'icons/snow';
    } else if(code >= 701 && code <= 781){
        weatherIcon = 'icons/atmosphere';
    } else if (code == 800){
        weatherIcon = 'icons/sun';
    } else if(code >= 801 && code <= 804){
        weatherIcon = 'icons/cloudy';
    }
    return weatherIcon;
  }

  export function msToBeaufort(windSpeed) {
    windSpeed = Math.abs(windSpeed);
    if (windSpeed <= 0.2) {
        return 0;
    }
    if (windSpeed <= 1.5) {
        return 1;
    }
    if (windSpeed <= 3.3) {
        return 2;
    }
    if (windSpeed <= 5.4) {
        return 3;
    }
    if (windSpeed <= 7.9) {
        return 4;
    }
    if (windSpeed <= 10.7) {
        return 5;
    }
    if (windSpeed <= 13.8) {
        return 6;
    }
    if (windSpeed <= 17.1) {
        return 7;
    }
    if (windSpeed <= 20.7) {
        return 8;
    }
    if (windSpeed <= 24.4) {
        return 9;
    }
    if (windSpeed <= 28.4) {
        return 10;
    }
    if (windSpeed <= 32.6) {
        return 11;
    }
    return 12;
}

export function msToMph(windSpeed){
  let mph = windSpeed/0.44704;
  return Math.round(mph);
}

export function windChill(kelvinToFahrenheit, windSpeedMph){
  let windChillFormula= (35.74 + (0.6215 * kelvinToFahrenheit)) - (35.75 * Math.pow(windSpeedMph,0.16)) + (0.4275 * kelvinToFahrenheit * Math.pow(windSpeedMph,0.16)); ;
  let windChill= Math.round(windChillFormula);
  return windChill;
}