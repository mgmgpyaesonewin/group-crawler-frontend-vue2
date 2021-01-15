<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update User</h3>
    <form>
      <v-text-field
        v-model="industry_name"
        prepend-icon="fa fa-user"
        label="Industry Name"
        type="text"
      ></v-text-field>
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="saveIndustry()">Save</v-btn>
      </div>
    </form>
    <toast :status.sync="isSuccess" message="Created Successfully" />
  </div>
</template>

<script>
import { http } from '@/api.js';
import Toast from "@/components/Toast.vue";

export default {
  name: 'EditIndustry',
  components: {
    Toast,
  },
  data: () => ({
    industry_name: '',
    isSuccess: false,
  }),
  methods: {
    async saveIndustry() {
      let { data: { id } } = await http.post(`industries`, {
        name: this.industry_name,
      });
      if (id) {
        this.isSuccess = true;
      }
    }
  },
}
</script>
