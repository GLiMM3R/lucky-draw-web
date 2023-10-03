<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <RandomDataset :campaign="campaign" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <RandomPrizeTable :campaign="campaign" />
            </VCol>
        </VRow>
        <VRow justify="center">
            <RandomDrawDialog :campaign="campaign" />
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useCampaign from '@/composables/useCampaign';
import RandomDataset from '@/components/random/RandomDataset.vue';
import RandomDrawDialog from '@/components/random/RandomDrawDialog.vue';
import RandomPrizeTable from '@/components/random/RandomPrizeTable.vue';

const { campaign, getCampaign } = useCampaign();
const route = useRoute();
const slug = route.params.slug as string
console.log("🚀 ~ file: RandomCampaignDetail.vue:29 ~ slug:", slug)

await getCampaign(slug)

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