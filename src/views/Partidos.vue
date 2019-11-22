<template>
<b-container id="contenedor">
    <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab v-for="j in jornadas" :key="j.id" :title="'jornada '+j.numero">
       <b-card align="center" v-for="p in j.partidoList" :key="p.id" class="container-fluid">
          <div class="row justify-content-start">
            <div class="col">
            <img :src="p.equipo1.equipo.logo"
             alt="logo1" width="100px" height="100px">
               <p>{{ p.equipo1.equipo.nombre }}</p>
            </div>
            <b-card-body title="Horario">
              <b-card-text title="Dia">
                {{ p.horario.dia }}
              </b-card-text>
              <b-card-text title="Hora">
                {{ p.horario.hora }}
              </b-card-text>
            </b-card-body>
            <div class="col">
             <img :src="p.equipo2.equipo.logo" 
             alt="logo1" width="100px" height="100px">
             <p>{{ p.equipo2.equipo.nombre }}</p>
            </div>
          </div>
       </b-card>
        </b-tab>
    </b-tabs>
  </b-card>
</b-container>
</template>
<script>
export default {
data(){
  return {
    jornadas:[]
  }
},
methods:{
 async getJornadas(){
  await this.$axios.get(this.$path+"/jornada/All").then(response=>{
        this.jornadas=response.data;
			}).catch(e=>console.log(e));
  }
},
mounted(){
  this.getJornadas();
}
}
</script>

<style>
#contenedor{
  width: 60%;
  margin-left: 20%;
}
</style>