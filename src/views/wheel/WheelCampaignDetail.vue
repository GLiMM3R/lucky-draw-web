<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <Suspense>
                    <WheelPrizeTable />
                    <template #fallback>
                        Loading...
                    </template>
                </Suspense>
            </VCol>
        </VRow>
        <VRow justify="center">
            <Suspense>
                <WheelDialog />
            </Suspense>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import WheelDialog from '@/components/wheel/WheelDialog.vue';
import WheelPrizeTable from '@/components/wheel/WheelPrizeTable.vue';
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