<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3" v-for="item, index in statics" :key="index">
                <StatisticCard :item="item" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab value="random">Random Draw</VTab>
                    <VTab value="wheel">Wheel Draw</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="random" style="padding: 16px 4px;">
                        <ReportTable :campaigns="random" />
                    </VWindowItem>
                    <VWindowItem value="wheel" style="padding: 16px 4px;">
                        <ReportTable :campaigns="wheel" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCampaignStore } from '@/stores/campaign';
import { replaceNumber } from '@/utils/replaceNumber'
import StatisticCard from '@/components/StatisticCard.vue';
import Wheel from '@/assets/images/wheel.png'
import Lottery from '@/assets/images/lottery.png'
import ReportTable from '@/components/report/ReportTable.vue';


const campaignStore = useCampaignStore();
const { campaigns } = storeToRefs(campaignStore);

const random = computed(() => campaigns.value.filter((item) => item.type === 'random' && item.isDone === true))
const wheel = computed(() => campaigns.value.filter((item) => item.type === 'wheel' && item.isDone === true))

const tab = ref('')

onMounted(async () => await campaignStore.getCampaigns())
const statics = [
    {
        value: replaceNumber(random.value.length),
        text: 'New Campagins',
        logo: Wheel
    },
    {
        value: replaceNumber(wheel.value.length),
        text: 'Done',
        logo: Lottery
    },
]
</script>
  
<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}
</style>