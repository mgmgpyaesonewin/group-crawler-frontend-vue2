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
        <v-btn color="primary" @click="saveUser()">Save</v-btn>
      </div>
    </form>
    <toast :status.sync="isSuccess" message="Created Successfully" />
  </div>
</template>

<script>
import { http } from '@/api.js';
import Toast from "@/components/Toast.vue";

export default {
  name: 'EditUser',
  components: {
    Toast,
  },
  data: () => ({
    username: '',
    password: '',
    isSuccess: false,
  }),
  methods: {
    async saveUser() {
      let { data: { id } } = await http.post(`users`, {
        username: this.username,
        password: this.password
      });
      if (id) {
        this.isSuccess = true;
      }
    }
  },
}
</script>
