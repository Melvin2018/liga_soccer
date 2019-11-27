<template>
  <b-container>
    <b-card
      :header="'Jornada ' + j.numero"
      class="container-fluid"
      align="center"
      body-border-variant="dark"
      bg-variant="dark"
      border-variant="primary"
      header-text-variant="white"
      header-class="h4 badge-primary"
    >
      <b-card v-for="p in j.partidoList" :key="p.id">
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
            <b-button class="btn-info" @click="ir()"
              >Registrar resultado</b-button
            >
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
    </b-card>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      j: {
        numero: 0,
        partidoList: []
      }
    };
  },
  methods: {
    async getJornada() {
      await this.$axios
        .get(this.$path + "/jornada/FindLast")
        .then(response => {
          this.j = response.data;
        })
        .catch(e => console.log(e));
    },
    ir() {
      this.$router.push("/partido");
    }
  },
  mounted() {
    this.getJornada();
  }
};
</script>
<style></style>
