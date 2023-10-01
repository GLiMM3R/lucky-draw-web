<template>
    <VSheet rounded="lg" color="white" elevation="1">
        <VDataTable :headers="couponHeaders" :items="couponState.coupons" show-select>
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
                <tr v-for="item in items" :key="item.raw.id">
                    <td style="border-bottom: none; text-align: center;">
                        <VCheckbox v-model="selectedCoupon" color="green" :value="item.raw" @change="handleSelectDataset" />
                    </td>
                    <td td style="border-bottom: none; text-align: center;"> {{
                        item.columns.file.replace('coupon/', '') }}
                    </td>
                    <td style="border-bottom: none; text-align: center;">{{
                        new Date(item.columns.createdAt).toLocaleString()
                    }}</td>
                    <td style="border-bottom: none; text-align: center;">
                        {{ item.columns.createdBy.username }}</td>
                    <td style="border-bottom: none; text-align: center;">
                        <VChip v-if="item.columns.isNew" rounded="sm" color="green">
                            {{ item.columns.isNew ? 'New' : '' }}
                        </VChip>
                    </td>
                    <td style="border-bottom: none; text-align: center;" class="td">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" @click="() => { }" />
                        <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                    </td>
                </tr>
            </template>
        </VDataTable>
    </VSheet>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useCoupon from '@/composables/useCoupon';

const { couponState } = useCoupon();
const emit = defineEmits(['handleSelectDataset'])
const selectedCoupon = ref(null);

const handleSelectDataset = () => {
    emit('handleSelectDataset', selectedCoupon.value)
}

const couponHeaders = [
    {
        key: 'file',
        title: 'Data Set Name',
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
</script>