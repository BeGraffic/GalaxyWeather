<template>
  <div class="relative w-screen h-screen">
    <!-- Imagen de fondo mientras el video carga o si falla -->
    <img
      v-if="showImage"
      :src="imageUrl"
      class="object-cover w-screen h-screen"
      alt="Weather image"
    />

    <!-- Video -->
    <video
      v-show="!showImage"
      autoplay
      muted
      loop
      :class="{ 'filter saturate-0': night }"
      class="object-cover w-screen h-screen"
      :src="videoUrl"
      @canplay="onVideoCanPlay"
      @error="onVideoError"
    ></video>
  </div>
</template>

<script setup></script>

<script>
export default {
  name: 'BackgroundsView',

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      actual: {
        id: 800,
        name: 'Cielo despejado',
        img: 'despejado.jpg',
        video: 'despejado.mp4'
      },
      videoUrl: '',
      imageUrl: '',
      showImage: true,
      night: false,
      conditions: [
        {
          id: 200,
          name: 'Tormenta',
          img: 'tormenta.jpg',
          video: 'tormenta.mp4'
        },
        {
          id: 300,
          name: 'Llovizna',
          img: 'llovizna.jpg',
          video: 'llovizna.mp4'
        },
        {
          id: 500,
          name: 'Lluvia',
          img: 'lluvia.jpg',
          video: 'lluvia.mp4'
        },
        {
          id: 600,
          name: 'Nieve',
          img: 'nieve.jpg',
          video: 'nieve.mp4'
        },
        {
          id: 701,
          name: 'Niebla',
          img: 'niebla.jpg',
          video: 'niebla.mp4'
        },
        {
          id: 711,
          name: 'Humo',
          img: 'humo.jpg',
          video: 'humo.mp4'
        },
        {
          id: 721,
          name: 'Neblina',
          img: 'neblina.jpg',
          video: 'neblina.mp4'
        },
        {
          id: 731,
          name: 'Polvo/Remolinos de arena',
          img: 'arena.jpg',
          video: 'arena.mp4'
        },
        {
          id: 741,
          name: 'Niebla espesa',
          img: 'humo.jpg',
          video: 'humo.mp4'
        },
        {
          id: 751,
          name: 'Arena',
          img: 'arena.jpg',
          video: 'arena.mp4'
        },
        {
          id: 761,
          name: 'Polvo',
          img: 'humo.jpg',
          video: 'humo.mp4'
        },
        {
          id: 762,
          name: 'Ceniza volcánica',
          img: 'ceniza.jpg',
          video: 'ceniza.mp4'
        },
        {
          id: 771,
          name: 'Chubascos',
          img: 'chubascos.jpg',
          video: 'chubascos.mp4'
        },
        {
          id: 781,
          name: 'Tornado',
          img: 'tornado.jpg',
          video: 'tornado.mp4'
        },
        {
          id: 800,
          name: 'Cielo despejado',
          img: 'despejado.jpg',
          video: 'despejado.mp4'
        },
        {
          id: 801,
          name: 'Pocas nubes',
          img: 'pocon-ubes.jpg',
          video: 'pocas-nubes.mp4'
        },
        {
          id: 802,
          name: 'Nubes dispersas',
          img: 'nubes-dispersas.jpg',
          video: 'nubes-dispersas.mp4'
        },
        {
          id: 803,
          name: 'Nubes rotas',
          img: 'nubes-dispersas.jpg',
          video: 'nubes-dispersas.mp4'
        },
        {
          id: 804,
          name: 'Nublado',
          img: 'niebla.jpg',
          video: 'niebla.mp4'
        }
      ]
    }
  },

  mounted() {
    this.updateVideoUrl(this.actual)
  },

  methods: {
    updateVideoUrl(value) {

      console.log(value.img)

      if (value.img) {
        this.imageUrl = new URL(`/src/assets/images/weather/${value.img}`, import.meta.url)
      }

      if (value.video) {
        this.videoUrl = new URL(`/src/assets/video/${value.video}`, import.meta.url)
      }
    },
    onVideoCanPlay() {
      this.showImage = false // Oculta la imagen cuando el video está listo
    },
    onVideoError() {
      this.showImage = true // Muestra la imagen si hay un error en la carga del video
    }
  },

  watch: {
    data() {
      if (this.data) {
        var aqui = this.conditions.find(
          (condition) =>
            condition.id >= this.data.current.weather[0].id &&
            condition.id <= this.data.current.weather[0].id
        )

        if (aqui !== undefined) {
          this.actual = aqui
          this.updateVideoUrl(aqui)
        }

        /* detectar si es de noche */
        const date = new Date(this.data.current.dt * 1000)
        const hour = date.getHours()
        this.night = hour < 6 || hour > 18

        this.showImage = true // Muestra la imagen mientras se carga el nuevo video
      }
    }
  }
}
</script>

<style scoped></style>
