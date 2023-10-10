<template>
    <div class="dataset-header">
        <h2 class="title">Prize Tier</h2>
        <CreatePrizeModal />
    </div>
    <VCard rounded="lg" color="white" class="shadow">
        <VDataTable :headers="prizeHeaders" :items="campaign?.prizes" class="text-center">
            <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td style="background-color: #F4F6F8; color: #637381; text-align: center; cursor: pointer;">
                            <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                                column.title }}</span>
                            <template v-if="isSorted(column)">
                                <v-icon :icon="getSortIcon(column)"></v-icon>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.rank="{ item }">
                {{ item.columns.rank }}
            </template>
            <template v-slot:item.title="{ item }">
                {{ item.columns.title }}
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.columns.createdAt).toDateString() }}
            </template>
            <template v-slot:item.createdBy="{ item }">
                {{ item.columns.createdBy.username }}
            </template>
            <template v-slot:item.amount="{ item }">
                <VChip rounded="sm" :color="getColor(item.columns.amount)">
                    {{ item.columns.amount }}
                </VChip>
            </template>
            <template v-slot:item.leftAmount="{ item }">
                <VChip rounded="sm" :color="getColor(item.columns.leftAmount)">
                    {{ item.columns.leftAmount }}
                </VChip>
            </template>
            <template v-slot:item.isDone="{ item }">
                <VChip v-if="item.columns.isDone" rounded="sm" :color="getColor(item.columns.prizeCap)">
                    {{ item.columns.isDone ? 'Complete' : '' }}
                </VChip>
            </template>
            <template v-slot:item.actions="{ item }">
                <div style="border-bottom: none; text-align: center; display: flex; align-items: center;">
                    <div>
                        <ConfirmDialog message="Do you want to delete this?" @handleConfirm="handleConfirm(item.raw.id)" />
                    </div>
                    <div>
                        <EditPrizeModal :prize="item.raw" />
                    </div>
                </div>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import EditPrizeModal from './EditPrizeModal.vue';
import CreatePrizeModal from './CreatePrizeModal.vue';
import ConfirmDialog from '../ConfirmDialog.vue';
import { useRoute } from 'vue-router';
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';
import { usePrizeStore } from '@/stores/prize';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const prizeStore = usePrizeStore();
const { campaign } = storeToRefs(campaignStore)

const handleConfirm = async (id: string) => {
    await prizeStore.deletePrize(id)
    await campaignStore.getCampaign(slug)
}
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
    {
        key: 'leftAmount',
        title: 'Prize Left'
    },
    {
        key: 'isDone',
        title: 'Status'
    },
    { title: '', key: "actions", sortable: false },
]

const getColor = (quota: number) => {
    if (quota < 1) return 'grey'
    else if (quota < 3) return 'red'
    else if (quota < 5) return 'orange'
    else return 'green'
};
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

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>