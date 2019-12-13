<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-spacer></v-spacer>
        <v-avatar>
          <img
            src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699311-icon-40-clipboard-list-256.png"
          />
        </v-avatar>
        <h2 class="display-1 white--text font-weight-light">
          Posiciones
        </h2>
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
        :items="tabla"
        :search="search"
        :loading="load"
        hide-default-footer
        :items-per-page="20"
        loading-text="cargando..."
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.id="{ item }">
          {{
            tabla
              .map(x => {
                return x.id;
              })
              .indexOf(item.id) + 1
          }}
        </template>
        <template v-slot:item.nombre="{ item }">
          <img :src="item.equipo.equipo.logo" height="40px" width="40px" />{{
            item.equipo.equipo.nombre
          }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      load: true,
      search: "",
      headers: [
        { text: "N°", value: "id" },
        { text: "Equipo", value: "nombre" },
        { text: "Puntos", value: "puntos" },
        { text: "PJ", value: "pj" },
        { text: "PG", value: "pg" },
        { text: "PE", value: "pe" },
        { text: "PP", value: "pp" },
        { text: "GF", value: "gf" },
        { text: "GC", value: "gc" },
        { text: "DG", value: "dg" }
      ],
      tabla: []
    };
  },
  methods: {
    async getTabla() {
      const URL = this.$path + "/tabla/All";
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
        this.tabla.push({
          id: j.id,
          equipo: j.equipo,
          nombre: j.equipo.equipo.nombre,
          puntos: j.puntos,
          pj: j.pj,
          pg: j.pg,
          pe: j.pe,
          pp: j.pp,
          gf: j.gf,
          gc: j.gc,
          dg: j.gf-j.gc
        });
      });
    }
  },
  mounted() {
    this.getTabla();
  }
};
</script>
