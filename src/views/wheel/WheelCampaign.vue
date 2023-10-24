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
                    <VTab value="all">{{ $t('tab.current') }}</VTab>
                    <VTab value="done">{{ $t('tab.done') }}</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="all" style="padding: 16px 4px;">
                        <CampaignTable :campaigns="wheelCampaign" type="wheel" />
                    </VWindowItem>
                    <VWindowItem value="done" style="padding: 16px 4px;">
                        <CampaignTable :campaigns="wheelCampaignIsDone" type="wheel" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import LogoStatic from '@/assets/images/campaign_static.png'
import LogoDone from '@/assets/images/done.png'
import StatisticCard from '@/components/StatisticCard.vue';
import CampaignTable from '@/components/campaign/CampaignTable.vue';
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";
import { replaceNumber } from '@/utils/replaceNumber'

const i18n = useI18n();
const campaignStore = useCampaignStore()
const { campaigns } = storeToRefs(campaignStore)

const tab = ref(null)

const wheelCampaign = computed(() => campaigns.value.filter((item) => item.type === 'wheel' && item.isDone === false))
const wheelCampaignIsDone = computed(() => campaigns.value.filter((item) => item.type === 'wheel' && item.isDone === true))

const statics = [
    {
        value: replaceNumber(wheelCampaign.value.length),
        text: i18n.t('button.newCampaign'),
        logo: LogoStatic
    },
    {
        value: replaceNumber(wheelCampaignIsDone.value.length),
        text: i18n.t('tab.done'),
        logo: LogoDone
    },
]

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