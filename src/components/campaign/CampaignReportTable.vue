<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.prize') }}</h2>
    </div>
    <VCard class="shadow">
        <v-data-table :groupBy="groupBy" :sort-by="sortBy" :headers="headers" :items="props.source" class="elevation-1">
            <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td style="background-color: rgba(244, 246, 248, 1); cursor: pointer;">
                            <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                                column.title }}</span>
                            <template v-if="isSorted(column)">
                                <v-icon :icon="getSortIcon(column)"></v-icon>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.columns.createdAt).toDateString() }}
            </template>
        </v-data-table>
    </VCard>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = defineProps(['source'])
const sortBy = [{ key: 'createdAt', order: 'asc' }];
const groupBy = [{ key: 'prize.title', order: 'asc' }];
const headers = [
    {
        title: i18n.t('table.header.winner.winnerName'),
        key: 'winnerName',
    },
    {
        title: i18n.t('table.header.winner.winnerPhone'),
        key: 'winnerPhone',
    },
    {
        title: i18n.t('table.header.winner.createdAt'),
        key: 'createdAt',
    },
];
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