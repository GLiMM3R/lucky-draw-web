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
    </VContainer>
</template>

<script setup lang="ts">
import RandomReportTable from '@/components/random/RandomReportTable.vue';
import RandomDataset from '@/components/random/RandomDataset.vue';
import { onMounted } from 'vue';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;

onMounted(() => document.title = `Random Report ${capitalizeLetter(slug)}`)
</script>