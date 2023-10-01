<template>
    <VSheet rounded="lg" color="white" elevation="1">
        <VDataTable :headers="prizeHeaders" :items="prizeState.prizes">
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
            <template v-slot:body="{ items }">
                <tr v-for="item in items" :key="item.key">
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
                        <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                    </td>
                </tr>
            </template>
        </VDataTable>
    </VSheet>
</template>

<script setup lang="ts">
import usePrize from '@/composables/usePrize';

const { prizeState } = usePrize()
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