<script>
  import { onMount } from 'svelte';
  import Generic from './Generic.svelte';

  export let app;
  let weatherApp = app;

  const tempSuffix = (value, type) => {
      if (!value) return "";
      let unit = "K";
      if (type === "metric") {
        unit = "°C";
      } else if (type === "imperial") {
        unit = "°F";
      }
      return `${value} ${unit}`;
    }

  onMount(async () => {
    try {
      if (app.subtitle) {
        return;
      }
      let locationQuery;
      if (app.locationId) {
        locationQuery = `id=${app.locationId}`;
      } else {
        locationQuery = `q=${app.location}`;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&appid=${app.apikey}&units=${app.units}`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      weatherApp = {
        ...app,
        id: data.id,
        name: data.name,
        temp: parseInt(data.main.temp).toFixed(1),
        logo: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        logoAlt: data.weather[0].description,
        conditions: data.weather[0].description
      }
    } catch (err) {
      console.log(err);
    }
  });
</script>

<Generic app={weatherApp}>
  <img slot="logo" class={`app-icon ${weatherApp.background}`} src={weatherApp.logo} alt={weatherApp.logoAlt}>
  <span slot="content">Temp: {tempSuffix(weatherApp.temp, weatherApp.units)}</span>
</Generic>

<style>
  .app-icon {
    background: #909090;
  }

  .app-icon.circle {
    border-radius: 50%;
  }
</style>