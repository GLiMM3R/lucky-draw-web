<template>
    <VContainer>
        <VRow justify="center">
            <VCol>
                <RandomDataset />
            </VCol>
        </VRow>
        <VRow justify="center">
            <VCol>
                <RandomPrizeTable />
            </VCol>
        </VRow>
        <VRow justify="center">
            <RandomDrawDialog />
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import RandomDataset from '@/components/random/RandomDataset.vue';
import RandomDrawDialog from '@/components/random/RandomDrawDialog.vue';
import RandomPrizeTable from '@/components/random/RandomPrizeTable.vue';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;

onMounted(() => {
    document.title = `Random ${capitalizeLetter(slug)}`
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