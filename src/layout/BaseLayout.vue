<script setup lang="ts">
import BaseSidebar from './BaseSidebar.vue'
import BaseAppbar from './BaseAppbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <VLayout>
    <BaseSidebar />
    <BaseAppbar />
    <VMain style="background: rgba(234, 248, 220, 0.1);">
      <!-- <VContainer :fluid="true" > -->
      <RouterView></RouterView>
      <!-- </VContainer> -->
    </VMain>
  </VLayout>
</template>
