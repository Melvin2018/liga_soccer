<template>
  <b-container>
    <div id="botons">
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
          <b-card-body>
            <b-card-text>2-1</b-card-text>
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
        <div class="col">
          <b-card no-body align="center">
            <b-card-body>
              <div>
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
    return {
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
#content {
  border-radius: 10px 10px 10px 10px;
  border: 1px solid darkslategrey;
}
#actions {
  width: 70%;
  margin-left: 15%;
  border: 1px solid black;
}
</style>
