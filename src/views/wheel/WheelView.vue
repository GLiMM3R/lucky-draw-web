<template>
  <VContainer>
    <Breadcrumbs :items="meta" :page-title="pageTitle" />
  </VContainer>
  <Suspense>
    <RouterView />
    <template #fallback>
      <div class="text-center">
        <LoadingIcon width="200px" height="200px" />
      </div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import LoadingIcon from '@/components/icons/LoadingIcon.vue'

const route = useRoute();
const meta = computed(() => {
  return route.meta.breadcrumb;
});
const pageTitle = computed(() => {
  return route.meta.pageTitle;
});
</script>

<style scoped lang="scss">
.title {
  font-size: 24px;
  font-weight: 600;
  padding-left: 2px;
}
</style>