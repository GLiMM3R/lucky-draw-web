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
                    <VTab value="wheel">Wheel</VTab>
                    <VTab value="random">Random</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="wheel" style="padding: 16px 4px;">
                        <ReportTable type="wheel" />
                    </VWindowItem>
                    <VWindowItem value="random" style="padding: 16px 4px;">
                        <ReportTable type="random" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>
  
<script setup lang="ts">
import StaticCard from '@/components/StaticCard.vue';
import Wheel from '@/assets/images/wheel.png'
import Lottery from '@/assets/images/lottery.png'
import { ref } from 'vue';
import ReportTable from '@/components/report/ReportTable.vue';

const tab = ref('')

const statics = [
    {
        value: '8.2',
        text: 'New Campagins',
        logo: Wheel
    },
    {
        value: '124',
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