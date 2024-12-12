<template>
    <VContainer>
        <VRow>
            <VCol>
                <Breadcrumbs :items="meta" :page-title="pageTitle" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <ReportStatistic :value="replaceNumber(wheel.length)" :text="$t('statistic.wheel')" :logo="Wheel" />
            </VCol>
            <VCol cols="12" sm="6" md="6" lg="4" xl="3">
                <ReportStatistic :value="replaceNumber(random.length)" :text="$t('statistic.random')" :logo="Lottery" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab value="random">{{ $t('tab.random') }}</VTab>
                    <VTab value="wheel">{{ $t('tab.wheel') }}</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem value="random" style="padding: 16px 4px;">
                        <ReportTable :campaigns="random" @handleDownload="handleDownloadDrawReport" />
                    </VWindowItem>
                    <VWindowItem value="wheel" style="padding: 16px 4px;">
                        <ReportTable :campaigns="wheel" @handleDownload="handleDownloadWheelReport" />
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { replaceNumber } from '@/utils/replaceNumber'
import Wheel from '@/assets/images/wheel.png'
import Lottery from '@/assets/images/lottery.png'
import ReportTable from '@/components/report/ReportTable.vue';
import ReportStatistic from '@/components/report/ReportStatistic.vue';
import { useWheelStore } from '@/stores/wheel';
import { useDrawStore } from '@/stores/draw';
import { useWheelReportStore } from '@/stores/wheelReport';
import { useDrawReportStore } from '@/stores/drawReport';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const meta = computed(() => {
    return route.meta.breadcrumb;
});
const pageTitle = computed(() => {
    return route.meta.pageTitle;
});

const drawStore = useDrawStore();
const wheelStore = useWheelStore();
const drawReportStore = useDrawReportStore();
const wheelReportStore = useWheelReportStore();
const { draws } = storeToRefs(drawStore);
const { wheels } = storeToRefs(wheelStore);

const random = computed(() => draws.value.filter((item) => item.isComplete === true))
const wheel = computed(() => wheels.value.filter((item) => item.isComplete === true))

const handleDownloadDrawReport = async (values: any) => {
    await drawReportStore.downloadDrawReportById(values.id, values.title)
}

const handleDownloadWheelReport = async (values: any) => {
    await wheelReportStore.downloadWheelReportById(values.id, values.title)
}
const tab = ref('')

onMounted(async () => {
    await drawStore.fetchDraws();
    await wheelStore.fetchWheels();
    document.title = `Report`
})
</script>
  
<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}
</style>@/stores/draw