<template>
    <div class="dataset-header">
        <h2 class="title">Prize Tier</h2>
        <CreatePrizeModal />
    </div>
    <VCard rounded="lg" color="white" elevation="1">
        <VDataTable :headers="prizeHeaders" :items="props.prizes">
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
            <template v-slot:item="{ item }">
                <tr v-if="props.prizes">
                    <td style="border-bottom: none; text-align: center;">{{
                        item.columns.rank }}
                    </td>
                    <td style="border-bottom: none; text-align: center;">{{
                        item.columns.title }}
                    </td>
                    <td style="border-bottom: none; text-align: center;">{{
                        new Date(item.columns.createdAt).toLocaleString()
                    }}</td>
                    <td style="border-bottom: none; text-align: center;">
                        {{ item.columns.createdBy.username }}</td>
                    <td style="border-bottom: none; text-align: center;">
                        <VChip rounded="sm" :color="getColor(item.columns.amount)">
                            {{ item.columns.amount }}
                        </VChip>
                    </td>
                    <td style="border-bottom: none; text-align: center;">
                        <VChip v-if="item.columns.isDone" rounded="sm" :color="getColor(item.columns.prizeCap)">
                            {{ item.columns.isDone ? 'Complete' : '' }}
                        </VChip>
                    </td>
                    <td style="border-bottom: none; text-align: center;">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" @click="() => { }" />
                        <EditPrizeModal :prize="item.raw" />
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="4" class="text-center">No dataset</td>
                </tr>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import EditPrizeModal from './EditPrizeModal.vue';
import CreatePrizeModal from './CreatePrizeModal.vue';

const props = defineProps(['prizes'])

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
</style>