<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn3.iconfinder.com/data/icons/universal-3-1/614/14_-_Add-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Agregando jugador
        </h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="jugador.persona.nombres"
                label="Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="jugador.persona.apellidos"
                label="Apellido"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="jugador.persona.edad"
                type="number"
                label="Edad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="jugador.persona.dui"
                label="Dui"
                v-mask="mask"
                masked="true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8">
              <v-file-input
                label="Foto"
                filled
                v-model="imageData"
                accept="image/*"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
                v-model="jugador.posicion"
                required
                :items="posiciones"
                item-text="nombre"
                item-value="nombre"
                label="Posicion"
                dense
                outlined
              >
              </v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="8">
              <v-select
                v-model="jugador.persona.lugar"
                required
                :items="lugares"
                item-text="nombre"
                item-value="id"
                label="Lugar"
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
        <v-btn color="green darken-1" rounded dark @click="salir">Cancelar</v-btn>
        <v-btn color="green darken-1" rounded dark @click="onSubmit" :loading="load"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mask } from "vue-the-mask";
import firebase from "firebase/app";
import "firebase/storage";
export default {
  directives: {
    mask
  },
  data() {
    return {
      load: false,
      mask: "########-#",
      imageData: null,
      jugador: {
        foto: "",
        posicion: "",
        persona: {}
      },
      lugares: [],
      posiciones: [
        { id: 1, nombre: "delantero" },
        { id: 2, nombre: "centrocampista" },
        { id: 3, nombre: "defensa" },
        { id: 4, nombre: "portero" }
      ]
    };
  },
  methods: {
    salir() {
      this.$router.push("/jugador");
    },
    async onSubmit() {
      this.load = true;
      if (this.imageData) {
        if (navigator.onLine) {
          var sec = new Date().getSeconds();
          const response = await firebase
            .storage()
            .ref(`jugadores/${sec}${this.imageData.name}`)
            .put(this.imageData);
          const url = await response.ref.getDownloadURL();
          this.jugador.foto = await url.toString();
        }
      }
      await this.$axios
        .post(this.$path + "/Jugador/Add", this.jugador)
        .catch(e => console.log(e));
      this.$router.push("/jugador");
    },
    getLugar() {
      this.$axios
        .get(this.$path + "/lugar/All")
        .then(response => {
          this.lugares = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.getLugar();
  }
};
</script>
<style>
button {
  margin-left: 10px;
}
</style>
