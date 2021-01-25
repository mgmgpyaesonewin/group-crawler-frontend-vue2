<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-4 tw-py-4 tw-bg-white">
    <h3>Update Group</h3>
    <form>
      <v-text-field
        v-model="group_name"
        prepend-icon="fa fa-users"
        label="Group Name"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="group_url"
        prepend-icon="fa fa-link"
        label="Group URL"
        type="text"
      ></v-text-field>
      <v-select
        v-model="selected_industry"
        prepend-icon="fa fa-industry"
        :items="industries"
        item-text="name"
        item-value="id"
        label="Industry Type"
      ></v-select>
      <v-select
          v-model="selected_type"
          prepend-icon="fa fa-cog"
          :items="types"
          label="Group Type"
      ></v-select>
      <v-text-field
          v-model="fan_count"
          prepend-icon="fa fa-users"
          label="Fan Count"
          type="number"
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
    group_url: '',
    industries: [],
    selected_industry: '',
    types: ['public', 'private'],
    selected_type: '',
    fan_count: '',
    isSuccess: false,
  }),
  methods: {
    async getGroupDetail(group_id) {
      const { data: { name, url, type, industry_id, fan_count } } = await http.get(`groups/${group_id}`);
      this.group_name = name;
      this.group_url = url;
      this.selected_type = type;
      this.fan_count = fan_count;
      this.selected_industry = industry_id;
    },
    async getIndustries() {
      let { data } = await http.get('industries')
      return data;
    },
    async updateGroup(group_id) {
      let { status } = await http.patch(`groups/${group_id}`, {
        name: this.group_name,
        url: this.group_url,
        picture_url: 'https://dummyimage.com/600x400/000/fff&text=Image',
        type: this.selected_type,
        fan_count: this.fan_count,
        industry_id: this.selected_industry,
      });
      if (status === 200) {
        this.isSuccess = true;
      }
    }
  },
  async mounted() {
    await this.getGroupDetail(this.$route.params.id);
    this.industries = await this.getIndustries();
  }
}
</script>
