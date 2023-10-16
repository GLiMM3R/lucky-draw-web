<template>
    <VCard rounded="lg" class="shadow">
        <VDataTable :headers="prizeHeaders" :items="props.winners" class="text-center">
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
            <template v-slot:item.id="{ item, index }" style="border-bottom: none;">
                {{ index + 1 }}
            </template>
            <template v-slot:item.name="{ item }" style="border-bottom: none;">
                {{ item.columns.name }}
            </template>
            <template v-slot:item.createdAt="{ item }" style="border-bottom: none;">
                {{ new Date(item.columns.createdAt).toDateString()
                }}
            </template>
            <template v-slot:item.status="{ item }" style="border-bottom: none;">
                <VChip color="orange">
                    Winner
                </VChip>
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
        title: i18n.t('table.header.winner.no')
    },
    {
        key: 'winnerName',
        title: i18n.t('table.header.winner.winnerName')
    },
    {
        key: 'createdAt',
        title: i18n.t('table.header.winner.createdAt')
    },
    {
        key: 'status',
        title: i18n.t('table.header.winner.status')
    },
    { title: '', key: "actions", sortable: false },
]
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>