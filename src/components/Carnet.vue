<template>
  <v-container>
    <v-card v-if="jugadores.length > 0">
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn4.iconfinder.com/data/icons/leto-security-2/64/_identity_id_card-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Ingresando carnet
        </h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                type="number"
                label="Dorsal"
                v-model="carnet.dorsal"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-select
                v-model="carnet.jugador"
                required
                :items="jugadores"
                label="Jugador"
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
    <v-alert type="error" v-else-if="!load">
      no hay jugadores para registrar
    </v-alert>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      load: true,
      jugadores: [],
      carnet: {
        dorsal: 0,
        jugador: {}
      }
    };
  },
  methods: {
    salir() {
      this.$router.push({
        name: "listadoET"
      });
    },
    async onSubmit() {
      var val = 1;
      if (this.carnet.dorsal == 0) {
        await Swal.fire({
          timer: 1500,
          position: "top-end",
          type: "error",
          title: "ingrese dorsal",
          showConfirmButton: false,
          animation: true
        });
      } else {
        const URL = this.$path + "/carnet/Add/" + this.$route.params.id;
        await this.$axios
          .post(URL, this.carnet)
          .then(response => {
            val = response.data;
          })
          .catch(e => console.log(e));
        if (val == 2) {
          await Swal.fire({
            timer: 1500,
            position: "top-end",
            type: "error",
            title: "Dorsal",
            text: "dorsal duplicado",
            showConfirmButton: false,
            animation: true
          });
        } else if (val == 1) {
          await Swal.fire({
            timer: 1500,
            position: "top-end",
            type: "error",
            title: "Jugador",
            text: "jugador ya esta registrado",
            showConfirmButton: false,
            animation: true
          });
        } else {
          await Swal.fire({
            position: "top-end",
            type: "success",
            title: "Se ha agregado",
            showConfirmButton: false,
            timer: 1500
          });
          this.salir();
        }
      }
    },
    async getJugadores() {
      await this.$axios
        .get(this.$path + `/Jugador/posiblesc/${this.$route.params.id}`)
        .then(response => {
          this.jugadores = response.data;
        })
        .catch(e => console.log(e));
      this.carnet.jugador = this.jugadores[0];
      this.load = false;
    }
  },
  beforeMount() {
    this.getJugadores();
  }
};
</script>
