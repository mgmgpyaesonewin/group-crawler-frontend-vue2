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
        <v-btn color="error" @click="deleteUser(item._id)">Delete</v-btn>
      </template>
      <template v-slot:top>
        <div class="tw-flex tw-flex-row-reverse">
          <v-btn to='/users/new' color="primary" class="tw-mx-2">New User</v-btn>
        </div>
        <v-text-field
          v-model="search"
          label="Search Anythings"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
    <toast :status.sync="isSuccess" message="Deleted Successfully" />
  </div>
</template>

<script>
import { http } from '@/api.js';
import moment from 'moment';
import Toast from '@/components/Toast.vue';

export default {
  name: "UsersTable",
  components: {
    Toast,
  },
  data() {
    return {
      search: "",
      calories: "",
      users: [],
      isSuccess: false,
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
      http.get('users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteUser(user_id) {
      http.delete(`users/${user_id}`)
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            this.isSuccess = true;
            this.getUsers();
          }
        })
        .catch((error) => {
          console.log(error);
        });
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