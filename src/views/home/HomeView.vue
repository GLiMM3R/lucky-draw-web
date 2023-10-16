<template>
    <VContainer>
        <VRow>
            <VCol cols="9">
                <VRow>
                    <VCol cols="4">
                        <Shortcut title="Random Draw" :logo="Lottery" url="/random" />
                    </VCol>
                    <VCol cols="4">
                        <Shortcut title="Wheel Draw" :logo="Wheel" url="/wheel" />
                    </VCol>
                </VRow>
                <VRow>
                    <HomeCampaignTable title="Random Draw" url="/random" :campaigns="random" :isLoading="isLoading" />
                </VRow>
                <VRow>
                    <HomeCampaignTable title="Wheel Draw" url="/wheel" :campaigns="wheel" :isLoading="isLoading" />
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
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import DoughnutChart from '@/components/home/DoughnutChart.vue';
import { computed } from 'vue';

const cmapaignStore = useCampaignStore();
const { campaigns, isLoading } = storeToRefs(cmapaignStore)

const random = computed(() => campaigns.value.filter((item) => item.type === 'random').slice(0, 5))
const wheel = computed(() => campaigns.value.filter((item) => item.type === 'wheel').slice(0, 5))

onMounted(async () => {
    await cmapaignStore.getCampaigns();
})
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>