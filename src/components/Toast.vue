<template>
  <v-snackbar v-model="status" timeout="2000" right top>
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="$emit('update:status', false)">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Toast',
  props: ['status', 'message']
};
</script>

<style>
</style>