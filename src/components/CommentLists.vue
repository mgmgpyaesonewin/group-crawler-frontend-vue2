<template>
  <div>
    <div class="tw-flex tw-my-2" v-for="(comment, index) in items" :key="index">
      <div class="tw-flex">
        <div class="tw-flex-shrink-0 tw-h-10 tw-w-10">
          <img class="tw-w-10 tw-h-10 tw-rounded-full" src="https://dummyimage.com/600x400/000/fff" alt=""/>
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
    <div class="tw-flex tw-items-center tw-justify-center tw-mt-4">
      <button v-show="comments.length >= 3 && limit != null" @click="limit = null" class="tw-underline tw-text-blue-600 tw-text-xs focus:tw-outline-none">See More</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'comment-lists',
  props: {
    comments: {}
  },
  data() {
    return {
      limit: 3,
    }
  },
  computed: {
    items() {
        return this.limit ? this.comments.slice(0, this.limit): this.comments;
    }
  }
}
</script>
