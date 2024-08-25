<template>
  <div class="lg:mt-20 mt-10 lg:flex lg:justify-between">
    <div class="flex">
      <div class="">
        <img
          :src="`https://openweathermap.org/img/wn/${dataActual.current.weather[0].icon}@4x.png`"
          class="h-auto w-48"
        />
      </div>

      <div class="my-auto">
        <p class="lg:text-7xl text-5xl text-white">{{ dataActual.name }}</p>
        <p class="text-white/90 mt-3 lg:text-3xl text-xl">
          {{ getWeatherDescription(dataActual.current.weather[0].id) }}
        </p>
      </div>
    </div>

    <div class="-my-20 order-first lg:order-last pt-8 lg:pt-0">
      <p class="text-white lg:text-[200pt] text-[120pt] text-center">
        {{ Math.round(dataActual.current.temp) }}&deg;
      </p>
    </div>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-5 gap-5 mt-20">
    <div class="bg-white/20 rounded-xl h-48 grid items-center">
      <div class="">
        <img src="@/assets/images/icons/temperatura-alta.png" class="h-20 w-20 mx-auto" />
        <div class="text-center mt-3">
          <p class="text-white/90 font-bold">Sensación térmica</p>
          <p class="text-white text-xl">{{ Math.round(dataActual.current.feels_like) }}&deg;</p>
        </div>
      </div>
    </div>

    <div class="bg-white/20 rounded-xl h-48 grid items-center">
      <div class="">
        <img src="@/assets/images/icons/velocidad.png" class="h-20 w-20 mx-auto" />
        <div class="text-center mt-3">
          <p class="text-white/90 font-bold">Presión</p>
          <p class="text-white text-xl">{{ dataActual.current.pressure }} hPa</p>
        </div>
      </div>
    </div>

    <div class="bg-white/20 rounded-xl h-48 grid items-center">
      <div class="">
        <img src="@/assets/images/icons/humedad.png" class="h-20 w-20 mx-auto" />
        <div class="text-center mt-3">
          <p class="text-white/90 font-bold">Humedad</p>
          <p class="text-white text-xl">{{ dataActual.current.humidity }}%</p>
        </div>
      </div>
    </div>

    <div class="bg-white/20 rounded-xl h-48 grid items-center">
      <div class="">
        <img src="@/assets/images/icons/ojo.png" class="h-20 w-20 mx-auto" />
        <div class="text-center mt-3">
          <p class="text-white/90 font-bold">Visibilidad</p>
          <p class="text-white text-xl">{{ dataActual.current.visibility / 1000 }} Km</p>
        </div>
      </div>
    </div>

    <div class="bg-white/20 rounded-xl h-48 grid items-center">
      <div class="">
        <img src="@/assets/images/icons/viento.png" class="h-20 w-20 mx-auto" />
        <div class="text-center mt-3">
          <p class="text-white/90 font-bold">Viento</p>
          <p class="text-white text-xl">{{ Math.round(dataActual.current.wind_speed * 3.6) }} Km/h</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'ActualDataView',

  props: {
    dataActual: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      conditions: [
        { id: 200, name: 'Tormenta con lluvia ligera' },
        { id: 201, name: 'Tormenta con lluvia' },
        { id: 202, name: 'Tormenta con lluvia intensa' },
        { id: 210, name: 'Tormenta ligera' },
        { id: 211, name: 'Tormenta' },
        { id: 212, name: 'Tormenta intensa' },
        { id: 221, name: 'Tormenta irregular' },
        { id: 230, name: 'Tormenta con llovizna ligera' },
        { id: 231, name: 'Tormenta con llovizna' },
        { id: 232, name: 'Tormenta con llovizna intensa' },
        { id: 300, name: 'Llovizna de intensidad ligera' },
        { id: 301, name: 'Llovizna' },
        { id: 302, name: 'Llovizna de intensidad fuerte' },
        { id: 310, name: 'Lluvia ligera con llovizna' },
        { id: 311, name: 'Lluvia con llovizna' },
        { id: 312, name: 'Lluvia intensa con llovizna' },
        { id: 313, name: 'Chubasco y llovizna' },
        { id: 314, name: 'Chubasco fuerte y llovizna' },
        { id: 321, name: 'Chubasco de llovizna' },
        { id: 500, name: 'Lluvia ligera' },
        { id: 501, name: 'Lluvia moderada' },
        { id: 502, name: 'Lluvia de intensidad fuerte' },
        { id: 503, name: 'Lluvia muy intensa' },
        { id: 504, name: 'Lluvia extrema' },
        { id: 511, name: 'Lluvia helada' },
        { id: 520, name: 'Chubasco de lluvia ligera' },
        { id: 521, name: 'Chubasco de lluvia' },
        { id: 522, name: 'Chubasco de lluvia intensa' },
        { id: 531, name: 'Chubasco de lluvia irregular' },
        { id: 600, name: 'Nieve ligera' },
        { id: 601, name: 'Nieve' },
        { id: 602, name: 'Nieve intensa' },
        { id: 611, name: 'Aguanieve' },
        { id: 612, name: 'Aguanieve ligera' },
        { id: 613, name: 'Aguanieve' },
        { id: 615, name: 'Lluvia ligera y nieve' },
        { id: 616, name: 'Lluvia y nieve' },
        { id: 620, name: 'Chubasco ligero de nieve' },
        { id: 621, name: 'Chubasco de nieve' },
        { id: 622, name: 'Chubasco fuerte de nieve' },
        { id: 701, name: 'Niebla' },
        { id: 711, name: 'Humo' },
        { id: 721, name: 'Calima' },
        { id: 731, name: 'Remolinos de polvo/arena' },
        { id: 741, name: 'Niebla' },
        { id: 751, name: 'Arena' },
        { id: 761, name: 'Polvo' },
        { id: 762, name: 'Ceniza volcánica' },
        { id: 771, name: 'Chubascos' },
        { id: 781, name: 'Tornado' },
        { id: 800, name: 'Cielo despejado' },
        { id: 801, name: 'Pocas nubes: 11-25%' },
        { id: 802, name: 'Nubes dispersas: 25-50%' },
        { id: 803, name: 'Nubes rotas: 51-84%' },
        { id: 804, name: 'Nubes cubiertas: 85-100%' }
      ]
    }
  },

  mounted() {},

  computed: {},

  components: {},

  methods: {
    getWeatherDescription(id: any) {
      const condition = this.conditions.find((cond: { id: any; }) => cond.id === id)
      return condition ? condition.name : 'Condición desconocida'
    }
  },

  watch: {},

  created() {}
}
</script>

<style scoped></style>
