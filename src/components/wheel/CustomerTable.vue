<template>
    <div class="dataset-header">
        <h2 class="title">Coupon</h2>
        <CreateCouponModal />
    </div>
    <VCard elevation="1" rounded="lg">
        <VDataTable :headers="headers" :items="props.coupon" :search="search" v-model="selected" item-value="id"
            class="text-center" select-strategy="single" show-select :hover="true">
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
            <template v-slot:item.title="{ item }" style="border-bottom: none;">
                {{ item.columns.title }}
            </template>
            <template v-slot:item.createdAt="{ item }" style="border-bottom: none;">
                {{ new Date(item.columns.createdAt).toDateString() }}
            </template>
            <template v-slot:item.isNew="{ item }">
                <VChip rounded="sm" :color="getColor(item.columns.isNew)">
                    {{ item.columns.isNew ? 'New' : '' }}
                </VChip>
            </template>
            <template v-slot:item.actions="{ item }">
                <!-- <td style="background-color: white; border-bottom: none; text-align: center; display: flex;"> -->
                <div>
                    <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" />
                    <EditCouponModal :customer="item.raw" />
                </div>
                <!-- </td> -->
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditCouponModal from './EditCouponModal.vue';
import CreateCouponModal from './CreateCouponModal.vue';

const props = defineProps(['coupon'])

const selected = ref([]);
const search = ref('');

const headers = [
    {
        key: 'name',
        title: 'Customer Name',
    },
    {
        key: 'createdAt',
        title: 'Create Date'
    },
    {
        key: 'createdBy.username',
        title: 'Create By'
    },
    {
        key: 'isNew',
        title: 'Status',
    },
    { title: '', key: "actions", sortable: false },

]

const getColor = (status: boolean) => {
    if (status) return 'green'
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