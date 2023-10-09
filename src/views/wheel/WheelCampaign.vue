<template>
    <VContainer>
        <VRow class="static">
            <VCol cols="12" md="6" lg="4" xl="3" v-for="item, index in statics" :key="index">
                <StaticCard :item="item" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab :value="1">New</VTab>
                    <VTab :value="2">Done</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem v-for="n in 2" :key="n" :value="n" style="padding: 16px 4px;">
                        <CampaignTable type="wheel" />
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
import StaticCard from '@/components/StaticCard.vue';
import CampaignTable from '@/components/campaign/CampaignTable.vue';

const tab = ref(null)
const type = 'wheel'

const statics = [
    {
        value: '8.2',
        text: 'New Campagins',
        logo: LogoStatic
    },
    {
        value: '124',
        text: 'Done',
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