<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update Group</h3>
    <form>
      <v-text-field
        v-model="group_name"
        prepend-icon="fa fa-group"
        label="Group Name"
        type="text"
      ></v-text-field>
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="updateGroup($route.params.id)">Save</v-btn>
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
    group_name: '',
    isSuccess: false,
  }),
  methods: {
    async getGroupDetail(group_id) {
      const { data: { name } } = await http.get(`groups/${group_id}`);
      return name;
    },
    async updateGroup(group_id) {
      let { status } = await http.patch(`groups/${group_id}`, {
        name: this.group_name,
      });
      if (status === 200) {
        this.isSuccess = true;
      }
    }
  },
  async mounted() {
    this.group_name = await this.getGroupDetail(this.$route.params.id);
  }
}
</script>
