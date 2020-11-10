<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar class="container">
        <q-toolbar-title>
          <router-link to="/" class="header__item">
            Home
          </router-link>
        </q-toolbar-title>
        <router-link to="/posters" class="header__item">
          Posters
        </router-link>
        <router-link to="/albums" class="header__item">
          Albums
        </router-link>
        <router-link to="/images" class="header__item">
          Images
        </router-link>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
  .header {
    background: rgba(0, 0, 0, 0.8);

    &__item {
      color: #d1cdcd;
      letter-spacing: 2px;
      text-decoration: none;
      transition: 0.25s;
      margin: 0 10px;

      &:hover {
        color: #fff;
      }

      &.router-link-exact-active {
        color: #fff;
      }
    }
  }
</style>
