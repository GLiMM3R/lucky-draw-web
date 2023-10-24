<template>
    <VContainer>
        <VRow>
            <VCol>
                <RandomDataset v-if="campaign" :campaign="campaign" />
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <PrizeTable v-if="campaign?.prizes" :prizes="campaign.prizes" />
            </VCol>
        </VRow>
        <VRow justify="center">
            <Suspense>
                <RandomDrawDialog />
            </Suspense>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCampaignStore } from '@/stores/campaign';

import RandomDataset from '@/components/random/RandomDataset.vue';
import RandomDrawDialog from '@/components/random/RandomDrawDialog.vue';
import PrizeTable from '@/components/campaign/PrizeTable.vue';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const { campaign } = storeToRefs(campaignStore);

onMounted(async () => {
    await campaignStore.getCampaignBySlug(slug)
})

</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}

.dataset-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
</style>