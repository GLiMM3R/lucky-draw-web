<template>
    <VCard rounded="lg" color="white" class="shadow">
        <VDataTable :headers="prizeHeaders" :items="wheelPrizes" class="text-center">
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
            <template v-slot:item.title="{ item }">
                {{ capitalizeLetter(item.columns.title) }}
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
            <template v-slot:item.remainingAmount="{ item }">
                <VChip rounded="sm" :color="getColor(item.columns.remainingAmount)">
                    {{ item.columns.remainingAmount }}
                </VChip>
            </template>
            <template v-slot:item.isComplete="{ item }">
                <VChip v-if="item.columns.isComplete" rounded="sm">
                    {{ item.columns.isComplete ? 'Complete' : '' }}
                </VChip>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { storeToRefs } from 'pinia';
import FormWheelPrize from './FormWheelPrize.vue';
import { useWheelPrizeStore } from '@/stores/wheelPrize';

const i18n = useI18n();
const route = useRoute();
const slug = route.params.slug as string

const wheelPrizeStore = useWheelPrizeStore();
const { wheelPrizes } = storeToRefs(wheelPrizeStore)

await wheelPrizeStore.fetchWheelPrizeBySlug(slug)

const prizeHeaders = [
    {
        key: 'title',
        title: i18n.t('table.prize.title')
    },
    {
        key: 'createdAt',
        title: i18n.t('table.prize.createdAt')
    },
    {
        key: 'createdBy',
        title: i18n.t('table.prize.createdBy')
    },
    {
        key: 'amount',
        title: i18n.t('table.prize.prizeAmount')
    },
    {
        key: 'remainingAmount',
        title: i18n.t('table.prize.prizeAmount')
    },
    {
        key: 'isComplete',
        title: i18n.t('table.prize.status')
    },
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
</style>@/stores/drawPrize