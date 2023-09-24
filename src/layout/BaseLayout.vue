<script setup lang="ts">
import BaseSidebar from './BaseSidebar.vue'
import BaseAppbar from './BaseAppbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <VLayout>
    <BaseSidebar />
    <BaseAppbar />
    <VMain class="w-full h-[100vh]">
      <VContainer :fluid="true">
        <RouterView></RouterView>
      </VContainer>
    </VMain>
  </VLayout>
</template>
