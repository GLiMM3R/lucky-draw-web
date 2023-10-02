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
                        <input ref="uploader" accept=".csv" type="file" class="d-none" @change="onFileChanged" />
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
        <VRow justify="center">
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
import CreatePrizeModal from '@/components/random/CreatePrizeModal.vue';
import RandomPrizeTable from '@/components/random/RandomPrizeTable.vue';
import RandomPrizeDialog from '@/components/random/RandomPrizeDialog.vue';
import RandomCouponTable from '@/components/random/RandomCouponTable.vue';

const { getCampaign } = useCampaign();
const { addCoupon } = useCoupon();
const route = useRoute();
const uploader = ref(null);
const isSelecting = ref(false);
const selectedFile = ref(null);
const selectedCoupon = ref(null);


const handleSelectDataset = (value: any) => {
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
    if (!files.type.match('text/csv')) {
        alert('alert')
        return;
    }
    if (files) {
        selectedFile.value = files;
        uploader.value.value = null;
        await addCoupon({ campaignId: route.params.slug.toString(), file: selectedFile.value })
        await getCampaign(route.params.slug.toString());
    }
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

];


onBeforeMount(async () => {
    await getCampaign(route.params.slug.toString());
})
</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}

.dataset-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
</style>