<template>
    <VCard class="shadow" rounded="lg">
        <VCardTitle class="d-flex">
            <VTextField v-model="search" variant="outlined" density="comfortable" prepend-inner-icon="mdi-magnify"
                placeholder="Search..." />
        </VCardTitle>
        <VDataTable :headers="headers" :items="props.campaigns" :search="search" v-model="selected" :hover="true"
            class="text-center">
            <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td style="background-color: rgb(128, 128, 128, 0.1); text-align: center; cursor: pointer;">
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
                {{ item.columns.title }}
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.columns.createdAt).toDateString() }}
            </template>
            <template v-slot:item.createdBy="{ item }">
                {{ item.columns.createdBy.username }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn size="small" variant="text" icon="mdi-tray-arrow-down" @click="handleDownloadReport(item.raw)" />
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useReport from '@/composables/useReport';
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = defineProps(['campaigns'])
const { getReport, } = useReport()

const handleDownloadReport = async (item: any) => {
    await getReport(item.id, item.title)
}


const selected = ref([]);
const search = ref('');

const headers = [
    {
        key: 'title',
        title: i18n.t('table.header.campaign.title')
    },
    {
        key: 'createdAt',
        title: i18n.t('table.header.campaign.createdAt')
    },
    {
        key: 'createdBy',
        title: i18n.t('table.header.campaign.createdBy')
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
.row-table:hover {
    background-color: #028947;
}

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>