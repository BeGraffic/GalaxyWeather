<template>
  <div class="mt-16">
    <p class="text-white text-xl font-medium text-center lg:text-left">
      Previsión para la siguiente semana
    </p>

    <div class="lg:grid lg:grid-cols-7 mt-5 lg:divide-x-2 divide-y-2 lg:divide-y-0">
      <WeatherCard v-for="(item, index) in dataForecast.daily.slice(1)" :key="index" :data="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from './WeatherCard.vue'
</script>

<script lang="ts">
export default {
  name: 'ForecastView',

  props: {
      dataForecast: {
        type: Object,
        required: true
      }
    },

  data() {
    return {}
  },

  mounted() {},

  computed: {},

  components: {},

  methods: {},

  watch: {},

  created() {}
}
</script>

<style scoped></style>
