<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(randomCampaign.length)" :text="$t('button.newCampaign')"
                    :logo="LogoStatic" />
            </VCol>
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(randomCampaignIsDone.length)" :text="$t('tab.done')"
                    :logo="LogoDone" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab value="all">{{ $t('tab.current') }}</VTab>
                    <VTab value="done">{{ $t('tab.done') }}</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="all" style="padding: 16px 4px;">
                        <CampaignTable :campaigns="randomCampaign" type="random" />
                    </VWindowItem>
                    <VWindowItem value="done" style="padding: 16px 4px;">
                        <CampaignTable :campaigns="randomCampaignIsDone" type="random" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LogoStatic from '@/assets/images/campaign_static.png'
import LogoDone from '@/assets/images/done.png'
import StatisticCard from '@/components/StatisticCard.vue';
import CampaignTable from '@/components/campaign/CampaignTable.vue';
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { replaceNumber } from '@/utils/replaceNumber'

const campaignStore = useCampaignStore()
const { campaigns } = storeToRefs(campaignStore)

const tab = ref(null)


const randomCampaign = computed(() => campaigns.value.filter((item) => item.type === 'random' && item.isDone === false))
const randomCampaignIsDone = computed(() => campaigns.value.filter((item) => item.type === 'random' && item.isDone === true))
</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 700;
    padding-left: 2px;
}

.static-detail {
    margin: auto 0;
}
</style>