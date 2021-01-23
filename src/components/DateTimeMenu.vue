<template>
  <div>
    <v-menu v-model="showTimeMenu" absolute offset-y content-class="tw-bg-white tw-z-50">
      <template v-slot:activator="{ on, attrs }">
        <div class="tw-text-xs tw-font-light" v-bind="attrs" v-on="on">
          {{ humanizeDate(postedDate) }}
        </div>
      </template>
      <div class="tw-px-4 tw-pt-2">
        <p>
          <span class="tw-italic tw-font-thin tw-text-xs">Posted:</span>
          &nbsp;
          <span class="tw-font-light tw-text-sm">{{ formatDate(postedDate) }}</span>
        </p>
        <p>
          <span class="tw-italic tw-font-thin tw-text-xs">Created:</span>
          &nbsp;
          <span class="tw-font-light tw-text-sm">{{ formatDate(createdDate) }}</span>
        </p>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'DateTimeMenu',
  props: ['postedDate', 'createdDate'],
  data() {
    return {
      showTimeMenu: false,
    };
  },
  methods: {
    humanizeDate(date) {
      return this.$date(date).fromNow();
    },
    formatDate(date) {
      return new Date(date).toLocaleTimeString(undefined, { year: "numeric", month: "long", day: "numeric" });
    }
  }
}
</script>

<style>

</style>