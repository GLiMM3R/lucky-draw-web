<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <RandomDataset v-if="campaign" :campaign="campaign" />
            </VCol>
        </VRow>
        <VRow class="static">
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
import { watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCampaignStore } from '@/stores/campaign';
import useCampaign from '@/composables/useCampaign';

import RandomDataset from '@/components/random/RandomDataset.vue';
import RandomDrawDialog from '@/components/random/RandomDrawDialog.vue';
import PrizeTable from '@/components/campaign/PrizeTable.vue';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const { campaign } = storeToRefs(campaignStore);
const { getCampaign } = useCampaign();

onMounted(async () => {
    await getCampaign(slug)
})


watch(() => slug, async (newSlug) => await getCampaign(newSlug))

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