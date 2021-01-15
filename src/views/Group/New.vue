<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update Group</h3>
    <form>
      <v-text-field 
        v-model="group_name"
        prepend-icon="fa fa-user"
        label="Group Name"
        type="text"
      ></v-text-field>
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="saveGroup()">Save</v-btn>
      </div>
    </form>
    <toast :status.sync="isSuccess" message="Created Successfully" />
  </div>
</template>

<script>
import { http } from '@/api.js';
import Toast from "@/components/Toast.vue";

export default {
  name: 'EditGroup',
  components: {
    Toast,
  },
  data: () => ({
    group_name: '',
    isSuccess: false,
  }),
  methods: {
    async saveGroup() {
      let { data: { id } } = await http.post(`groups`, {
        name: this.group_name,
      });
      if (id) {
        this.isSuccess = true;
      }
    }
  },
}
</script>
