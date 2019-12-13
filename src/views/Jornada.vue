<template>
  <v-container>
    <v-card :loading="load" v-if="!load & partidos.length>0">
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn3.iconfinder.com/data/icons/flat-artistic-common-1/32/application-next-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Jornada #{{ partidos[0].jornada.numero }}
        </h2>
      </v-card-title>
      <v-card-text>
        <v-row
          v-for="p in partidos"
          :key="p.partido.id"
          class="contenedor text-center"
        >
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
              <span><strong>Dia:</strong>{{ p.partido.horario.dia }}</span>
            </v-col>
            <v-col>
              <span><strong>Hora:</strong>{{ p.partido.horario.hora }}</span>
            </v-col>
            <v-btn @click="ir(p.partido.id)" fab dark>
              <v-avatar>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/everyday-menu-6/64/arrow_next_go_forward-256.png"
                />
              </v-avatar>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4" v-else>
            <v-row class="h3" align="center" justify="center">
              <span>{{ p.gol1 }}</span>
              <v-spacer></v-spacer>
              <span v-if="p.partido.finalizado != null">-</span>
              <v-col cols="6" v-else>
                <b-progress variant="success" animated></b-progress>
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
  </v-container>
</template>
<script>
export default {
  data() {
    return {
   partidos:[],
      load: true
    };
  },
  methods: {
    async getJornada() {
      await this.$axios
        .get(this.$path + "/jornada/FindLast")
        .then(response => {
          this.partidos = response.data;
        })
        .catch(e => console.log(e));
      this.load = false;
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
<style>
.contenedor {
  width: 80%;
  margin-left: 10%;
}
</style>
