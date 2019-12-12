<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row>
          <v-btn v-if="showa" dark rounded color="green" @click="equipo()"
            >Agregar equipo</v-btn
          >
          <v-btn
            v-if="showg"
            :disabled="load"
            :loading="load"
            rounded
            dark
            color="green"
            @click="generar()"
          >
            Generar partidos
          </v-btn>
        </v-row>
        <v-spacer></v-spacer>
        <span class="text--darken-1 h3 text-justify"
          >Equipos en la temporada</span
        >
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
        :items-per-page="20"
        hide-default-footer
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:item.logo="{ item }">
          <v-avatar>
            <img :src="item.logo" />
          </v-avatar>
        </template>
        <template v-slot:item.repre="{ item }">
          <v-row>
            <v-avatar width="30" height="30">
              <img :src="item.repre.foto" />
            </v-avatar>
            <span>
              {{ item.repre.persona.nombres }}
            </span>
          </v-row>
        </template>
        <template v-slot:item.jugador="{ item }">
          <v-row>
            <v-btn :disabled="item.progreso == 0" @click="listaj(item.id)">
              <img
                src="https://cdn1.iconfinder.com/data/icons/delivery-logistics/512/shopping_list-256.png"
                height="30px"
                width="30px"
            /></v-btn>
          </v-row>
        </template>
        <template v-slot:item.progreso="{ item }">
          <v-progress-linear
            :value="(item.progreso * 100) / 18"
            color="light-green darken-4"
            height="25"
            striped
            buffer-value="0"
            stream
          >
            <span class="darken-2">{{ item.progreso }}</span>
          </v-progress-linear>
        </template>
        <template v-slot:item.opcion="{ item }">
          <v-row align="center" justify="center">
            <v-btn
              :disabled="item.progreso > 17"
              light
              tile
              @click="agregar(item.id)"
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/silky-icon-user-filled-in/60/user2-add-256.png"
                height="30px"
                width="30px"
            /></v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="load" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Espere mientras carga
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      load: false,
      id: 0,
      nombre: "",
      showa: false,
      showg: false,
      search: "",
      equipos: [],
      headers: [
        { text: "Logo", value: "logo" },
        { text: "Equipo", value: "equipo" },
        { text: "Lugar", value: "lugar" },
        { text: "Representante", value: "repre" },
        { text: "Jugadores", value: "jugador" },
        { text: "Progreso", value: "progreso" },
        { text: "Incorporar", value: "opcion" }
      ]
    };
  },
  watch: {
    load(val) {
      if (!val) return;
      setTimeout(() => (this.load = false), 40000);
    }
  },
  methods: {
    equipo() {
      this.$router.push({
        name: "equipot"
      });
    },
    listaj(id) {
      this.$router.push({
        name: "carnetlist",
        params: {
          id: id
        }
      });
    },
    agregar(id) {
      this.$router.push({
        name: "carnet",
        params: {
          id: id
        }
      });
    },
    async generar() {
      this.load = true;
      const URL = this.$path + "/partido/Generar";
      await this.$axios.get(URL).catch(e => console.log(e));
      this.$router.push("/partidos");
    },
    lista(listado) {
      Array.from(listado).forEach(j => {
        this.equipos.push({
          id: j.equipo.id,
          logo: j.equipo.equipo.logo,
          equipo: j.equipo.equipo.nombre,
          lugar: j.equipo.equipo.lugar.nombre,
          repre: j.equipo.representante,
          jugador: "",
          progreso: j.integrantes,
          opcion: "ir"
        });
      });
    },
    getList() {
      const URL = this.$path + "/equipoT/dentro";
      this.$axios
        .get(URL)
        .then(response => {
          this.lista(response.data);
        })
        .catch(e => console.log(e));
    },
    getshowg() {
      const URL = this.$path + "/temporada/showg";
      this.$axios
        .get(URL)
        .then(response => {
          this.showg = response.data;
        })
        .catch(e => console.log(e));
    },
    getval() {
      const URL = this.$path + "/temporada/showa";
      this.$axios
        .get(URL)
        .then(response => {
          this.showa = response.data;
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.getList();
    this.getval();
    this.getshowg();
  }
};
</script>
<style>
button {
  margin-left: 10px;
}
</style>
