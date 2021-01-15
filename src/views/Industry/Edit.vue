<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update Industry</h3>
    <form>
      <v-text-field
        v-model="industry_name"
        prepend-icon="fa fa-industry"
        label="Industry Name"
        type="text"
      ></v-text-field>
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="updateIndustry($route.params.id)">Save</v-btn>
      </div>
    </form>
    <toast :status.sync="isSuccess" message="Updated Successfully" />
  </div>
</template>

<script>
import { http } from '@/api.js';
import Toast from '@/components/Toast.vue';

export default {
  name: 'EditUser',
  components: {
    Toast,
  },
  data: () => ({
    industry_name: '',
    isSuccess: false,
  }),
  methods: {
    async getIndustryDetail(industry_id) {
      const { data: { name } } = await http.get(`industries/${industry_id}`);
      return name;
    },
    async updateIndustry(industry_id) {
      let { status } = await http.patch(`industries/${industry_id}`, {
        name: this.industry_name,
      });
      if (status === 200) {
        this.isSuccess = true;
      }
    }
  },
  async mounted() {
    this.industry_name = await this.getIndustryDetail(this.$route.params.id);
  }
}
</script>
