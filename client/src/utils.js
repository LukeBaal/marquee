
export const tempSuffix = (value, type) => {
  if (!value) return "";
  let unit = "K";
  if (type === "metric") {
    unit = "°C";
  } else if (type === "imperial") {
    unit = "°F";
  }
  return `${value}${unit}`;
}