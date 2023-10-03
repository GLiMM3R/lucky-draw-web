<template>
    <VCard elevation="1" rounded="lg">
        <VCardTitle class="d-flex">
            <VTextField v-model="search" variant="outlined" density="comfortable" prepend-inner-icon="mdi-magnify"
                placeholder="Search..." />
            <CreateCampaignModal />
        </VCardTitle>
        <VDataTable :headers="headers" :items="campaigns" :search="search" v-model="selected">
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
            <template v-slot:body="{ items }">
                <tr v-for="item in items" :key="item.key" @click="handleSelect(item)">
                    <td style="background-color: white; border-bottom: none; text-align: center;">{{
                        item.columns.title }}
                    </td>
                    <td style="background-color: white; border-bottom: none; text-align: center;">{{
                        new Date(item.columns.createdAt).toLocaleString()
                    }}</td>
                    <td style="background-color: white; border-bottom: none; text-align: center;">
                        {{ item.columns.createdBy.username }}</td>
                    <td style="background-color: white; border-bottom: none; text-align: center;">
                        <VChip rounded="sm" :color="getColor(item.columns.prizeCap)">
                            {{ item.columns.prizeCap }}
                        </VChip>
                    </td>
                    <td style="background-color: white; border-bottom: none; text-align: center;">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" @click="() => { }" />
                        <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                    </td>
                </tr>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateCampaignModal from './CreateCampaignModal.vue';
import useCampaigns from '@/composables/useCampaigns';

const { campaigns, getCampaigns } = useCampaigns()
await getCampaigns('random');

const router = useRouter();
const selected = ref([]);
const search = ref('');


const handleSelect = async (item: any) => {
    router.push(`/random/${item.raw.id}`)
}

const headers = [
    {
        key: 'title',
        title: 'Campaign Name',
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
        key: 'prizeCap',
        title: 'Winning quota',
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
</style>