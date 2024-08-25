import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import * as fs from "fs";


export function initStore(dataType) {
  const store = {
    file: `./models/${dataType}.json`,
    [dataType]: [],
  };
  const db = new Low(new JSONFile(store.file));
  if (!fs.existsSync(store.file)) {
    fs.writeFileSync(store.file, JSON.stringify(store));
  }
  return db;
}


export function getWeatherIcon(code){
  
  let weatherIcon = "";

  if (code >= 200 && code <= 232){
      weatherIcon = '../views/partials/icons/thunderstorm.hbs';
  } else if(code >= 300 && code <= 321){
      weatherIcon = '../views/partials/icons/drizzle';
  } else if(code >= 500 && code <= 531){
      weatherIcon = '../views/partials/icons/rain';
  } else if(code >= 600 && code <= 622){
      weatherIcon = '../views/partials/icons/snow';
  } else if(code >= 701 && code <= 781){
      weatherIcon = '../views/partials/icons/atmosphere';
  } else if (code == 800){
      weatherIcon = '../views/partials/icons/sun';
  } else if(code >= 801 && code <= 804){
      weatherIcon = '../views/partials/icons/cloudy';
  }

  return weatherIcon;
}
