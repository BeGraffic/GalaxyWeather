<template>
  <div class="mt-10 lg:mt-0">
    <div class="relative mt-2 rounded-md shadow-sm lg:w-[500px] w-full">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 lg:w-[500px] w-full"
      >
        <IconMagnify aria-hidden="true" class="h-5 w-5 text-white" />
      </div>
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Escribe tu ciudad"
        className="block lg:w-[500px] w-full rounded-full border-0 py-3 pl-10 text-white ring-1 bg-white/10 ring-inset ring-gray-300 placeholder:text-white/50 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
        v-model="search"
        @input="debouncedSearch"
      />
      <div
        v-if="push"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end pr-3 lg:w-[500px] w-full"
      >
        <IconArrowPath aria-hidden="true" class="h-5 w-5 text-white animate-spin" />
      </div>
    </div>

    <div class="absolute mt-4" v-if="cities">
      <div
        class="bg-white/90 lg:w-[500px] w-full max-h-[300px] relative rounded-2xl overflow-y-auto"
      >
        <button
          class="w-full px-10 pt-5 hover:bg-black/70 hover:text-white"
          v-for="city in cities"
          :key="city.key"
          @click="fetchWeather(city)"
        >
          <p class="text-lg font-bold border-b-2 border-black/30 pb-4 text-left">
            {{ city.name }},
            <span class="font-normal text-base">{{ city.country }}</span>
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconMagnify from '@/assets/icons/IconMagnify.vue'
import IconArrowPath from '@/assets/icons/IconArrowPath.vue'

// @ts-ignore
import { getWeatherData } from '@/controllers/WeatherService'
// @ts-ignore
import { getAutocompleteText } from '@/controllers/autoCompleteCity'
</script>

<script lang="ts">
export default {
  name: 'SearchBar',

  props: [''],

  data() {
    return {
      search: '' as any,
      cities: [] as any,
      weatherData: null as any,
      push: false,
      timeout: null as any
    }
  },

  mounted() {},

  computed: {},

  components: {
    IconMagnify,
    IconArrowPath
  },

  methods: {
    debouncedSearch() {
      if (this.search.length < 3) {
        this.push = false
        this.cities = []
        return
      }

      this.push = true

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.handleSearch()
      }, 1000)
    },

    async handleSearch() {
      this.cities = await getAutocompleteText(this.search)
      console.table(this.cities)
      this.push = false
    },
    async fetchWeather(city: any) {
      this.push = true
      this.weatherData = await getWeatherData(city)
      this.saveRecord({
        ...this.weatherData.current,
        name: this.weatherData.name,
        coord: {
          lat: this.weatherData.lat,
          lon: this.weatherData.lon
        }
      })
      this.cities = []
      this.search = ''
      this.$emit('weather', this.weatherData)
      this.push = false
    },

    saveRecord(record: { name: any; }) {
      const data = localStorage.getItem('historicalData')
      if (data) {
        const historicalData = JSON.parse(data)

        // Verificar si ya existe un record con el mismo nombre
        const isDuplicate = historicalData.some((item: { name: any; }) => item.name === record.name)

        if (!isDuplicate) {
          historicalData.unshift(record)
          localStorage.setItem('historicalData', JSON.stringify(historicalData))
          this.$emit('historyCheck', true)
        } else {
          console.warn(`El nombre "${record.name}" ya existe en el historial.`)
          // Puedes manejar el caso de duplicado según necesites, por ejemplo:
          // this.$emit('duplicateRecord', record.name)
        }
      } else {
        localStorage.setItem('historicalData', JSON.stringify([record]))
        this.$emit('historyCheck', true)
      }
    }
  },

  watch: {},

  created() {}
}
</script>

<style scoped></style>
