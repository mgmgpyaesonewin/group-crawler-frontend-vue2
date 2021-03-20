<template>
  <div class="tw-mx-4">
    <div class="tw-flex tw-flex-row-reverse">
      <v-btn to='/posts/new' color="primary" class="tw-mb-6">
        <v-icon dense left>
          fa fa-plus
        </v-icon>
        Create Post
      </v-btn>
    </div>
    <div class="tw-rounded tw-shadow-md tw-px-4 tw-py-4 tw-bg-white">
      <div class="tw-flex">
        <v-text-field label="Search"></v-text-field>
        <v-btn depressed class="tw-m-4" color="primary">
          Search
        </v-btn>
      </div>
      <div class="tw-flex">
        <div class="tw-w-2/6">
          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="startDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="tw-w-2/6 tw-mx-4">
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="endDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="tw-w-2/6">
          <v-select :items="items" label="Date Type">
          </v-select>
        </div>
      </div>
      <div class="tw-flex tw-">
        <div class="tw-w-4/6">
          <v-select :items="items" label="Groups"></v-select>
        </div>
        <div class="tw-w-2/6 tw-pl-4">
          <v-select :items="items" label="Industry"></v-select>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-justify-between tw-mx-4 tw-my-4">
      <div class="tw-flex">
        <v-select :items="items" label="Post Types"></v-select>
      </div>
      <div class="tw-flex">
        <v-select :items="items" label="Sort By" class="tw-mx-4"></v-select>
        <v-switch
          v-model="importantPost"
          label="Fav Only"
        ></v-switch>
      </div>
    </div>
    <v-row>
      <template v-for="(post, index) in posts">
        <v-col :key="index">
          <post-card :delete-post="deletePost" :index="index" :post="post"/>
        </v-col>
        <v-responsive
          v-if="(index + 1) %2 === 0"
          :key="`width-${index}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
    <div class="tw-flex tw-items-center tw-justify-center tw-my-8">
      <button v-show="isMorePosts" class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none" @click="loadMorePosts">
        <v-icon color="white" class="tw-animate-bounce tw-mr-2 tw-mb-1">fa fa-sort-down</v-icon>
        Load More
      </button>
    </div>
    <toast :status.sync="isSuccess" message="Created Successfully" />
  </div>
</template>

<script>
import {http} from '@/api.js';
import Toast from "@/components/Toast.vue";
import PostCard from "@/views/Post/PostCard";


export default {
  name: 'Posts',
  components: {
    PostCard,
    Toast
  },
  data() {
    return {
      startDateMenu: false,
      endDateMenu: false,
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      items: [],
      importantPost: false,
      posts: [],
      msg: '',
      skip: 0,
      end: false,
      isSuccess: false,
    }
  },
  computed: {
    isMorePosts() {
      return !this.end;
    },
  },
  methods: {
    async getPosts(skip = 0) {
      let { data } = await http.get(`/posts?skip=${skip}`);
      return data;
    },
    async loadMorePosts() {
      this.skip += 4;
      let posts = await this.getPosts(this.skip);
      if (posts.length === 0) {
        this.end = true;
      }
      this.posts.push(...posts);
    },
    formatDate(date) {
      return this.$date(date).fromNow();
    },
    async deletePost(id) {
      let { status } = await http.delete(`posts/${id}`);
      if (status === 200) {
        this.isSuccess = true;
        this.posts = await this.getPosts();
      }
    }
  },
  async mounted() {
    this.posts = await this.getPosts();
  }
}
</script>

