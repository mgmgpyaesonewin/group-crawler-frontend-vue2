<template>
  <div class="tw-flex">
    <div class="text-center">
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to='`/posts/edit/${id}`'>
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteAction">
            <v-list-item-title>Delete</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Action',
  props: ['id'],
  methods: {
    deleteAction() {
      this.$emit('deleted', this.id);
    }
  }
}
</script>

<style>

</style>