<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.coupon') }}</h2>
        <div>
            <CreateCouponModal />
        </div>
    </div>
    <VCard class="shadow" rounded="lg">
        <VDataTable :headers="headers" :items="props.coupon" :search="search" v-model="selected" item-value="id"
            class="text-center" select-strategy="single" show-select :hover="true" @change="handleSelected">
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
                <VChip v-if="item.columns.isNew" rounded="sm" :color="getColor(item.columns.isNew)">
                    {{ item.columns.isNew ? 'New' : '' }}
                </VChip>
            </template>
            <template v-slot:item.actions="{ item }">
                <div class="d-flex justify-center">
                    <div>
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" />
                    </div>
                    <div>
                        <EditCouponModal :customer="item.raw" />
                    </div>
                </div>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EditCouponModal from './EditCouponModal.vue';
import CreateCouponModal from './CreateCouponModal.vue';
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = defineProps(['coupon'])
const emit = defineEmits(['handleSelectCoupon'])

const selected = ref([]);
const search = ref('');

const handleSelected = () => {
    emit('handleSelectCoupon', props.coupon.filter((item: any) => item.id == selected.value[0])[0])
}

const headers = [
    {
        key: 'name',
        title: i18n.t('table.header.coupon.title'),
    },
    {
        key: 'createdAt',
        title: i18n.t('table.header.coupon.createdAt')
    },
    {
        key: 'createdBy.username',
        title: i18n.t('table.header.coupon.createdBy')
    },
    {
        key: 'isNew',
        title: i18n.t('table.header.coupon.status')
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

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>