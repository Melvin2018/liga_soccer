<template>
  <v-container>
    <v-card>
      <v-card-title class="green lighten-1 justify-center">
        <v-row align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/e-commerce-and-online-shopping/64/__statistics-256.png"
            height="40px"
            width="40px"
          />
          <h2 class="display-1 white--text font-weight-light">
            Estadisticas actuales
          </h2>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-tabs
          fixed-tabs
          v-model="tabs"
          centered
          slider-color="purple"
        >
          <v-tab>Goles</v-tab>
          <v-tab>Tarjetas Amarillas</v-tab>
          <v-tab>Tarjetas rojas</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item v-for="n in 3" :key="n">
            <v-card>
              <v-card-title class="light-gray lighten-2 justify-center">
                <v-row justify="center">
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/internet-marketing-flamingo-vol-1/128/IMPRESSIONS-01-256.png"
                    height="40px"
                    width="40px"
                  />
                  <h2 class="display-1 lighten-2 margen">
                    {{ titulo(n) }}
                  </h2>
                </v-row>
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
                :items="lista(n)"
                sort-by="cantidad"
                :sort-desc="true"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:item.foto="{ item }">
                  <v-avatar>
                    <img :src="item.foto" />
                  </v-avatar>
                </template>
                <template v-slot:item.equipo="{ item }">
                  <v-avatar>
                    <img :src="item.equipo.logo" />
                  </v-avatar>
                  {{ item.equipo.nombre }}
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      tabs: null,
      conteo: [],
      search: "",
      headers: [
        { text: "Foto", value: "foto" },
        { text: "Nombre", value: "nombre" },
        { text: "Equipo", value: "equipo" },
        { text: "Lugar", value: "lugar" },
        {
          text: "Cantidad",
          value: "cantidad"
        },
        { text: "Posicion", value: "posicion" }
      ]
    };
  },
  methods: {
    cantidad(num, x) {
      if (num == 1) {
        return x.goles;
      } else if (num == 2) {
        return x.amarillas;
      } else {
        return x.rojas;
      }
    },
    titulo(num) {
      if (num == 1) {
        return "tabla de goleo";
      } else if (num == 2) {
        return "tabla de amarillas";
      } else {
        return "tabla de rojas";
      }
    },
    lista(num) {
      var listado = [];
      this.conteo.forEach(x => {
        listado.push({
          foto: x.jugador.jugador.foto,
          nombre: x.jugador.jugador.persona.nombres+' '+x.jugador.jugador.persona.apellidos,
          lugar: x.jugador.jugador.persona.lugar.nombre,
          equipo: x.equipo,
          posicion: x.jugador.jugador.posicion,
          cantidad: this.cantidad(num, x)
        });
      });
      return listado;
    },
    async peticion() {
      await this.$axios
        .get(this.$path + "/carnet/conteo")
        .then(response => {
          this.conteo = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.peticion();
  }
};
</script>

<style>
.margen {
  margin-left: 10%;
}
</style>
