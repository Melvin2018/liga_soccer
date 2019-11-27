<template>
  <div id="app">
    <header>
      <b-container>
        <b-navbar type="dark" variant="dark" id="cont">
          <b-navbar-nav>
            <b-nav-item href="/"
              ><img src="./assets/img/AG.png" height="40px" width="40px"
            /></b-nav-item>
            <b-nav-item href="/jugador">Jugadores</b-nav-item>
            <b-nav-item href="/equipo">Equipos</b-nav-item>
            <b-nav-item-dropdown text="Tablas" centered>
              <b-dropdown-item href="/tabla">General</b-dropdown-item>
              <b-dropdown-item href="#">Goles</b-dropdown-item>
              <b-dropdown-item href="#">Tarjetas Amarillas</b-dropdown-item>
              <b-dropdown-item href="#">Tarjetas Rojas</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Temporada" centered>
              <b-dropdown-item href="/equipotemporada"
                >Temporada actual</b-dropdown-item
              >
              <b-dropdown-item href="/temporada"
                >temporadas pasadas</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Jornadas" centered>
              <b-dropdown-item href="/partidos">Jornadas</b-dropdown-item>
              <b-dropdown-item href="/jornada_actual">Jornada actual</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </b-container>
    </header>
    <br />
    <router-view />
  </div>
</template>
<style>
body {
  background-image: url(./assets/img/Banner.jpg);
  background-size: cover;
}
#cont {
  margin-top: 10px;
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 0px solid #000000;
}
</style>
