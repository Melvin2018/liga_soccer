<template>
  <div class="home container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      img-width="900"
      img-height="250"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="p in partidos" :key="p.id"
        img-blank
          background="black"  
      >
       <b-card bg-variant="dark">
        <div class="row justify-content-start">
          <div class="col">
            <img
              :src="p.equipo1.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo1.equipo.nombre }}</p>
          </div>
          <b-card-body title="Horario">
            <b-card-text title="Dia">{{ p.horario.dia }}</b-card-text>
            <b-card-text title="Hora">{{ p.horario.hora }}</b-card-text>
          </b-card-body>
          <div class="col">
            <img
              :src="p.equipo2.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo2.equipo.nombre }}</p>
          </div>
        </div>
      </b-card>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      partidos:[]
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    async getJornada() {
      await this.$axios
        .get(this.$path + "/jornada/Last")
        .then(response => {
          this.partidos = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.getJornada();
  }
};
</script>
