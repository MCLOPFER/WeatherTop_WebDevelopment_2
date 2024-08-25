export function sortListAlphabeticallyByName(inputList) {
  return inputList.sort((a,b) => a.name.localeCompare(b.name));
}

export function kelvinToCelcius(tempKelvin){
  const celcius = tempKelvin - 273;
  return celcius.toFixed(1);
}

export function kelvinToFahrenheit(tempKelvin){
  const fahrenheit = ((tempKelvin-273.15)*1.8)+32;
  return fahrenheit.toFixed(1);
}



