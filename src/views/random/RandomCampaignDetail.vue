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
                    <RandomPrizeTable />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </VCol>
        </VRow>
        <VRow justify="center">
            <Suspense>
                <RandomDrawDialog />
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import RandomDataset from '@/components/random/RandomDataset.vue';
import RandomDrawDialog from '@/components/random/RandomDrawDialog.vue';
import RandomPrizeTable from '@/components/random/RandomPrizeTable.vue';
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