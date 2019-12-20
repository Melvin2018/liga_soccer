<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-avatar>
          <img
            src="https://cdn4.iconfinder.com/data/icons/universal-glyph/614/1019_-_Edit_Profile-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Editando equipo
        </h2>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="8">
              <v-text-field
                v-model="equipo.nombre"
                label="Nombre"
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
                v-model="equipo.lugar"
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
        <v-btn color="green darken-1" rounded dark @click="salir"
          >Cancelar</v-btn
        >
        <v-btn
          color="green darken-1"
          rounded
          dark
          @click="onSubmit"
          :loading="load"
          >Guardar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import firebase from "firebase/app";
import "firebase/storage";
export default {
  data() {
    return {
      load: false,
      imageData: null,
      equipo: {
        id: this.$route.params.id,
        logo: "",
        nombre: "",
        lugar: {}
      },
      lugares: []
    };
  },
  methods: {
    salir() {
      this.$router.push("/equipo");
    },
    async onSubmit() {
      this.load = true;
      if (this.imageData) {
        if (navigator.onLine) {
          var sec = new Date().getSeconds();
          const response = await firebase
            .storage()
            .ref(`equipos/${sec}${this.imageData.name}`)
            .put(this.imageData);
          const url = await response.ref.getDownloadURL();
          this.equipo.logo = await url.toString();
        }
      }
      await this.$axios
        .post(this.$path + "/equipo/Add", this.equipo)
        .catch(e => console.log(e));
      this.$router.push("/equipo");
    },
    getLugar() {
      this.$axios
        .get(this.$path + "/lugar/All")
        .then(response => {
          this.lugares = response.data;
        })
        .catch(e => console.log(e));
    },
    async llenar() {
      await this.$axios
        .get(this.$path + `/equipo/FindBy/${this.$route.params.id}`)
        .then(response => {
          this.equipo = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.llenar();
    this.getLugar();
  }
};
</script>
<style>
button {
  margin-left: 10px;
}
</style>
