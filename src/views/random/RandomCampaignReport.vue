<template>
    <VContainer>
        <VRow>
            <VCol>
                <RandomDataset />
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <RandomReportTable />
            </VCol>
        </VRow>
        <VRow justify="center">
            <VBtn class="text-none" rounded="lg" @click="handleDownloadWheelReport">
                Export to Excel</VBtn>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import RandomReportTable from '@/components/random/RandomReportTable.vue';
import RandomDataset from '@/components/random/RandomDataset.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { useDrawReportStore } from '@/stores/drawReport';

const route = useRoute();
const slug = route.params.slug as string;

const drawReportStore = useDrawReportStore();

const handleDownloadWheelReport = async () => {
    await drawReportStore.downloadDrawReportBySlug(slug, `${slug}-report`)
}

onMounted(() => document.title = `Random Report ${capitalizeLetter(slug)}`)
</script>