<template>
    <VContainer>
        <VRow>
            <VCol>
                <Suspense>
                    <RandomDataset />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <Suspense>
                    <CampaignReportTable />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import CampaignReportTable from '@/components/campaign/CampaignReportTable.vue';
import RandomDataset from '@/components/random/RandomDataset.vue';
</script>