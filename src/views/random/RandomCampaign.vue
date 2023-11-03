<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(drawCampaigns.length)" :text="$t('button.newCampaign')"
                    :logo="LogoStatic" />
            </VCol>
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <StatisticCard :value="replaceNumber(drawCampaignsIsComplete.length)" :text="$t('tab.done')"
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
                        <RandomCampaignTable :campaigns="drawCampaigns" />
                    </VWindowItem>
                    <VWindowItem value="done" style="padding: 16px 4px;">
                        <RandomCampaignTable :campaigns="drawCampaignsIsComplete" />
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
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { replaceNumber } from '@/utils/replaceNumber'
import { onMounted } from 'vue';
import RandomCampaignTable from '@/components/random/RandomCampaignTable.vue';
import { useDrawStore } from '@/stores/draw';

const drawStore = useDrawStore()
const { draws } = storeToRefs(drawStore)

const tab = ref(null)

onMounted(async () => await drawStore.fetchDraws())

const drawCampaigns = computed(() => draws.value.filter((item) => item.isComplete === false))
const drawCampaignsIsComplete = computed(() => draws.value.filter((item) => item.isComplete === true))
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
</style>@/stores/draw