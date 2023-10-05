<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <RandomDataset v-if="campaign" :campaign="campaign" @handleUpload="handleUpload" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <PrizeTable v-if="campaign" :campaign="campaign" @handleSumitPrize="handleSumitPrize" />
            </VCol>
        </VRow>
        <VRow justify="center">
            <Suspense>
                <WheelDialog v-if="campaign" :prizes="campaign.prizes" />
            </Suspense>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useCampaign from '@/composables/useCampaign';
import RandomDataset from '@/components/random/RandomDataset.vue';
import WheelDialog from '@/components/wheel/WheelDialog.vue';
import PrizeTable from '@/components/PrizeTable.vue';
import { watch } from 'vue';
import { onMounted } from 'vue';
import usePrize from '@/composables/usePrize';

const route = useRoute();
const { campaign, getCampaign, deleteCampaign, uploadFileDataset } = useCampaign();
const { addPrize } = usePrize();
const slug = route.params.slug as string

onMounted(async () => {
    await getCampaign(slug)
})

const handleUpload = async (values: any) => {
    await uploadFileDataset(slug, values)
    await getCampaign(slug)
}

const handleSumitPrize = async (values: any) => {
    await addPrize({ campaignId: slug, title: values.title, rank: values.rank, amount: values.amount, file: values.file })
    await getCampaign(slug)
}

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