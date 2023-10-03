<template>
    <VContainer>
        <VRow>
            <VCol>
                <div class="title">Random Draw</div>
                <Breadcrumbs :items="items" />
            </VCol>
        </VRow>
    </VContainer>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <KeepAlive>
                <Suspense>
                    <component :is="Component"></component>
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </KeepAlive>
        </template>
    </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Breadcrumbs from '@/components/Breadcrumbs.vue';


const items = [
    {
        title: 'Home',
        disabled: false,
        href: '/home',
    },
    {
        title: 'Random Draw',
        disabled: false,
        href: '/random',
    },
];
</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}
</style>