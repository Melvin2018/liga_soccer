<template>
  <div class="home container">
    <v-row align="center" justify="center">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="3000"
        img-width="900"
        img-height="250"
      >
        <b-carousel-slide v-for="p in partidos" :key="p.id" img-blank>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <img
                    :src="p.partido.equipo1.equipo.logo"
                    alt="logo1"
                    width="100px"
                    height="100px"
                  />
                  <p>{{ p.partido.equipo1.equipo.nombre }}</p>
                </v-col>
                <v-col cols="12" sm="4" v-if="p.partido.fecha == null">
                  <v-col>
                    <span
                      ><strong>Dia:</strong>{{ p.partido.horario.dia }}</span
                    >
                  </v-col>
                  <v-col>
                    <span
                      ><strong>Hora:</strong>{{ p.partido.horario.hora }}</span
                    >
                  </v-col>
                </v-col>
                <v-col cols="12" sm="4" v-else>
                  <v-row class="h3" align="center" justify="center">
                    <span>{{ p.gol1 }}</span>
                    <v-spacer></v-spacer>
                    <span v-if="p.partido.finalizado != null">-</span>
                    <v-col cols="6" v-else>
                      <v-progress-linear
                        color="green"
                        stream
                        buffer-value="0"
                      ></v-progress-linear>
                    </v-col>
                    <v-spacer></v-spacer>
                    <span>{{ p.gol2 }}</span>
                  </v-row>
                  <v-btn @click="ir(p.partido.id)" fab dark>
                    <v-avatar>
                      <img
                        src="https://cdn3.iconfinder.com/data/icons/everyday-menu-6/64/arrow_next_go_forward-256.png"
                      />
                    </v-avatar>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="4">
                  <img
                    :src="p.partido.equipo2.equipo.logo"
                    alt="logo1"
                    width="100px"
                    height="100px"
                  />
                  <p>{{ p.partido.equipo2.equipo.nombre }}</p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </b-carousel-slide>
      </b-carousel>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      partidos: []
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
        .get(this.$path + "/jornada/FindLast")
        .then(response => {
          this.partidos = response.data;
        })
        .catch(e => console.log(e));
    },
    ir(idpar) {
      this.$router.push({
        name: "partido",
        params: {
          id: idpar
        }
      });
    }
  },
  mounted() {
    this.getJornada();
  }
};
</script>
