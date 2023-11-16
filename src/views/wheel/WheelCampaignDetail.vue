<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <WheelPrizeTable />
            </VCol>
        </VRow>
        <VRow justify="center">
            <WheelDialog :campaign="wheel" />
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import WheelDialog from '@/components/wheel/WheelDialog.vue';
import WheelPrizeTable from '@/components/wheel/WheelPrizeTable.vue';
import { useWheelStore } from '@/stores/wheel';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string;

const wheelStore = useWheelStore();
const { wheel } = storeToRefs(wheelStore)

await wheelStore.fetchWheelBySlug(slug);

onMounted(() => document.title = `Wheel ${capitalizeLetter(slug)}`)

onUnmounted(() => {
    wheelStore.$reset();
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