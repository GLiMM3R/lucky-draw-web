<script setup lang="ts">
import BaseSidebar from './BaseSidebar.vue'
import BaseAppbar from './BaseAppbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <VLayout>
    <BaseSidebar />
    <BaseAppbar />
    <VMain>
      <RouterView></RouterView>
    </VMain>
  </VLayout>
</template>
