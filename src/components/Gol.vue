<template>
  <v-container v-if="equipo != null">
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-row align="center" justify="center">
          <img
            src="https://cdn1.iconfinder.com/data/icons/smallicons-sport/32/finish-256.png"
            height="40px"
            width="40px"
          />
          <h2 class="display-1 white--text font-weight-light">
            Gol
          </h2>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-row align="center" justify="center">
                <v-col cols="6">
                  <v-radio-group v-model="equipo" label="Equipo">
                    <v-row>
                      <v-radio
                        :label="gol.partido.equipo1.equipo.nombre"
                        :value="gol.partido.equipo1"
                      ></v-radio>
                      <img
                        :src="gol.partido.equipo1.equipo.logo"
                        height="20px"
                        width="20px"
                      />
                    </v-row>
                    <v-row>
                      <v-radio
                        :label="gol.partido.equipo2.equipo.nombre"
                        :value="gol.partido.equipo2"
                      ></v-radio>
                      <img
                        :src="gol.partido.equipo2.equipo.logo"
                        height="20px"
                        width="20px"
                      />
                    </v-row>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex" cols="6">
                  <v-select
                    v-model="gol.carnet"
                    required
                    :items="lista"
                    label="Jugador"
                    dense
                    outlined
                  >
                    <template slot="selection" slot-scope="data">
                      <v-avatar height="20" width="20">
                        <img :src="data.item.jugador.foto" />
                      </v-avatar>
                      {{ data.item.jugador.persona.nombres }}
                    </template>
                    <template slot="item" slot-scope="data">
                      <v-avatar height="30" width="30">
                        <img :src="data.item.jugador.foto" />
                      </v-avatar>
                      {{ data.item.jugador.persona.nombres }}
                      {{ data.item.jugador.persona.apellidos }}
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-radio-group v-model="gol.tipo" label="Valor">
                <v-radio label="A favor" :value="true"></v-radio>
                <v-radio label="en contra" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
                v-model="gol.forma"
                required
                :items="formas"
                label="Forma"
                dense
                outlined
              >
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="salir">Cancelar</v-btn>
        <v-btn color="blue darken-1" @click="onSubmit" :loading="load"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
  computed: {
    lista() {
      if (this.equipo.id == this.gol.partido.equipo1.id) {
        this.gol.carnet = this.jugadores[0];
        return this.jugadores;
      } else {
        this.gol.carnet = this.jugadores1[0];
        return this.jugadores1;
      }
    }
  },
  data() {
    return {
      load: false,
      equipo: {},
      gol: {
        forma: "Jugada normal",
        minuto: this.$route.params.minuto,
        tipo: true,
        carnet: {},
        partido: {
          id: 0,
          equipo1: {
            id: 0,
            equipo: {
              nombre: ""
            }
          },
          equipo2: {
            id: 0,
            equipo: {
              nombre: ""
            }
          }
        }
      },
      formas: ["Jugada normal","Autogol", "Tiro libre", "Penal", "cabeza"],
      jugadores: [],
      jugadores1: []
    };
  },
  methods: {
    salir() {
      this.$router.push({
        name: "partido",
        params: {
          id: this.$route.params.id
        }
      });
    },
    async onSubmit() {
      this.load = true;
      const URL = this.$path + "/gol/Add";
      await this.$axios.post(URL, this.gol).catch(e => console.log(e));
      this.load = false;
      await Swal.fire({
        position: "top-end",
        type: "success",
        title: "Se ha agregado",
        showConfirmButton: false,
        timer: 1500
      });
      this.salir();
    },
    async getJugador() {
      var n = 2;
      while (n > 0) {
        await this.$axios
          .get(this.$path + `/carnet/dentro/${this.$route.params.id}/` + n)
          .then(response => {
            if (n == 2) {
              this.jugadores1 = response.data;
            } else if (n == 1) {
              this.jugadores = response.data;
            }
          })
          .catch(e => console.log(e));
        n--;
      }
    },
    async getPartido() {
      await this.$axios
        .get(this.$path + `/partido/FindBy/${this.$route.params.id}`)
        .then(response => {
          this.gol.partido = response.data;
        })
        .catch(e => console.log(e));
      this.equipo = this.gol.partido.equipo1;
    }
  },
  mounted() {
    this.getPartido();
    this.getJugador();
  }
};
</script>
<style>
.margin {
  margin-left: 40%;
}
</style>
