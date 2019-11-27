<template>
  <b-container>
    <div id="botons">
      <b-button v-if="!bo">Iniciar</b-button>
      <b-button>Goles</b-button>
      <b-button>Tarjeta Amarilla</b-button>
      <b-button>Tarjeta Roja</b-button>
      <b-button>Cambio</b-button>
      <b-button>Finalizar</b-button>
    </div>
    <div id="content" class="text-center">
        <div id="actions">
         Hola1
        </div>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      bo: false,
      lista: [
        {
          mensaje: "hola1",
          tipo: true
        },
        {
          mensaje: "hola2",
          tipo: false
        }
      ]
    };
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
#content{
    border-radius: 10px 10px 10px 10px;
    border: 1px solid darkslategrey;
  
}
#actions{
  width: 70%;
  margin-left: 15%;
  border: 1px solid black;
}
</style>
