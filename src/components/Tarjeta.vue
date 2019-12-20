<template>
  <v-container v-if="equipo != null">
    <v-card>
      <v-card-title>
        <span class="headline">Ingresando tarjeta</span>
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
                        :label="tarjeta.partido.equipo1.equipo.nombre"
                        :value="tarjeta.partido.equipo1"
                      ></v-radio>
                      <img
                        :src="tarjeta.partido.equipo1.equipo.logo"
                        height="20px"
                        width="20px"
                      />
                    </v-row>
                    <v-row>
                      <v-radio
                        :label="tarjeta.partido.equipo2.equipo.nombre"
                        :value="tarjeta.partido.equipo2"
                      ></v-radio>
                      <img
                        :src="tarjeta.partido.equipo2.equipo.logo"
                        height="20px"
                        width="20px"
                      />
                    </v-row>
                  </v-radio-group>
                </v-col>
                <v-col class="d-flex" cols="6">
                  <v-select
                    v-model="tarjeta.carnet"
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
                      <span class="span">{{ data.item.dorsal }}</span>
                      <span>
                       {{ data.item.jugador.persona.nombres }}
                      {{ data.item.jugador.persona.apellidos }}
                      </span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-radio-group v-model="tarjeta.tipo" label="Tipo">
                <v-radio label="Amarilla" :value="false"></v-radio>
                <v-radio label="Roja" :value="true"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="salir">Cancelar</v-btn>
        <v-btn color="blue darken-1" @click="onSubmit" :loading="load">
          Guardar</v-btn
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
      if (this.equipo.id == this.tarjeta.partido.equipo1.id) {
        this.tarjeta.carnet = this.jugadores[0];
        return this.jugadores;
      } else {
        this.tarjeta.carnet = this.jugadores1[0];
        return this.jugadores1;
      }
    }
  },
  data() {
    return {
      load: false,
      equipo: {},
      tarjeta: {
        tipo: false,
        minuto: this.$route.params.minuto,
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
      const URL = this.$path + "/tarjeta/Add";
      await this.$axios.post(URL, this.tarjeta).catch(e => console.log(e));
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
          this.tarjeta.partido = response.data;
        })
        .catch(e => console.log(e));
      this.equipo = this.tarjeta.partido.equipo1;
    }
  },
  mounted() {
    this.getPartido();
    this.getJugador();
  }
};
</script>
<style>
.span{
 color:darkgreen; 
 margin-right: 7px;
}
</style>