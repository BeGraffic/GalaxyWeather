const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}&units=metric&lang=es&exclude=minutely,hourly,alerts`
  )
  const data = await response.json()
  const send = { ...data, name: city.name }
  return send
}
