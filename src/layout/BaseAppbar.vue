<script setup lang="ts">
import { useRoute } from 'vue-router'
import BaseMenu from './BaseMenu.vue'

const route = useRoute()
</script>

<template>
  <VAppBar elevation="1" color="primary" height="88">
    <template v-slot:append>
      <BaseMenu />
    </template>
  </VAppBar>
</template>
