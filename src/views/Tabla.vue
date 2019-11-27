<template>
  <b-container>
    <table class="table table-inverse table-hover">
      <thead>
        <tr class="bg-dark text-light">
          <th>N°</th>
          <th>Equipo</th>
          <th>Puntos</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PE</th>
          <th>PP</th>
          <th>GF</th>
          <th>GC</th>
          <th>DG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t,index) in tabla" :key="t.id">
          <td>{{ index+1 }}</td>
          <td>
            <img
              :src="t.equipo.equipo.logo"
              height="20px"
              width="20px"
              alt="foto"
            />
            {{ t.equipo.equipo.nombre }}
          </td>
          <td>{{ t.puntos }}</td>
          <td>{{ t.pj }}</td>
          <td>{{ t.pg }}</td>
          <td>{{ t.pe }}</td>
          <td>{{ t.pp }}</td>
          <td>{{ t.gf }}</td>
          <td>{{ t.gc }}</td>
          <td>{{ t.gf - t.gc }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      tabla: []
    };
  },
  methods: {
    async getTabla() {
      const URL = this.$path + "/tabla/All";
      await this.$axios
        .get(URL)
        .then(response => {
          this.tabla = response.data;
        })
        .catch(e => console.log(e));
    }
  }, mounted(){
      this.getTabla();
  }
};
</script>
<style>
table{
	background-color:darkgray;
}
</style>