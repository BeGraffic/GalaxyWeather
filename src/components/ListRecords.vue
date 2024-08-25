<template>
  <div class="mt-16">
    <p class="text-white text-xl font-medium">Búsquedas recientes</p>
    <div class="flow-root mt-5">
      <div class="-mx-4 -my-2 overflow-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <tbody class="divide-y-2">
              <tr v-for="(item, index) in historicalData" :key="index" class="even:bg-white/10">
                <td class="text-white">
                  <button
                    @click="handleDelete(index)"
                    class="border border-white/50 bg-white/20 h-8 w-8 rounded-lg hover:bg-red-500/50 ml-5"
                  >
                    X
                  </button>
                </td>
                <td class="py-4 pl-4 pr-3sm:pl-3">
                  <p class="lg:text-xl text-lg font-bold text-white">{{ item.name }}</p>
                  <p class="text-sm font-medium text-white/50">{{ item.weather[0].main }}</p>
                  <button
                    @click="fetchWeather(item)"
                    class="text-orange-600 hover:text-orange-900 lg:hidden"
                  >
                    Ver tiempo
                  </button>
                </td>
                <td class="px-3 py-4 lg:text-6xl text-4xl text-white">
                  {{ Math.round(item.temp) }}&deg;
                </td>

                <td class="px-3 py-4 text-sm text-white/50 hidden lg:block my-auto">
                  {{ new Date(item.dt * 1000).toLocaleDateString() }}
                </td>

                <td
                  class="relative py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 hidden lg:block"
                >
                  <button @click="fetchWeather(item)" class="text-orange-600 hover:text-orange-900">
                    Ver tiempo
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getWeatherData } from '../controllers/weatherService'
</script>

<script>
export default {
  name: 'ListRecords',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      historicalData: [],
      weatherData: null
    }
  },

  mounted() {
    this.getHistoricalData()
  },

  computed: {},

  components: {},

  methods: {
    getHistoricalData() {
      const historicalData = localStorage.getItem('historicalData')
      if (historicalData) {
        this.historicalData = JSON.parse(historicalData)
      }
      this.$emit('confirm', false)
    },

    async fetchWeather(city) {
      this.weatherData = await getWeatherData(city)
      this.$emit('weather', this.weatherData)
    },

    handleDelete(index) {
      this.historicalData.splice(index, 1)
      localStorage.setItem('historicalData', JSON.stringify(this.historicalData))
    }
  },

  watch: {
    data() {
      if (this.data) {
        this.getHistoricalData()
      }
    }
  },

  created() {}
}
</script>

<style scoped></style>
