<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(wheelCampaign.length)" :text="$t('statistic.current')"
                    :logo="LogoStatic" />
            </VCol>
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(wheelCampaignIsDone.length)" :text="$t('statistic.finish')"
                    :logo="LogoDone" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab value="all">{{ $t('tab.current') }}</VTab>
                    <VTab value="done">{{ $t('tab.finish') }}</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="all" style="padding: 16px 4px;">
                        <WheelCampaignTable :campaigns="wheelCampaign" type="wheel" />
                    </VWindowItem>
                    <VWindowItem value="done" style="padding: 16px 4px;">
                        <WheelCampaignTable :campaigns="wheelCampaignIsDone" type="wheel" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import LogoStatic from '@/assets/images/campaign_static.png'
import LogoDone from '@/assets/images/done.png'
import StatisticCard from '@/components/StatisticCard.vue';
import { storeToRefs } from 'pinia';
import { replaceNumber } from '@/utils/replaceNumber'
import { useWheelStore } from '@/stores/wheel';
import WheelCampaignTable from '@/components/wheel/WheelCampaignTable.vue';

const wheelStore = useWheelStore()
const { wheels } = storeToRefs(wheelStore)

const tab = ref(null)

const wheelCampaign = computed(() => wheels.value.filter((item) => item.isComplete === false))
const wheelCampaignIsDone = computed(() => wheels.value.filter((item) => item.isComplete === true))

await wheelStore.fetchWheels()


onMounted(() => document.title = `Wheel`)
</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}

.static-detail {
    margin: auto 0;
}
</style>