<template>
  <v-app id="contenedor">
    <v-navigation-drawer
      v-model="drawer"
      style="font-size:20px"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item link href="/jugador">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Jugadores</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/equipo">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn3.iconfinder.com/data/icons/social-media-logos-flat-colorful-1/2048/5360_-_Dzone-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Equipos</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/tabla">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn4.iconfinder.com/data/icons/twitter-ui-set/128/News-512.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Tabla</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/jornada_actual">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn0.iconfinder.com/data/icons/zeon-basketball-i/32/match_league_versus_-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Partidos</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/partidos">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-6/32/calendar-selection-week-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Jornadas</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/equipotemporada">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn0.iconfinder.com/data/icons/football-and-soccer-1/50/11-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Temporada Actual</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/temporada/estadisticas">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn1.iconfinder.com/data/icons/science-41/64/Statistics-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Estadisticas</v-list-item-title>
        </v-list-item>
        <v-list-item link href="/temporada">
          <v-list-item-icon>
            <v-img
              height="30px"
              width="30px"
              src="https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-6/32/logs-256.png"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-title>Historial</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dark
      src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Action Goal
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: null
  })
};
</script>
<style>
#contenedor {
  background-image: url(./assets/fondo.jpg);
  background-size: cover;
}
</style>
