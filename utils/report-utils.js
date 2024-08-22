
export function cardinalDirectionToDegrees(cardinalDirection) {
  switch(cardinalDirection) {
    case "N":
      return 0;
    case "NNE":
      return 22.5;
    case "NE":
      return 45;
    case "ENE":
      return 67.5;
    case "E":
      return 90;
    case "ESE":
      return 112.5;
    case "SE":
      return 135;
    case "SSE":
      return 157.5;
    case "S":
      return 180;
    case "SSW":
      return 202.5;
    case "SW":
      return 225;
    case "WSW":
      return 247.5;
    case "W":
      return 270;
    case "WNW":
      return 292.5;
    case "NW":
      return 315;
    case "NNW":
      return 337.5;
    default:
      return 0;
  }
}
export function degreesToCardinalDirection(degrees) {
  position = int((degrees/22.5)+.5)
  cardinalDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW" ];
  return cardinalDirections[(position % 16)];
}


