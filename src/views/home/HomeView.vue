<template>
    <VContainer>
        <VRow>
            <VCol cols="9">
                <VRow>
                    <VCol cols="12" md="6" lg="4">
                        <Shortcut title="Random Draw" :logo="Lottery" url="/random" />
                    </VCol>
                    <VCol cols="12" md="6" lg="4">
                        <Shortcut title="Wheel Draw" :logo="Wheel" url="/wheel" />
                    </VCol>
                </VRow>
                <VRow>
                    <HomeCampaignTable title="Random Draw" url="/random" :campaigns="drawCampaigns"
                        :isLoading="randomLoading" />
                </VRow>
                <VRow>
                    <HomeCampaignTable title="Wheel Draw" url="/wheel" :campaigns="wheelCapaigns"
                        :isLoading="wheelLoading" />
                </VRow>
            </VCol>
            <VCol cols="3">
                <VContainer>
                    <VRow justify="center">
                        <DoughnutChart />
                    </VRow>
                    <VRow justify="center" class="mt-8">
                        <DoughnutChart />
                    </VRow>
                </VContainer>
            </VCol>
        </VRow>
    </VContainer>
</template>


<script setup lang="ts">
import Shortcut from '@/components/home/Shortcut.vue'
import Wheel from '@/assets/images/wheel.png'
import Lottery from '@/assets/images/lottery.png'
import HomeCampaignTable from '@/components/home/HomeCampaignTable.vue';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import DoughnutChart from '@/components/home/DoughnutChart.vue';
import { computed } from 'vue';
import { useWheelStore } from '@/stores/wheel';
import { useDrawStore } from '@/stores/draw';

const drawStore = useDrawStore();
const wheelStore = useWheelStore();
const { draws, isLoading: randomLoading } = storeToRefs(drawStore)
const { wheels, wheel: wheelLoading } = storeToRefs(wheelStore)

const drawCampaigns = computed(() => draws.value.slice(0, 5))
const wheelCapaigns = computed(() => wheels.value.slice(0, 5))

onMounted(async () => {
    await drawStore.fetchDraws();
    await wheelStore.fetchWheels();
})
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>@/stores/draw