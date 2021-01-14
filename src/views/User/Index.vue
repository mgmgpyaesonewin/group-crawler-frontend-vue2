<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      class="elevation-1 tw-px-4 tw-py-8"
      :search="search"
    >
      <template v-slot:[`item.created_at`]="{ item }">
        {{ format(item.created_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ format(item.created_at) }}
      </template>
      <template v-slot:[`item._id`]="{ item }">
        <v-btn :to='`/users/edit/${item._id}`' color="primary" class="tw-mx-2">Edit</v-btn>
        <v-btn color="error">Delete</v-btn>
      </template>
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search Anythings"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { http } from '@/api.js';
import moment from 'moment';

export default {
  name: "Users",
  data() {
    return {
      search: "",
      calories: "",
      users: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "User Name",
          align: "start",
          value: "username",
        },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },
        { text: "Action", align:"center", value: "_id" },
      ];
    },
  },
  methods: {
    getUsers() {
      http.get('http://localhost:3000/users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(user_id) {
      console.log(user_id);
    },
    format(dateString) {
      return moment.utc(dateString).local().format('ddd DD/MM/YY, h:mm A');
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>