<template>
  <b-container v-if="partidos.length > 0">
    <b-card no-body>
      <b-tabs pills card vertical lazy no-fade>
        <b-tab
          v-for="j in jornadas"
          :key="j.id"
          :title="'jornada ' + j.numero"
          title-link-class="text--darken-2"
        >
          <b-card
            align="center"
            v-for="p in partidos1(j.id)"
            :key="p.partido.id"
            class="container-fluid"
          >
            <div class="row justify-content-start">
              <div class="col">
                <img
                  :src="p.partido.equipo1.equipo.logo"
                  alt="logo1"
                  width="100px"
                  height="100px"
                />
                <p>{{ p.partido.equipo1.equipo.nombre }}</p>
              </div>
              <v-col cols="12" sm="4" v-if="p.partido.fecha == null">
                <v-col>
                  <span><strong>Dia:</strong>{{ p.partido.horario.dia }}</span>
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
                    <b-progress variant="success" animated></b-progress>
                  </v-col>
                  <v-spacer></v-spacer>
                  <span>{{ p.gol2 }}</span>
                </v-row>
              </v-col>
              <div class="col">
                <img
                  :src="p.partido.equipo2.equipo.logo"
                  alt="logo1"
                  width="100px"
                  height="100px"
                />
                <p>{{ p.partido.equipo2.equipo.nombre }}</p>
              </div>
            </div>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>
<script>
export default {
  computed: {
    jornadas() {
      var lista = [];
      this.partidos.forEach(x => {
        if (lista.length == 0) {
          lista.push(x.jornada);
        } else {
          var object = lista.find(d => d.id == x.jornada.id);
          if (object == undefined) {
            lista.push(x.jornada);
          }
        }
      });
      return lista;
    }
  },
  data() {
    return {
      partidos: []
    };
  },
  methods: {
    partidos1(id) {
      return this.partidos.filter(x => x.jornada.id == id);
    },
    async getJornadas() {
      await this.$axios
        .get(this.$path + "/jornada/All")
        .then(response => {
          this.partidos = response.data;
        })
        .catch(e => console.log(e));
    },
    ir() {
      this.$router.push("/partido");
    }
  },
  mounted() {
    this.getJornadas();
  }
};
</script>
