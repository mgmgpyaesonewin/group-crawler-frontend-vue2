<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update User</h3>
    <form>
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
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="updateUser($route.params.id)">Save</v-btn>
      </div>
    </form>
    <v-snackbar
      v-model="status"
      timeout="2000"
      right
      top
    >
      {{ 'Updated Successfully' }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="status = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { http } from '@/api.js';

export default {
  name: 'EditUser',
  data: () => ({
    username: '',
    password: '',
    status: false,
  }),
  methods: {
    async getUserDetail(user_id) {
      const { data: { username } } = await http.get(`users/${user_id}`);
      return username;
    },
    async updateUser(user_id) {
      let { status } = await http.patch(`users/${user_id}`, {
        username: this.username,
        password: this.password
      });
      if (status === 200) {
        this.status = true;
      }
    }
  },
  async mounted() {
    this.username = await this.getUserDetail(this.$route.params.id);
  }
}
</script>
