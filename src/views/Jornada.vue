<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn3.iconfinder.com/data/icons/flat-artistic-common-1/32/application-next-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Jornada #{{ j.numero }}
        </h2>
      </v-card-title>
      <v-card-text>
        <v-row
          v-for="p in j.partidoList"
          :key="p.id"
          class="contenedor text-center"
        >
          <v-col cols="12" sm="4">
            <img
              :src="p.equipo1.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo1.equipo.nombre }}</p>
          </v-col>
          <v-col cols="12" sm="4">
            <v-col>
            <span><strong>Dia:</strong>{{ p.horario.dia }}</span>
            </v-col>
            <v-col>
            <span><strong>Hora:</strong>{{ p.horario.hora }}</span>
            </v-col>
            <v-btn @click="ir(p.id)" fab dark>
              <v-avatar>
              <img src="https://cdn3.iconfinder.com/data/icons/everyday-menu-6/64/arrow_next_go_forward-256.png"/>
              </v-avatar>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <img
              :src="p.equipo2.equipo.logo"
              alt="logo1"
              width="100px"
              height="100px"
            />
            <p>{{ p.equipo2.equipo.nombre }}</p>
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
      j: {
        numero: 0,
        partidoList: []
      }
    };
  },
  methods: {
    async getJornada() {
      await this.$axios
        .get(this.$path + "/jornada/FindLast")
        .then(response => {
          this.j = response.data;
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
<style>
.contenedor {
  width: 80%;
  margin-left: 10%;
}
</style>
