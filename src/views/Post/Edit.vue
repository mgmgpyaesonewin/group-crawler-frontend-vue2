<template>
  <div class="tw-rounded tw-shadow-md tw-mx-4 tw-my-6 tw-px-8 tw-py-8 tw-bg-white">
    <h3>Update Post</h3>
    <form>
      <v-text-field
        v-model="profile_name"
        prepend-icon="fa fa-user"
        label="Profile Name"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="profile_link"
        prepend-icon="fa fa-link"
        label="Profile Link"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="post_link"
        prepend-icon="fa fa-link"
        label="Post Link"
        type="text"
      ></v-text-field>
      <div class="tw-flex">
        <v-icon class="tw-mr-3">fa fa-calendar-alt</v-icon>
        <v-datetime-picker label="Select Post Date and Time" v-model="post_date">
          <template v-slot:dateIcon>
            <v-icon>fa fa-calendar-alt</v-icon>
          </template>
          <template v-slot:timeIcon>
            <v-icon>fa fa-clock</v-icon>
          </template>
        </v-datetime-picker>
      </div>
      <v-select
        v-model="selected_group"
        :items="groups"
        label="Groups"
        prepend-icon="fa fa-users"
        item-text="name"
        item-value="_id"
      ></v-select>
      <v-select
        v-model="selected_post_types"
        :items="post_types"
        label="Post Types"
        prepend-icon="fa fa-sitemap"
      ></v-select>
      <v-text-field
        v-model="post_text"
        prepend-icon="fa fa-pen"
        label="Post Text"
        type="text"
      ></v-text-field>
      <div v-for="(attachment, index) in attachments" :key="index" v-show="selected_post_types !== 'text'">
        <div class="tw-flex">
          <v-text-field
            v-model="attachments[index]"
            prepend-icon="fa fa-paperclip"
            label="Attachments"
            type="text"
          ></v-text-field>
          <v-btn
            depressed
            color="primary"
            class="tw-m-4"
            v-show="lastItem(index)"
            @click="addAttachement"
          >
            Add
          </v-btn>
          <v-btn
            depressed
            class="tw-m-4"
            @click="removeAttachment(index)"
            v-show="!lastItem(index)"
          >
            Remove
          </v-btn>
        </div>
      </div>
      <v-file-input
        v-model="comments"
        prepend-icon="fa fa-comments"
        label="Comments"
        truncate-length="15"
        accept="application/JSON"
        @change="onFileChange"
      ></v-file-input>
      <div class="tw-flex flex-row-reverse">
        <v-btn class="tw-mx-2">Cancel</v-btn>
        <v-btn color="primary" @click="updatePost($route.params.id)">Save</v-btn>
      </div>
    </form>
    <v-snackbar
      v-model="isSuccess"
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
          @click="isSuccess = false"
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
  name: 'EditPost',
  data() {
    return {
      profile_name: '',
      profile_link: '',
      post_link: '',
      post_date: '',
      selected_group: '',
      groups: [],
      post_types: ['text', 'photo', 'video'],
      selected_post_types: 'text',
      post_text: '',
      attachments: [''],
      comments: null,
      comments_file_contents: '',
      isSuccess: false,
    }
  },
  methods: {
    lastItem(index) {
      return this.attachments.length === index+1;
    },
    addAttachement() {
      this.attachments.push('');
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    async getPostDetail(post_id) {
      const { data } = await http.get(`posts/${post_id}`);
      this.profile_name = data.profile_name;
      this.profile_link = data.profile_link;
      this.post_link = data.link;
      this.post_date = new Date(data.date);
      this.selected_group = data.group_id;
      this.selected_post_types = data.type;
      this.attachments = data.attachments;
      this.post_text = data.text;
    },
    async updatePost(post_id) {
      let { status }  = await http.patch(`posts/${post_id}`, {
        profile_name: this.profile_name,
        profile_link: this.profile_link,
        link: this.post_link,
        date: this.post_date.toJSON(),
        group_id: this.selected_group,
        type: this.selected_post_types,
        text: this.post_text,
        attachments: this.attachments,
        comments: this.comments_file_contents,
      })
      if (status === 200) {
        this.isSuccess = true;
      }
    },
    onFileChange(file) {
      let reader = new FileReader();
      reader.onload = file => {
        let json = JSON.parse(file.target.result);
        let nodes = json.map(data => {
          let { propertyName1 } = data;
          let data_arr = propertyName1.split("\n");
          return {
            name: data_arr[0],
            text: data_arr[1]
          };
        });
        this.comments_file_contents = nodes;
      };
      reader.readAsText(file);
    },
    getGroups() {
      http.get('groups')
        .then((response) => {
          this.groups = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    this.getGroups();
    await this.getPostDetail(this.$route.params.id);
  }
}
</script>

<style>

</style>