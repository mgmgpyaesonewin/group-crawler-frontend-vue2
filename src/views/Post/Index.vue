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
          <div class="tw-rounded tw-shadow-md tw-px-4 tw-py-4 tw-bg-white">
            <div class="tw-flex tw-justify-between">
              <div class="tw-flex">
                <div class="tw-flex-shrink-0 tw-h-10 tw-w-10 tw-mt-1">
                  <img class="tw-w-10 tw-h-10 tw-rounded-full" :src='`https://picsum.photos/140/140?random=${index}`' alt="" />
                </div>
                <div class="tw-flex tw-flex-col tw-mx-2">
                  <div class="tw-text-sm tw-font-medium">
                    {{ post.profile_name }}
                  </div>
                  <datetime-menu :posted-date="post.date" :created-date="post.created_at"></datetime-menu>
                </div>
                <v-icon class="tw-mx-2">fa fa-caret-right</v-icon>
                <div class="tw-my-2 tw-mx-1 tw-text-sm tw-font-normal" v-for="group in post.groups" :key="group._id">
                  {{ group.name }}
                </div>
              </div>
              <card-action :id="post._id" @deleted="deletePost"></card-action>
            </div>
            <div class="tw-flex tw-py-4">
              <read-more more-str="read more" :text="post.text" link="#" less-str="read less" :max-chars="150"></read-more>
            </div>
            <comment-lists :comments="post.comments"/>
          </div>
        </v-col>
        <v-responsive
          v-if="(index + 1) %2 === 0"
          :key="`width-${index}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
    <div class="tw-flex tw-items-center tw-justify-center tw-my-8">
      <button class="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded focus:tw-outline-none" @click="loadMorePosts">
        <v-icon color="white" class="tw-animate-bounce tw-mr-2 tw-mb-1">fa fa-sort-down</v-icon>
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import ReadMore from '@/components/ReadMore.vue';
import CardAction from '@/components/Action.vue';
import DateTimeMenu from '@/components/DateTimeMenu.vue';
import {http} from '@/api.js';
import CommentLists from "@/components/CommentLists";


export default {
  name: 'Posts',
  components: {
    CommentLists,
    ReadMore,
    CardAction,
    "datetime-menu": DateTimeMenu
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
    }
  },
  methods: {
    async getPosts(skip = 0) {
      let { data } = await http.get(`/posts?skip=${skip}`);
      return data;
    },
    async loadMorePosts() {
      this.skip += 4;
      let posts = await this.getPosts(this.skip);
      this.posts.push(...posts);
    },
    formatDate(date) {
      return this.$date(date).fromNow();
    },
    deletePost(id) {
      http.delete(`posts/${id}`)
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            this.isSuccess = true;
            this.posts = this.getPosts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  async mounted() {
    this.posts = await this.getPosts();
  }
}
</script>

