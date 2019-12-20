<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-row align="center" justify="center">
          <v-avatar>
            <img :src="equipo.equipo.logo" />
          </v-avatar>
          <h2 class="display-1 white--text font-weight-light margen">
            {{ equipo.equipo.nombre }}
          </h2>
        </v-row>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="busqueda"
          single-line
          dark
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="jugadores"
        :search="search"
        :items-per-page="20"
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:item.foto="{ item }">
          <v-avatar>
            <img :src="item.foto" />
          </v-avatar>
        </template>
        <template v-slot:item.eliminar="{ item }">
          <v-row>
            <v-btn @click="eliminar(item.id)">
              <img
                src="https://cdn1.iconfinder.com/data/icons/photos-collage-editor/22/delete-trash-remove-256.png"
                height="30px"
                width="30px"
            /></v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      load: true,
      headers: [
        { text: "Foto", value: "foto" },
        { text: "Nombre", value: "nombre" },
        { text: "Lugar", value: "lugar" },
        { text: "Posicion", value: "posicion" },
        { text: "Dorsal", value: "dorsal" },
        { text: "Eliminar", value: "eliminar" }
      ],
      search: "",
      jugadores: [],
      equipo: {
        equipo: {}
      }
    };
  },
  methods: {
    async getJug() {
      await this.$axios
        .get(this.$path + `/carnet/FindAll/${this.$route.params.id}`)
        .then(response => {
          this.lista(response.data);
        })
        .catch(e => console.log(e));
      this.load = false;
    },
    getEquipo() {
      this.$axios
        .get(this.$path + `/equipoT/FindBy/${this.$route.params.id}`)
        .then(response => {
          this.equipo = response.data;
        })
        .catch(e => console.log(e));
    },
    lista(listado) {
      Array.from(listado).forEach(j => {
        this.jugadores.push({
          id: j.id,
          foto: j.jugador.foto,
          nombre: j.jugador.persona.nombres + " " + j.jugador.persona.apellidos,
          lugar: j.jugador.persona.lugar.nombre,
          posicion: j.jugador.posicion,
          dorsal: j.dorsal
        });
      });
    },
    eliminar(id) {
      var res = false;
      const URL = this.$path + `/carnet/Delete/${id}`;
      this.$axios
        .get(URL)
        .then(x => {
          res = x.data;
        })
        .catch(e => console.log(e));
      if (res) {
        this.jugadores.splice(
          this.jugadores.indexOf(this.jugadores.find(x => x.id == id)),
          1
        );
      }else{
         Swal.fire({
          timer: 1500,
          position: "top-end",
          type: "error",
          title: "no puede borrarlo",
          showConfirmButton: false,
          animation: true
        });
      }
    }
  },
  created() {
    this.getJug();
    this.getEquipo();
  }
};
</script>
<style>
.margen {
  margin-left: 10%;
}
</style>
