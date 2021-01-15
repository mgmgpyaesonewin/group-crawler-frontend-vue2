<template>
  <div>
      <v-list>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
        >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Posts', icon: 'mdi-clock', link: '/posts' },
        { text: 'Groups', icon: 'mdi-flag', link: '/groups' },
        { text: 'Industries', icon: 'fa fa-hammer', link: '/industries' },
        { text: 'Users', icon: 'mdi-account', link: '/users' },
      ],
    }),
}
</script>

<style>

</style>