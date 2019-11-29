<template>
  <b-container>
    <div id="botons" class="">
      <b-button>Iniciar</b-button>
      <b-button>Medio tiempo</b-button>
      <b-button>Goles</b-button>
      <b-button>Tarjeta Amarilla</b-button>
      <b-button>Tarjeta Roja</b-button>
      <b-button>Cambio</b-button>
      <b-button>Finalizar</b-button>
    </div>
    <div id="content" class="text-center">
      <div id="actions">
        <div id="partido" class="col">
          <b-card>
            <div class="row justify-content-start">
              <div class="col">
                <img
                  :src="p.equipo1.equipo.logo"
                  alt="logo1"
                  width="100px"
                  height="100px"
                />
                <p>{{ p.equipo1.equipo.nombre }}</p>
              </div>
              <b-card-body title="Horario">
                <b-card-text title="Dia">{{ p.horario.dia }}</b-card-text>
                <b-card-text title="Hora">{{ p.horario.hora }}</b-card-text>
              </b-card-body>
              <div class="col">
                <img
                  :src="p.equipo2.equipo.logo"
                  alt="logo1"
                  width="100px"
                  height="100px"
                />
                <p>{{ p.equipo2.equipo.nombre }}</p>
              </div>
            </div>
          </b-card>
        </div>
        <div class="col">
          <b-card no-body align="center">
            <b-card-body>
              <div>
                <v-icon>home</v-icon>
                inicio de partido
              </div>
            </b-card-body>
          </b-card>
          <b-card no-body align="center">
            <b-card-body>
              <div>
                Gol
              </div>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return { p:{} };
  },
  methods: {
    async getJornada() {
      await this.$axios
        .get(this.$path + "/jornada/Last")
        .then(response => {
          this.p = response.data[0];
        })
        .catch(e => console.log(e));
    }
  },
  mounted() {
    this.getJornada();
  }
};
</script>

<style>
div {
  margin: 10px;
}
#botons button {
  margin-right: 10px;
}
#actions {
  width: 70%;
  margin-left: 15%;
}
</style>
