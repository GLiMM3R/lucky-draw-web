<script setup lang="ts">
const items = [{ title: 'Profile' }, { title: 'Settings' }, { title: 'Logout' }]
</script>

<template>
  <div class="d-flex justify-space-around">
    <VMenu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>
      <VList>
        <VListItem v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
