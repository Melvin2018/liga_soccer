<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn color="primary" dark rounded @click="agregar">Agregar</v-btn>
        <v-spacer></v-spacer>
        <span class="text--darken-1 h3 text-justify">jugadores</span>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="busqueda"
          single-line
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="jugadores"
        :search="search"
        :loading="load"
        loading-text="cargando..."
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.foto="{ item }">
          <img :src="item.foto" :alt="item.nombre" height="40px" width="40px" />
        </template>
        <template v-slot:item.opciones="{ item }">
          <v-row>
            <v-btn @click="editar(item.id)">
              <img
                src="https://cdn1.iconfinder.com/data/icons/beautiful-line-icons/512/2_edit-256.png"
                height="30px"
                width="30px"
            /></v-btn>
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
      jugadores: [],
      search: "",
      headers: [
        { text: "Foto", value: "foto" },
        { text: "Nombre", value: "nombre" },
        { text: "Dui", value: "dui" },
        { text: "Edad", value: "edad" },
        { text: "Lugar", value: "lugar" },
        { text: "Posicion", value: "posicion" },
        { text: "Opciones", value: "opciones" }
      ]
    };
  },
  mounted() {
    this.getJug();
  },
  methods: {
    async getJug() {
      const URL = this.$path + "/Jugador/All";
      await this.$axios
        .get(URL)
        .then(response => {
          this.lista(response.data);
        })
        .catch(e => console.log(e));
      this.load = false;
    },
    lista(listado) {
      Array.from(listado).forEach(j => {
        this.jugadores.push({
          id: j.id,
          foto: j.foto,
          nombre: j.persona.nombres + " " + j.persona.apellidos,
          dui: j.persona.dui,
          edad: j.persona.edad,
          lugar: j.persona.lugar.nombre,
          posicion: j.posicion,
          opciones: "ir"
        });
      });
    },
    agregar() {
      this.$router.push({
        name: "agregarj"
      });
    },
    editar(idj) {
      var id = parseInt(idj, 10);
      this.$router.push({
        name: "editarj",
        params: {
          id: id
        }
      });
    },
    async eliminar(id) {
      const URL = this.$path + `/Jugador/Delete/${id}`;
      var b = false;
      await this.$axios
        .get(URL)
        .then(x => {
          b = x.data;
        })
        .catch(e => console.log(e));
      if (b) {
        this.jugadores.splice(
          this.jugadores.indexOf(this.jugadores.find(x => x.id == id)),
          1
        );
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "no puede eliminar este jugador!"
        });
      }
    }
  }
};
</script>
