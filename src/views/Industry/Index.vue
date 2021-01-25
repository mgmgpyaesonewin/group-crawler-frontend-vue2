<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="industries"
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
      <template v-slot:[`item.id`]="{ item }">
        <v-btn :to='`/industries/edit/${item.id}`' color="primary" class="tw-mx-2">Edit</v-btn>
        <v-btn color="error" @click="deleteIndustries(item.id)">Delete</v-btn>
      </template>
      <template v-slot:top>
        <div class="tw-flex tw-flex-row-reverse">
          <v-btn to='/industries/new' color="primary" class="tw-mx-2">New Industry</v-btn>
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
  name: "IndustriesTable",
  components: {
    Toast,
  },
  data() {
    return {
      search: "",
      industries: [],
      isSuccess: false,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Industry Name",
          align: "start",
          value: "name",
        },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },
        { text: "Action", align:"center", value: "id" },
      ];
    },
  },
  methods: {
    getIndustries() {
      http.get('industries')
        .then((response) => {
          this.industries = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteIndustries(industry_id) {
      http.delete(`industries/${industry_id}`)
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            this.isSuccess = true;
            this.getIndustries();
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
    this.getIndustries();
  }
};
</script>

<style>
</style>
