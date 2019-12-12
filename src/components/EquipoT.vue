<template>
  <v-container>
    <v-alert type="error" v-if="!load & (equipos.length == 0)">
      no hay equipos para registrar
    </v-alert>
    <v-alert type="error" v-else-if="!load & (jugadores.length == 0)">
      no hay jugadores de: <span>{{ equipos[0].lugar.nombre }}</span
      >, por lo tanto no hay ningun representante para elegir
    </v-alert>
    <v-card v-else>
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn4.iconfinder.com/data/icons/soccer-color/32/08_-_Captain-2-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Ingresando equipos temporales
        </h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-select
                v-model="equipo"
                required
                :items="equipos"
                label="Equipo"
                dense
                outlined
              >
                <template slot="selection" slot-scope="data">
                  <v-avatar height="20" width="20">
                    <img :src="data.item.logo" />
                  </v-avatar>
                  {{ data.item.nombre }}
                </template>
                <template slot="item" slot-scope="data">
                  <v-avatar height="30" width="30">
                    <img :src="data.item.logo" />
                  </v-avatar>
                  {{ data.item.nombre }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-select
                v-model="equipot.representante"
                required
                :items="jugadores"
                label="Representante"
                dense
                outlined
              >
                <template slot="selection" slot-scope="data">
                  <v-avatar height="20" width="20">
                    <img :src="data.item.foto" />
                  </v-avatar>
                  {{ data.item.persona.nombres }}
                </template>
                <template slot="item" slot-scope="data">
                  <v-avatar height="30" width="30">
                    <img :src="data.item.foto" />
                  </v-avatar>
                  {{ data.item.persona.nombres }}
                  {{ data.item.persona.apellidos }}
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="salir">Cancelar</v-btn>
        <v-btn color="blue darken-1" @click="onSubmit">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  watch: {
    equipo: function(x) {
      this.equipot.equipo = x;
      this.getPersonas();
    }
  },
  data() {
    return {
      load: true,
      equipo: {},
      equipot: {
        representante: {},
        equipo: {}
      },
      equipos: [],
      jugadores: []
    };
  },
  methods: {
    salir() {
      this.$router.push({
        name: "listadoET"
      });
    },
    async onSubmit() {
      const URL = this.$path + "/equipoT/Add";
      await this.$axios.post(URL, this.equipot).catch(e => console.log(e));
      this.salir();
    },
    async getEquipos() {
      await this.$axios
        .get(this.$path + "/equipoT/restantes")
        .then(response => {
          this.equipos = response.data;
        })
        .catch(e => console.log(e));
      if (this.equipos.length > 0) {
        this.equipo = this.equipos[0];
        this.getPersonas();
      }
       this.load = false;
    },
    async getPersonas() {
      await this.$axios
        .get(this.$path + `/Jugador/posibles/${this.equipo.id}`)
        .then(response => {
          this.jugadores = response.data;
        })
        .catch(e => console.log(e));
      this.equipot.representante = this.jugadores[0];
    }
  },
  mounted() {
    this.getEquipos();
  }
};
</script>
