<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <ReportStatistic :value="replaceNumber(wheel.length)" :text="$t('report.statisticTitle.wheel')"
                    :logo="Wheel" />
            </VCol>
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <ReportStatistic :value="replaceNumber(random.length)" :text="$t('report.statisticTitle.random')"
                    :logo="Lottery" />
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
import Wheel from '@/assets/images/wheel.png'
import Lottery from '@/assets/images/lottery.png'
import ReportTable from '@/components/report/ReportTable.vue';
import ReportStatistic from '@/components/report/ReportStatistic.vue';


const campaignStore = useCampaignStore();
const { campaigns } = storeToRefs(campaignStore);

const random = computed(() => campaigns.value.filter((item) => item.type === 'random' && item.isDone === true))
const wheel = computed(() => campaigns.value.filter((item) => item.type === 'wheel' && item.isDone === true))

const tab = ref('')

onMounted(async () => await campaignStore.getCampaigns())
</script>
  
<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}
</style>