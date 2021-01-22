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
                <div class="tw-flex-shrink-0 tw-h-10 tw-w-10">
                  <img class="tw-w-10 tw-h-10 tw-rounded-full" src="https://dummyimage.com/600x400/000/fff" alt="" />
                </div>
                <div class="tw-my-2 tw-mx-1">{{ post.profile_name }}</div>
                <v-icon class="tw-mx-2">fa fa-caret-right</v-icon>
                <div class="tw-my-2 tw-mx-1">{{ post.group }}</div>
              </div>
              <div class="tw-flex">
                <div class="text-center">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        depressed
                        v-bind="attrs"
                        v-on="on"
                        color="white"
                      >
                        <v-icon>fa fa-ellipsis-v</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item :to='`/posts/edit/${post._id}`'>
                        <v-list-item-title>Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="deletePost(post._id)">
                        <v-list-item-title>Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </div>
            <div class="tw-flex">
              <p class="tw-my-2 tw-mx-1">Posted on {{ formatDate(post.date) }}</p>
            </div>
            <div class="tw-flex tw-py-3">
              <read-more more-str="read more" :text="post.text" link="#" less-str="read less" :max-chars="50"></read-more>
            </div>
            <div class="tw-flex tw-my-2" v-for="(comment, index) in post.comments" :key="index">
              <div class="tw-flex">
                <div class="tw-flex-shrink-0 tw-h-10 tw-w-10">
                  <img class="tw-w-10 tw-h-10 tw-rounded-full" src="https://dummyimage.com/600x400/000/fff" alt="" />
                </div>
                <div class="tw-bg-gray-200 tw-rounded-lg tw-mx-2 tw-px-2 tw-pb-2">
                  <div class="tw-font-medium">
                    <a href="#" class="hover:tw-underline tw-text-sm">
                      <small>{{ comment.name }}</small>
                    </a>
                  </div>
                  <div class="tw-text-xs">
                    {{ comment.text }}
                  </div>            
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-responsive
          v-if="(index + 1) %2 === 0"
          :key="`width-${index}`"
          width="100%"
        ></v-responsive>
      </template>
    </v-row>
  </div>
</template>

<script>
import ReadMore from '@/components/ReadMore.vue';
import { http } from '@/api.js';

export default {
  name: 'Posts',
  components: {
    ReadMore
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
      msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    }
  },
  methods: {
    async getPosts() {
      let { data } = await http.get('/posts');
      this.posts = data;
    },
    formatDate(date) {
      return new Date(date).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" });
    },
    deletePost(id) {
      http.delete(`posts/${id}`)
        .then((response) => {
          const { status } = response;
          if (status === 200) {
            this.isSuccess = true;
            this.getPosts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getPosts();
  }
}
</script>

<style>

</style>