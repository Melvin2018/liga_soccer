<template>
  <v-container v-if="equipo != null">
    <v-card>
      <v-card-title>
        <span class="headline">Ingresando cambio</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-radio-group v-model="equipo" label="Equipo">
                <v-row>
                  <v-radio
                    :label="cambio.partido.equipo1.equipo.nombre"
                    :value="cambio.partido.equipo1"
                  ></v-radio>
                  <img
                    :src="cambio.partido.equipo1.equipo.logo"
                    height="20px"
                    width="20px"
                  />
                </v-row>
                <v-row>
                  <v-radio
                    :label="cambio.partido.equipo2.equipo.nombre"
                    :value="cambio.partido.equipo2"
                  ></v-radio>
                  <img
                    :src="cambio.partido.equipo2.equipo.logo"
                    height="20px"
                    width="20px"
                  />
                </v-row>
              </v-radio-group>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
                v-model="cambio.razon"
                required
                :items="razones"
                label="Razon"
                dense
                outlined
              >
              </v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-card>
                <v-card-title>
                  Cambio
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-select
                        v-model="cambio.entrante"
                        required
                        :items="lista1"
                        label="entrante"
                        dense
                        outlined
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip class="v-chip--selected">
                            <v-avatar>
                              <img :src="data.item.jugador.foto" />
                            </v-avatar>
                            {{ data.item.jugador.persona.nombres }}
                          </v-chip>
                        </template>
                        <template slot="item" slot-scope="data">
                          <v-avatar>
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
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-select
                        v-model="cambio.saliente"
                        required
                        :items="lista2"
                        label="saliente"
                        dense
                        outlined
                      >
                        <template slot="selection" slot-scope="data">
                          <v-chip class="v-chip--selected">
                            <v-avatar>
                              <img :src="data.item.jugador.foto" />
                            </v-avatar>
                            {{ data.item.jugador.persona.nombres }}
                          </v-chip>
                        </template>
                        <template slot="item" slot-scope="data">
                          <v-avatar>
                            <img :src="data.item.jugador.foto" />
                          </v-avatar>
                          <span class="span">{{ data.item.dorsal }} </span>
                          <span>
                            {{ data.item.jugador.persona.nombres }}
                            {{ data.item.jugador.persona.apellidos }}
                          </span>
                        </template>
                      </v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
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
    lista1() {
      if (this.equipo.id == this.cambio.partido.equipo1.id) {
        return this.entrantes1;
      } else {
        return this.entrantes2;
      }
    },
    lista2() {
      if (this.equipo.id == this.cambio.partido.equipo1.id) {
        return this.salientes1;
      } else {
        return this.salientes2;
      }
    }
  },
  data() {
    return {
      load: false,
      equipo: {},
      cambio: {
        minuto: this.$route.params.minuto,
        razon: "",
        entrante: {},
        saliente: {},
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
      razones: ["Normal", "Lesión", "Cansancio"],
      entrantes1: [],
      entrantes2: [],
      salientes1: [],
      salientes2: []
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
      const URL = this.$path + "/cambio/Add";
      await this.$axios.post(URL, this.cambio).catch(e => console.log(e));
      await Swal.fire({
        position: "top-end",
        type: "success",
        title: "Se ha agregado",
        showConfirmButton: false,
        timer: 1500
      });
      this.salir();
    },
    async getEntrante() {
      var n = 2;
      while (n > 0) {
        await this.$axios
          .get(this.$path + `/carnet/entrante/${this.$route.params.id}/` + n)
          .then(response => {
            if (n == 2) {
              this.entrantes2 = response.data;
            } else if (n == 1) {
              this.entrantes1 = response.data;
            }
          })
          .catch(e => console.log(e));
        n--;
      }
    },
    async getSaliente() {
      var n = 2;
      while (n > 0) {
        await this.$axios
          .get(this.$path + `/carnet/dentro/${this.$route.params.id}/` + n)
          .then(response => {
            if (n == 2) {
              this.salientes2 = response.data;
            } else if (n == 1) {
              this.salientes1 = response.data;
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
          this.cambio.partido = response.data;
        })
        .catch(e => console.log(e));
      this.equipo = this.cambio.partido.equipo1;
    }
  },
  mounted() {
    this.getPartido();
    this.getEntrante();
    this.getSaliente();
  }
};
</script>
<style>
.span{
 color:darkgreen; 
 margin-right: 7px;
}
</style>