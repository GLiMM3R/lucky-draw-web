<template>
    <VContainer>
        <VRow justify="space-between" class="mb-4 mx-2">
            <VSpacer />
            <VBtn class="text-none" rounded="lg" @click="handleDownloadWheelReport">Export to Excel</VBtn>
        </VRow>
        <WheelReportTable />
    </VContainer>
</template>

<script setup lang="ts">
import WheelReportTable from '@/components/wheel/WheelReportTable.vue';
import { useWheelReportStore } from '@/stores/wheelReport';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;

const wheelReportStore = useWheelReportStore();

const handleDownloadWheelReport = async () => {
    await wheelReportStore.downloadWheelReportBySlug(slug, `${slug}-report`)
}

onMounted(() => document.title = `Wheel Report ${capitalizeLetter(slug)}`)

</script>