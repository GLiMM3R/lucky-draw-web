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
                    <VDataTable :headers="couponHeaders" :items="campaignState.campaign?.coupon">
                        <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                            <tr>
                                <template v-for="column in columns" :key="column.key">
                                    <td
                                        style="background-color: rgb(128, 128, 128, 0.1); text-align: center; cursor: pointer;">
                                        <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                                            column.title }}</span>
                                        <template v-if="isSorted(column)">
                                            <v-icon :icon="getSortIcon(column)"></v-icon>
                                        </template>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        <template v-slot:body="{ items }">
                            <tr v-for="item in items" :key="item.key">
                                <td style="background-color: white; border-bottom: none; text-align: center;">{{
                                    item.columns.file }}
                                </td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">{{
                                    new Date(item.columns.createdAt).toLocaleString()
                                }}</td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    {{ item.columns.createdBy.username }}</td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    <VChip rounded="sm">
                                        {{ item.columns.isNew }}
                                    </VChip>
                                </td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red"
                                        @click="() => { }" />
                                    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                                    <!-- <v-btn size="small" variant="text" icon="mdi-play" @click="() => { }" /> -->
                                </td>
                            </tr>
                        </template>
                    </VDataTable>
                </VSheet>
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
                <VSheet rounded="lg" color="white" elevation="1">
                    <VDataTable :headers="prizeHeaders" :items="prizeState.prizes">
                        <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                            <tr>
                                <template v-for="column in columns" :key="column.key">
                                    <td
                                        style="background-color: rgb(128, 128, 128, 0.1); text-align: center; cursor: pointer;">
                                        <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                                            column.title }}</span>
                                        <template v-if="isSorted(column)">
                                            <v-icon :icon="getSortIcon(column)"></v-icon>
                                        </template>
                                    </td>
                                </template>
                            </tr>
                        </template>
                        <template v-slot:body="{ items }">
                            <tr v-for="item in items" :key="item.key">
                                <td style="background-color: white; border-bottom: none; text-align: center;">{{
                                    item.columns.rank }}
                                </td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">{{
                                    item.columns.title }}
                                </td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">{{
                                    new Date(item.columns.createdAt).toLocaleString()
                                }}</td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    {{ item.columns.createdBy.username }}</td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    <VChip rounded="sm" :color="getColor(item.columns.prizeCap)">
                                        {{ item.columns.amount }}
                                    </VChip>
                                </td>
                                <td style="background-color: white; border-bottom: none; text-align: center;">
                                    <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red"
                                        @click="() => { }" />
                                    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                                    <!-- <v-btn size="small" variant="text" icon="mdi-play" @click="() => { }" /> -->
                                </td>
                            </tr>
                        </template>
                    </VDataTable>
                </VSheet>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import CreatePrizeModal from '@/components/CreatePrizeModal.vue';
import useCampaign from '@/composables/useCampaign';
import usePrize from '@/composables/usePrize';
import useCoupon from '@/composables/useCoupon';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const { campaignState, getCampaign } = useCampaign();
const { prizeState } = usePrize();
const { couponState, addCoupon } = useCoupon();
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

async function onFileChanged(event: Event) {
    const files = event.target.files[0];
    if (!files.type.match('text/csv')) {
        alert('alert')
    }
    if (files) {
        selectedFile.value = event.target.files[0];
        await addCoupon({ campaignId: route.params.slug.toString(), file: selectedFile.value })
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
        title: campaignState.campaign?.file,
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
        key: 'rank',
        title: 'Prize Rank'
    },
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

const getColor = (quota: number) => {
    if (quota < 1) return 'grey'
    else if (quota < 3) return 'red'
    else if (quota < 5) return 'orange'
    else return 'green'
};

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