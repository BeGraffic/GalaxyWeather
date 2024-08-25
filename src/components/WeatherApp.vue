<template>
  <div class="h-screen w-screen bg-red-500 overflow-y-hidden">
    <div class="relative">
      <div class="absolute">
        <BackgroundsView :data="weatherData" />
      </div>

      <div class="absolute bg-black/60 w-screen h-screen"></div>

      <div class="absolute w-screen h-screen overflow-y-auto pb-48">
        <div class="lg:max-w-7xl mx-auto px-5 xl:px-0">
          <div class="lg:mt-20 mt-10 lg:flex lg:justify-between">
            <h1 class="text-2xl text-white my-auto font-bold text-center lg:text-left">
              Galaxy Weather
            </h1>
            <SearchBar @weather="handleDataFetched" @historyCheck="handleHistory" />
          </div>

          <div class="mt-20" v-if="fetch">
            <p class="text-white/80 text-center text-lg animate-pulse">
              Cargando datos de su ubicación actual..
            </p>
          </div>

          <div class="" v-if="showResult">
            <ActualData :data="weatherData" />
            <ForecastData :data="weatherData" />
            <ListRecords :data="historyChk" @confirm="handleHistory" @weather="handleDataFetched" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ActualData from './ActualData.vue'
import BackgroundsView from './BackgroundsView.vue'
import ForecastData from './ForecastData.vue'
import ListRecords from './ListRecords.vue'
import SearchBar from './SearchBar.vue'

import { getWeatherData } from '../controllers/weatherService'
</script>

<script>
export default {
  name: 'WheatherApp',

  props: [''],

  data() {
    return {
      fetch: true,
      showResult: false,
      weatherData: null,
      historyChk: false,
      city: {
        name: '',
        coord: {
          lat: null,
          lon: null
        }
      }
    }
  },

  mounted() {
    this.getLocation()
  },

  computed: {},

  components: {},

  methods: {
    async fetchWeather(city) {
      this.weatherData = await getWeatherData(city)
      this.fetch = false
      this.showResult = true
    },

    handleHistory(data) {
      this.historyChk = data
    },

    handleDataFetched(data) {
      this.weatherData = data
    },

    getLocation() {
      if (navigator.geolocation) {
        setTimeout(() => {
          this.fetch = false
        }, 10000)
        navigator.geolocation.getCurrentPosition(this.setPosition, this.showError)
      } else {
        this.fetch = false
      }
    },
    setPosition(position) {
      this.city.coord.lat = position.coords.latitude
      this.city.coord.lon = position.coords.longitude
      this.city.name = 'Mi ubicación'
      this.fetchWeather(this.city)
    }
  },

  watch: {},

  created() {}
}
</script>

<style scoped></style>
