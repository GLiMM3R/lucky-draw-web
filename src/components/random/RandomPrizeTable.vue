<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.prize') }}</h2>
        <FormRandomPrize />
    </div>
    <VCard rounded="lg" color="white" class="shadow">
        <VDataTable :headers="prizeHeaders" :items="randomPrizes" class="text-center">
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
            <template v-slot:item.rank="{ item }">
                {{ item.columns.rank }}
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
            <template v-slot:item.isComplete="{ item }">
                <VChip v-if="item.columns.isComplete" rounded="sm" :color="getColor(item.columns.isComplete)">
                    {{ item.columns.isComplete ? 'Complete' : '' }}
                </VChip>
            </template>
            <template v-slot:item.actions="{ item }">
                <div style="border-bottom: none; text-align: center; display: flex; align-items: center;">
                    <div>
                        <ConfirmDialog message="Do you want to delete this?" icon="mdi-trash-can-outline" color="red"
                            @handleConfirm="handleConfirm(item.raw.id)" />
                    </div>
                    <div>
                        <FormRandomPrize :prize="item.raw" />
                    </div>
                </div>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import ConfirmDialog from '../ConfirmDialog.vue';
import { useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { useRandomPrizeStore } from '@/stores/randomPrize';
import { storeToRefs } from 'pinia';
import FormRandomPrize from './FormRandomPrize.vue';

const i18n = useI18n();
const route = useRoute();
const slug = route.params.slug as string

const randomPrizeStore = useRandomPrizeStore();
const { randomPrizes } = storeToRefs(randomPrizeStore)
console.log("🚀 ~ file: RandomPrizeTable.vue:74 ~ randomPrizes:", randomPrizes.value)

await randomPrizeStore.fetchRandomPrizeBySlug(slug)

const handleConfirm = async (id: string) => {
    await randomPrizeStore.deleteRandomPrize(id, slug)
}

const prizeHeaders = [
    {
        key: 'rank',
        title: i18n.t('table.header.prize.rank')
    },
    {
        key: 'title',
        title: i18n.t('table.header.prize.title')
    },
    {
        key: 'createdAt',
        title: i18n.t('table.header.prize.createdAt')
    },
    {
        key: 'createdBy',
        title: i18n.t('table.header.prize.createdBy')
    },
    {
        key: 'amount',
        title: i18n.t('table.header.prize.prizeAmount')
    },
    {
        key: 'isComplete',
        title: i18n.t('table.header.prize.status')
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
</style>@/stores/drawPrize