<template>
    <VCard rounded="lg" class="shadow">
        <VDataTable :headers="prizeHeaders" :items="props.winners" class="text-center" color="primary">
            <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td
                            style="background-color: rgba(244, 246, 248, 1); color: #637381; text-align: center; cursor: pointer;">
                            <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                                column.title }}</span>
                            <template v-if="isSorted(column)">
                                <v-icon :icon="getSortIcon(column)"></v-icon>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.id="{ item, index }">
                {{ index + 1 }}
            </template>
            <template v-slot:item.name="{ item }">
                {{ item.columns.name }}
            </template>
            <template v-slot:item.phone="{ item }">
                {{ item.columns.phone.slice(0, -2) + 'XX' }}
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.columns.createdAt).toDateString()
                }}
            </template>
            <template v-slot:item.status="{ item }">
                <VChip style="background-color: #FFCE3C; color: #212B36;" class="rounded-lg">
                    Winner
                </VChip>
            </template>
            <template v-slot:bottom>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = defineProps(['winners'])
const prizeHeaders = [
    {
        key: 'id',
        title: i18n.t('table.winner.no')
    },
    {
        key: 'name',
        title: i18n.t('table.winner.winnerName')
    },
    {
        key: 'phone',
        title: i18n.t('table.winner.winnerPhone')
    },
    {
        key: 'createdAt',
        title: i18n.t('table.winner.createdAt')
    },
    {
        key: 'status',
        title: i18n.t('table.winner.status')
    },
    { title: '', key: "actions", sortable: false },
]
</script>

<style scoped>
.border-b-0 {
    border-bottom: none;
}

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>