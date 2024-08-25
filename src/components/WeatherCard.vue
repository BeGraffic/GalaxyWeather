<template>
  <button class="lg:h-56 grid items-center hover:bg-white/20 w-full lg:w-auto py-3">
    <div class="flex lg:block">
      <p class="text-white font-bold hidden lg:block">
        {{ daysOfWeek[new Date(data.dt * 1000).getUTCDay()] }}
      </p>
      <div class="">
        <p class="text-white font-bold lg:hidden">
          {{ daysOfWeek[new Date(data.dt * 1000).getUTCDay()] }}
        </p>
        <img
          :src="`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`"
          class="h-28 w-28 mx-auto -my-4"
        />
      </div>
      <p class="text-center text-white text-5xl my-auto">{{ Math.round(data.temp.day) }}&deg;</p>
      <div class="text-center mt-1 text-white/50 text-sm ml-5 grid items-center">
        <p class="">Max {{ Math.round(data.temp.max) }}&deg;</p>
        <p class="">Min {{ Math.round(data.temp.min) }}&deg;</p>
      </div>
    </div>
  </button>
</template>

<script setup></script>

<script>
export default {
  name: 'WeatherCard',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    }
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
