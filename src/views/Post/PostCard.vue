<template>
  <div class="tw-rounded tw-shadow-md tw-px-4 tw-py-4 tw-bg-white">
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex">
        <div class="tw-flex-shrink-0 tw-h-10 tw-w-10 tw-mt-1">
          <img class="tw-w-10 tw-h-10 tw-rounded-full" :src='`https://picsum.photos/140/140?random=${index}`' alt=""/>
        </div>
        <div class="tw-flex tw-flex-col tw-mx-2">
          <div class="tw-text-sm tw-font-medium">
            {{ post.profile_name }}
          </div>
          <date-time-menu :posted-date="post.posted_date" :created-date="post.created_at"></date-time-menu>
        </div>
        <v-icon class="tw-mx-2">fa fa-caret-right</v-icon>
        <div class="tw-my-2 tw-mx-1 tw-text-sm tw-font-normal">
          {{ post.groups.name }}
        </div>
      </div>
      <card-action :id="post.id" @deleted="deletePost"></card-action>
    </div>
    <div class="tw-flex tw-py-4">
      <read-more more-str="read more" :text="post.text" link="#" less-str="read less" :max-chars="150"></read-more>
    </div>
    <comment-lists :comments="post.comments"/>
  </div>
</template>
<script>
import CardAction from '@/components/Action.vue'
import CommentLists from "@/components/CommentLists"
import ReadMore from '@/components/ReadMore.vue'
import DateTimeMenu from '@/components/DateTimeMenu.vue'

export default {
  name: 'post-card',
  components: {CardAction, CommentLists, ReadMore, DateTimeMenu},
  props: {
    deletePost: {},
    index: {},
    post: {}
  }
}
</script>
