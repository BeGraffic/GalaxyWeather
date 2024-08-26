<script setup lang="ts">
import ActualData from '@/components/ActualData.vue'
import BackgroundsView from '@/components/BackgroundsView.vue'
import ForecastData from '@/components/ForecastData.vue'
import ListRecords from '@/components/ListRecords.vue'
import SearchBar from '@/components/SearchBar.vue'

// @ts-ignore
import { getWeatherData } from '@/controllers/WeatherService'
</script>

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
            <ActualData :dataActual="weatherData" />
            <ForecastData :dataForecast="weatherData" />
            <ListRecords :dataList="historyChk" @confirm="handleHistory" @weather="handleDataFetched" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WheatherApp',

  props: [''],

  data() {
    return {
      fetch: true,
      showResult: false,
      weatherData: null as any,
      historyChk: false,
      city: {
        name: '',
        coord: {
          lat: null,
          lon: null
        }
      } as any
    }
  },

  mounted() {
    this.getLocation()
  },

  computed: {},

  components: {
    ActualData,
    BackgroundsView,
    ForecastData,
    ListRecords,
    SearchBar
  },

  methods: {
    async fetchWeather(city: any) {
      this.weatherData = await getWeatherData(city)
      this.fetch = false
      this.showResult = true
    },

    handleHistory(data: any) {
      this.historyChk = data
    },

    handleDataFetched(data: any) {
      this.weatherData = data
    },

    getLocation() {
      if (navigator.geolocation) {
        setTimeout(() => {
          this.fetch = false
        }, 10000)
        navigator.geolocation.getCurrentPosition(this.setPosition)
      } else {
        this.fetch = false
      }
    },
    setPosition(position: any) {
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
