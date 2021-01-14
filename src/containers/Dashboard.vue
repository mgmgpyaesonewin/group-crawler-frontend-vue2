<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <my-logo></my-logo>
      <my-menu></my-menu>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from '../components/HelloWorld';
import Logo from '../components/Logo';
import Menu from '../components/Menu';

export default {
  name: 'DashboardContainer',

  components: {
    HelloWorld,
    "my-logo": Logo,
    "my-menu": Menu
  },

  data: () => ({
    drawer: null
  }),
};
</script>
