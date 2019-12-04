<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Agregando Formaciones
        </v-card-title>
        <v-card-text>
          <v-tabs>
            <v-tab>{{ p.equipo1.equipo.nombre }}</v-tab>
            <v-tab>{{ p.equipo1.equipo.nombre }}</v-tab>
          </v-tabs>
          <v-tab-item>
            <v-row no-gutters>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Posibles
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Dentro
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row no-gutters>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Posibles
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                  Dentro
                </v-card-title>
                <v-card-text> </v-card-text>
              </v-card>
            </v-row>
          </v-tab-item>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    idpartido: {
      type: Number,
      required: true,
      default: 0
    }
  },
  watch: {
    idpartido(value) {
      this.partido.idp = value;
      this.getPartido();
      this.getJugador1();
      this.getJugador2();
    }
  },
  data() {
    return {
      partido: {
        id: this.idpartido
      },
      formacion1: {
        equipo: {},
        partido: {},
        formacionCarnetList: []
      },
      formacion2: {
        equipo: {},
        partido: {},
        formacionCarnetList: []
      },
      jugadores: [],
      jugadores1: []
    };
  },
  computed: {
    carnet(listado) {
      var lista = [];
      for (j in listado) {
        lista.push({
          dorsal: j.dorsal,
          foto: "<img src=" + j.jugador.foto + ' height="40px" width="40px"/>',
          nombre: j.jugador.persona.nombres
        });
      }
      return lista;
    },
     fc(listado) {
      var lista = [];
      for (j in listado) {
        lista.push({
          dorsal: j.jugador.dorsal,
          foto: "<img src=" + j.jugador.jugador.foto + ' height="40px" width="40px"/>',
          nombre: j.jugador.jugador.persona.nombres
        });
      }
      return lista;
    },
  },
  methods: {
    async onSubmit() {
      const URL = this.$path + "/formacion/Add";
      await this.$axios.post(URL, this.formacion1).catch(e => console.log(e));
      await this.$axios.post(URL, this.formacion2).catch(e => console.log(e));
      await Swal.fire({
        position: "top-end",
        type: "success",
        title: "Se ha agregado",
        showConfirmButton: false,
        timer: 1500
      });
    },
    async getPartido() {
      await this.$axios
        .get(this.$path + `/partido/FindBy/${this.partido.id}`)
        .then(response => {
          this.formacion1.partido = response.data;
          this.formacion2.partido = response.data;
          this.formacion1.equipo = response.data.equipo1;
          this.formacion2.equipo = response.data.equipo2;
        })
        .catch(e => console.log(e));
    },
    async getJugador1() {
      await this.$axios
        .get(this.$path + `/carnet/FindAll/${this.formacion1.equipo.id}`)
        .then(response => {
          this.jugadores = response.data;
        })
        .catch(e => console.log(e));
    },
    async getJugador2() {
      await this.$axios
        .get(this.$path + `/carnet/FindAll/${this.formacion2.equipo.id}`)
        .then(response => {
          this.jugadores = response.data;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style></style>
