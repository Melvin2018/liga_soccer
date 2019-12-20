<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn color="primary" dark rounded @click="agregar">Agregar</v-btn>
        <v-spacer></v-spacer>
        <span class="text--darken-1 h3 text-justify">Equipos</span>
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
        :items="equipos"
        :search="search"
        :loading="load"
        loading-text="cargando..."
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.logo="{ item }">
          <img :src="item.logo" :alt="item.nombre" height="40px" width="40px" />
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
      equipos: [],
      search: "",
      headers: [
        { text: "Foto", value: "logo" },
        { text: "Nombre", value: "nombre" },
        { text: "Lugar", value: "lugar" },
        { text: "Opciones", value: "opciones" }
      ]
    };
  },
  mounted() {
    this.getJug();
  },
  methods: {
    async getJug() {
      const URL = this.$path + "/equipo/All";
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
        this.equipos.push({
          id: j.id,
          logo: j.logo,
          nombre: j.nombre,
          lugar: j.lugar.nombre
        });
      });
    },
    agregar() {
      this.$router.push({
        name: "agregare"
      });
    },
    editar(idj) {
      var id = parseInt(idj, 10);
      this.$router.push({
        name: "editare",
        params: {
          id: id
        }
      });
    },
    async eliminar(id) {
      const URL = this.$path + `/equipo/Delete/${id}`;
      var b = false;
      await this.$axios
        .get(URL)
        .then(x => {
          b = x.data;
        })
        .catch(e => console.log(e));
      if (b) {
        this.equipos.splice(
          this.equipos.indexOf(this.equipos.find(x => x.id == id)),
          1
        );
        
      } else {
        Swal.fire({
          type: "error",
          title: "Equipo con registro",
          text: "este equipo ya esta vinculado a una temporada!"
        });
      }
    }
  }
};
</script>
