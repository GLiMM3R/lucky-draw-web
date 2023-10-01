<template>
    <v-btn color="primary" @click="dialog = true">
        Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" class="mb-3" color="red" icon="mdi-close" @click="dialog = false">
                </VBtn>
            </template>
            <VDataTable :headers="prizeHeaders" :items="prizeState.prizes" hide-default-footer disable-pagination
                show-select>
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
                        <td style="border-bottom: none; text-align: center;">
                            <VCheckbox v-model="selectedPrize" color="green" :value="item.raw" />
                        </td>
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
                            <VChip rounded="sm" :color="getColor(item.columns.prizeCap)">
                                {{ item.columns.amount }}
                            </VChip>
                        </td>
                        <td style="border-bottom: none; text-align: center;">
                            <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red"
                                @click="() => { }" />
                            <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                        </td>
                    </tr>
                </template>
                <template #bottom></template>
            </VDataTable>
            <VCardItem>
                <div class="text-center mb-4">
                    <RandomDrawDialog />
                </div>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import usePrize from '@/composables/usePrize';
import { ref } from 'vue';
import RandomDrawDialog from './RandomDrawDialog.vue';

const { prizeState } = usePrize()
const dialog = ref(false)
const selectedPrize = ref(null)

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
</script>