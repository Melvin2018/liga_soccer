<template>
  <b-container v-if="carnets1.length > 0">
    <v-card>
      <v-card-text>
        <v-tabs fixed-tabs v-model="tabs" centered color="info">
          <v-tab>{{ formacion1.equipo.equipo.nombre }}</v-tab>
          <v-tab>{{ formacion2.equipo.equipo.nombre }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-container>
              <v-alert prominent type="error" v-if="error">
                <v-row align="center">
                  <v-col class="grow">{{ errorm }}</v-col>
                </v-row>
              </v-alert>
              <v-row justify="center" no-gutters>
                <v-col class="text-center text">
                  <span class="h5">Posibles</span>
                  <v-data-table
                    v-model="jugadores1"
                    :headers="headers"
                    :items="carnets1"
                    item-key="id"
                    show-select
                    hide-default-header
                    hide-default-footer
                    :items-per-page="carnets1.length"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:item.foto="{ item }">
                      <img
                        :src="item.foto"
                        :alt="item.name"
                        height="40px"
                        width="40px"
                      />
                    </template>
                    <template v-slot:item.nombre="{ item }">
                      <span>{{ item.dorsal }}</span> {{ item.nombre }}
                    </template>
                  </v-data-table>
                </v-col>
                <v-col class="text-center text">
                  <span class="h5">Dentro</span>
                  <v-data-table
                    :headers="headers1"
                    :items="jugadores1"
                    item-key="id"
                    hide-default-header
                    hide-default-footer
                    :items-per-page="carnets1.length"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:item.foto="{ item }">
                      <img
                        :src="item.foto"
                        :alt="item.name"
                        height="40px"
                        width="40px"
                      />
                    </template>
                    <template v-slot:item.nombre="{ item }">
                      <span>{{ item.dorsal }}</span> {{ item.nombre }}
                    </template>
                    <template v-slot:item.titular="{ item }">
                      <v-switch
                        v-model="item.titular"
                        label="titular"
                        color="info"
                        hide-details
                      >
                      </v-switch>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-alert prominent type="error" v-if="error1">
                <v-row align="center">
                  <v-col class="grow">{{ errorm1 }}</v-col>
                </v-row>
              </v-alert>
              <v-row justify="center" no-gutters>
                <v-col class="text-center text">
                  <span class="h5">Posibles</span>
                  <v-data-table
                    v-model="jugadores2"
                    :headers="headers"
                    :items="carnets2"
                    item-key="id"
                    show-select
                    hide-default-header
                    hide-default-footer
                    :items-per-page="carnets2.length"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:item.foto="{ item }">
                      <img
                        :src="item.foto"
                        :alt="item.name"
                        height="40px"
                        width="40px"
                      />
                    </template>
                    <template v-slot:item.nombre="{ item }">
                      <span>{{ item.dorsal }}</span> {{ item.nombre }}
                    </template>
                  </v-data-table>
                </v-col>
                <v-col class="text-center text">
                  <span class="h5">Dentro</span>
                  <v-data-table
                    :headers="headers1"
                    :items="jugadores2"
                    item-key="id"
                    hide-default-header
                    hide-default-footer
                    :items-per-page="carnets2.length"
                    dense
                    class="elevation-1"
                  >
                    <template v-slot:item.foto="{ item }">
                      <img
                        :src="item.foto"
                        :alt="item.name"
                        height="40px"
                        width="40px"
                      />
                    </template>
                    <template v-slot:item.titular="{ item }">
                      <v-switch
                        v-model="item.titular"
                        label="titular"
                        color="info"
                        hide-details
                      >
                      </v-switch>
                    </template>
                    <template v-slot:item.nombre="{ item }">
                      <span>{{ item.dorsal }}</span> {{ item.nombre }}
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions class="justify-content-center">
        <v-btn
          
          :loading="load"
          @click="onSubmit"
          class="darken-2"
          height="70"
        >
          <v-avatar>
            <img
              src="https://cdn3.iconfinder.com/data/icons/computers-programming/512/disk_B-256.png"
            />
          </v-avatar>
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      load: false,
      error: false,
      errorm: "",
      error1: false,
      errorm1: "",
      headers: [
        { text: "Foto", value: "foto" },
        { text: "Posicion", value: "posicion" },
        { text: "Nombre", value: "nombre" }
      ],
      headers1: [
        { text: "Foto", value: "foto" },
        { text: "Nombre", value: "nombre" },
        { text: "Titular", value: "titular" }
      ],
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
      carnets1: [],
      carnets2: [],
      tabs: null,
      jugadores1: [],
      jugadores2: [],
    };
  },
  methods: {
    async onSubmit() {
      var b1 = this.validar();
      var b2 = this.validar1();
      if (b1 & b2) {
        this.load = true;
        this.llenar();
      }
    },
    async llenar() {
      await this.jugadores1.forEach(x => {
        this.formacion1.formacionCarnetList.push({
          jugador: x.carnet,
          titular: x.titular
        });
      });
      await this.jugadores2.forEach(x => {
        this.formacion2.formacionCarnetList.push({
          jugador: x.carnet,
          titular: x.titular
        });
      });
      const URL = this.$path + "/formacion/Add";
      await this.$axios.post(URL, this.formacion1).catch(e => console.log(e));
      await this.$axios.post(URL, this.formacion2).catch(e => console.log(e));
      this.$router.push({
        name: "partido",
        params: {
          id: this.$route.params.id
        }
      });
    },
    async getPartido(id) {
      var partido;
      await this.$axios
        .get(this.$path + `/partido/FindBy/${id}`)
        .then(response => {
          partido = response.data;
          this.formacion1.partido = partido;
          this.formacion2.partido = partido;
          this.formacion1.equipo = partido.equipo1;
          this.formacion2.equipo = partido.equipo2;
        })
        .catch(e => console.log(e));
      this.getJugador1(partido.equipo1.id);
      this.getJugador2(partido.equipo2.id);
    },
    async getJugador1(id) {
      var listado = [];
      await this.$axios
        .get(this.$path + "/carnet/FindAll/" + id)
        .then(response => {
          listado = response.data;
        })
        .catch(e => console.log(e));
      this.carnets1 = this.lista(listado);
    },
    async getJugador2(id) {
      var listado = [];
      await this.$axios
        .get(this.$path + "/carnet/FindAll/" + id)
        .then(response => {
          listado = response.data;
        })
        .catch(e => console.log(e));
      this.carnets2 = this.lista(listado);
    },
    validar() {
      var bool = false;
      var nu = this.jugadores1.filter(x => x.titular == true).length;
      if ((this.jugadores1.length > nu) & (nu < 11)) {
        this.error = true;
        this.errorm =
          "todavia falta para los 11 jugadores, y aun hay unos sin seleccionar como titulares";
      } else if (nu > 11) {
        this.error = true;
        this.errorm = "se ha sobrepasado de los 11 jugadores titulares";
      } else if (nu < 7) {
        this.error = true;
        this.errorm = "el reglamento indica que no puede jugar con menos de 7";
      } else {
        bool = true;
        this.error = false;
      }
      return bool;
    },
    validar1() {
      var bool = false;
      var nu = this.jugadores2.filter(x => x.titular == true).length;
      if ((this.jugadores2.length > nu) & (nu < 11)) {
        this.error1 = true;
        this.errorm1 =
          "todavia falta para los 11 jugadores, y aun hay unos sin seleccionar como titulares";
      } else if (nu > 11) {
        this.error1 = true;
        this.errorm1 = "se ha sobrepasado de los 11 jugadores titulares";
      } else if (nu < 7) {
        this.error1 = true;
        this.errorm1 = "el reglamento indica que no puede jugar con menos de 7";
      } else {
        bool = true;
        this.error1 = false;
      }
      return bool;
    },
    lista(listado) {
      var lista = [];
      Array.from(listado).forEach(j => {
        lista.push({
          id: j.id,
          dorsal: j.dorsal,
          foto: j.jugador.foto,
          posicion: j.jugador.posicion,
          nombre: j.jugador.persona.nombres + " " + j.jugador.persona.apellidos,
          titular: false,
          carnet: j
        });
      });
      return lista;
    }
  },
  mounted() {
    this.getPartido(this.$route.params.id);
  }
};
</script>
<style>
.text {
  width: 48%;
  margin: 1%;
}
table span {
  color: rgb(27, 197, 69);
}
</style>
