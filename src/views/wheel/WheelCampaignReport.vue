<template>
    <VContainer>
        <VRow>
            <VCol>
                <CampaignReportTable :source="winners" />
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCampaignStore } from '@/stores/campaign';
import CampaignReportTable from '@/components/campaign/CampaignReportTable.vue';
import RandomDataset from '@/components/random/RandomDataset.vue';
import { useWinnerStore } from '@/stores/winner';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const winnerStore = useWinnerStore();
const { campaign } = storeToRefs(campaignStore);
const { winners } = storeToRefs(winnerStore);

onMounted(async () => {
    await campaignStore.getCampaign(slug)
    await winnerStore.getReport(slug)
})
</script>