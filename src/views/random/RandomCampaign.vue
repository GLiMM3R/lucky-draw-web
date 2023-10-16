<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" md="6" lg="4" xl="3" v-for="item, index in statics" :key="index">
                <StatisticCard :item="item" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab value="all">{{ $t('tab.all') }}</VTab>
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
import { useI18n } from "vue-i18n";
import { computed } from 'vue';

const i18n = useI18n();
const campaignStore = useCampaignStore()
const { campaigns } = storeToRefs(campaignStore)

const tab = ref(null)


const randomCampaign = computed(() => campaigns.value.filter((item) => item.type === 'random'))
const randomCampaignIsDone = computed(() => campaigns.value.filter((item) => item.type === 'random' && item.isDone === true))

const statics = [
    {
        value: '8.2',
        text: i18n.t('button.newCampaign'),
        logo: LogoStatic
    },
    {
        value: '124',
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