<template>
    <VContainer>
        <VRow>
            <VCol>
                <div class="title">Random Draw</div>
                <Breadcrumbs :items="items" />
            </VCol>
        </VRow>
    </VContainer>
    <RouterView>
    </RouterView>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useCampaignStore } from '@/stores/campaign';
import { onMounted } from 'vue';

const campaignStore = useCampaignStore()

onMounted(async () => {
    await campaignStore.getCampaigns();
})

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