<template>
    <VContainer>
        <VRow>
            <VCol>
                <h2 class="title">Random Draw</h2>
                <Breadcrumbs :items="items" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <div class="dataset-header">
                    <h2 class="title">Coupon Data Set</h2>
                    <div>
                        <VBtn class="text-none" variant="outlined" rounded="lg" :loading="isSelecting"
                            @click="handleFileImport">+ Import
                            Coupon</VBtn>
                        <VFileInput ref="uploader" accept=".csv" class="d-none" type="file" @change="onFileChanged" />
                        <VBtn class="text-none ml-4" rounded="lg">+ Export Coupon</VBtn>
                    </div>
                </div>
                <RandomCouponTable @handleSelectDataset="handleSelectDataset" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <div class="dataset-header">
                    <h2 class="title">Prize Tier</h2>
                    <div>
                        <CreatePrizeModal :campaignId="route.params.slug" />
                    </div>
                </div>
                <RandomPrizeTable />
            </VCol>
        </VRow>
        <VRow>
            <RandomPrizeDialog :selectedCoupon="selectedCoupon" />
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import useCoupon from '@/composables/useCoupon';
import useCampaign from '@/composables/useCampaign';
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import CreatePrizeModal from '@/components/CreatePrizeModal.vue';
import RandomPrizeTable from '@/components/random/RandomPrizeTable.vue';
import RandomPrizeDialog from '@/components/random/RandomPrizeDialog.vue';
import RandomCouponTable from '@/components/random/RandomCouponTable.vue';

const { campaignState, getCampaign } = useCampaign();
const { addCoupon } = useCoupon();
const route = useRoute();
const uploader = ref(null);
const isSelecting = ref(false);
const selectedFile = ref(null);
const selectedCoupon = ref(null);

const handleSelectDataset = (value: any) => {
    console.log("🚀 ~ file: RandomDraw.vue:61 ~ handleSelectDataset ~ value:", value)
    selectedCoupon.value = value;
}

function handleFileImport() {
    isSelecting.value = true;

    window.addEventListener('focus', () => {
        isSelecting.value = false
    }, { once: true });

    uploader.value.click();
};

async function onFileChanged(event: Event) {
    const files = event.target.files[0];
    console.log("🚀 ~ file: RandomDraw.vue:71 ~ onFileChanged ~ files:", files)
    if (!files.type.match('text/csv')) {
        alert('alert')
        return;
    }
    if (files) {
        selectedFile.value = files;
        event.target.files = null;
        await addCoupon({ campaignId: route.params.slug.toString(), file: selectedFile.value })
        await getCampaign(route.params.slug);
    }
    console.log("🚀 ~ file: RandomDraw.vue:82 ~ onFileChanged ~ event.target.files:", event.target.files)

};

const items = [
    {
        title: 'Home',
        disabled: false,
        href: '/home',
    },
    {
        title: 'Random Draw',
        disabled: false,
        href: '/random',
    },
    {
        title: campaignState.campaign?.title,
        disabled: true,
        href: '/random',
    },
];


onBeforeMount(async () => {
    await getCampaign(route.params.slug);
})
</script>

<style scoped lang="scss">
.dataset-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
</style>