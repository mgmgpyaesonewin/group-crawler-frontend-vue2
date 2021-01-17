<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="groups"
      item-key="name"
      class="elevation-1 tw-px-4 tw-py-8"
      :search="search"
    >
      <template v-slot:[`item.industry`]="{ item }">
        {{ item.industry[0].name }}
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ format(item.created_at) }}
      </template>
      <template v-slot:[`item.updated_at`]="{ item }">
        {{ format(item.created_at) }}
      </template>
      <template v-slot:[`item._id`]="{ item }">
        <v-btn :to='`/groups/edit/${item._id}`' color="primary" class="tw-m-2">
          <v-icon dense left>
            fa fa-edit
          </v-icon>
          Edit
        </v-btn>
        <v-btn color="error" @click="deleteGroups(item._id)" class="tw-mb-2">
          <v-icon dense left>fa fa-trash</v-icon>
          Delete
        </v-btn>
      </template>
      <template v-slot:top>
        <div class="tw-flex tw-flex-row-reverse">
          <v-btn to='/groups/new' color="primary" class="tw-mx-2">
            <v-icon dense left>
              fa fa-plus
            </v-icon>
            New Group
          </v-btn>
        </div>
        <v-text-field
          v-model="search"
          prepend-icon="fa fa-search"
          label="Search Anythings"
          class="mx-4 my-4"
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
  name: "groupsTable",
  components: {
    Toast,
  },
  data() {
    return {
      search: "",
      groups: [],
      isSuccess: false,
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Group Name",
          align: "start",
          value: "name",
        },
        { text: "URL", value: "url" },
        { text: "Industry", value: "industry" },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },
        { text: "Action", align:"center", value: "_id" },
      ];
    },
  },
  methods: {
    getGroups() {
      http.get('groups')
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteGroups(group_id) {
      http.delete(`groups/${group_id}`)
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            this.isSuccess = true;
            this.getGroups();
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
    this.getGroups();
  }
};
</script>

<style>
</style>