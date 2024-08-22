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

export function sortListAlphabeticallyByName(inputList) {
  return inputList.sort((a,b) => a.name.localeCompare(b.name));
}

export function sortByDate(inputList){
  return inputList.sort((a,b) => Date.parse(b) - Date.parse(a))
}

