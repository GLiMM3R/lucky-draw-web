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
import { useWinnerStore } from '@/stores/winner';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const winnerStore = useWinnerStore();
const { winners } = storeToRefs(winnerStore);

onMounted(async () => {
    await campaignStore.getCampaignBySlug(slug)
    await winnerStore.getReport(slug)
})
</script>