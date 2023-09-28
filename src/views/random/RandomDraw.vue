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
                        <input ref="uploader" accept=".csv" class="d-none" type="file" @change="onFileChanged">
                        <VBtn class="text-none" rounded="lg">+ Export Coupon</VBtn>
                    </div>
                </div>
                <VSheet rounded="lg" color="white" elevation="1">
                    <VDataTable :headers="couponHeaders" :items="state.campaign.coupons" />
                </VSheet>
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <div class="dataset-header">
                    <h2 class="title">Prize Tier</h2>
                    <div>
                        <CreatePrizeModal />
                    </div>
                </div>
                <VSheet rounded="lg" color="white" elevation="1">
                    <VDataTable :headers="prizeHeaders" :items="state.campaign.coupons" />
                </VSheet>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import CreatePrizeModal from '@/components/CreatePrizeModal.vue';
import useCampaign from '@/composables/useCampaign';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const { state, getCampaign } = useCampaign();
const route = useRoute();
const uploader = ref(null);
const isSelecting = ref(false);
const selectedFile = ref(null);

function handleFileImport() {
    isSelecting.value = true;

    window.addEventListener('focus', () => {
        isSelecting.value = false
    }, { once: true });

    uploader.value.click();
};

function onFileChanged(event: Event) {
    if (event.target.files) {
        selectedFile.value = event.target.files[0];
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
    {
        title: state.campaign.title,
        disabled: true,
        href: '/random',
    },
];

const couponHeaders = [
    {
        key: 'file',
        title: 'Data Set Name'
    },
    {
        key: 'createdAt',
        title: 'Create Date'
    },
    {
        key: 'createdBy',
        title: 'Create By'
    },
    {
        key: 'isNew',
        title: 'Status'
    },
    { title: '', key: "actions", sortable: false },
]

const prizeHeaders = [
    {
        key: 'title',
        title: 'Prize Name'
    },
    {
        key: 'createdAt',
        title: 'Create Date'
    },
    {
        key: 'createdBy',
        title: 'Create By'
    },
    {
        key: 'amount',
        title: 'Prize Amount'
    },
    { title: '', key: "actions", sortable: false },
]

onBeforeMount(async () => {
    await getCampaign(route.params.slug)
})
</script>

<style scoped lang="scss">
.dataset-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}
</style>