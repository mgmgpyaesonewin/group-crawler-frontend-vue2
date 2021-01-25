<template>
  <v-app>
    <v-main>
      <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
            <div class="tw-flex login-form tw-text-center">
                <v-card>
                    <v-card-text>
                        <div class="display-1 mb-3">Login</div>
                        <v-form>
                        <v-text-field
                            v-model="username"
                            prepend-icon="fa fa-user"
                            label="Username"
                            type="text"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            prepend-icon="fa fa-lock"
                            label="Password"
                            type="password"
                        ></v-text-field>
                        <v-btn @click.prevent="login" block="block" color="primary" type="submit">Sign in</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </div>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer app="app">
        <v-flex class="tw-text-center">© 2021. All rights reserved.</v-flex>
    </v-footer>
  </v-app>
</template>

<script>
// import axios from 'axios';
// import { baseURL } from '@/api.js';

export default {
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
  }),
  methods: {
    login() {
      this.$router.push('/posts');
      // axios.post(`${baseURL}auth/login`, {
      //   username: this.username,
      //   password: this.password
      // })
      //   .then((response) => {
      //     const { access_token } = response.data;
      //     localStorage.setItem('access_token', access_token);
      //     this.$router.push('/users');
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
};
</script>

<style>
</style>
