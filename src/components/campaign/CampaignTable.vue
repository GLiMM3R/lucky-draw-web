<template>
    <VCard elevation="1" rounded="lg">
        <VCardTitle class="d-flex">
            <VTextField v-model="search" variant="outlined" density="comfortable" prepend-inner-icon="mdi-magnify"
                placeholder="Search..." />
            <CreateCampaignModal @handleSubmit="handleSubmit" :type="props.type" />
        </VCardTitle>
        <VDataTable :headers="headers" :items="campaigns" :search="search" v-model="selected" :hover="true">
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
            <template v-slot:item="{ item }">
                <tr>
                    <td @click="handleSelect(item)"
                        style="background-color: white; border-bottom: none; text-align: center;">{{
                            item.columns.title }}
                    </td>
                    <td @click="handleSelect(item)"
                        style="background-color: white; border-bottom: none; text-align: center;">{{
                            new Date(item.columns.createdAt).toDateString()
                        }}</td>
                    <td @click="handleSelect(item)"
                        style="background-color: white; border-bottom: none; text-align: center;">
                        {{ item.columns.createdBy.username }}</td>
                    <td @click="handleSelect(item)"
                        style="background-color: white; border-bottom: none; text-align: center;">
                        <VChip rounded="sm" :color="getColor(item.columns.prizeCap)">
                            {{ item.columns.prizeCap }}
                        </VChip>
                    </td>
                    <td style="background-color: white; border-bottom: none; text-align: center; display: flex;">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red"
                            @click="handleDeleteCampaign(item)" />
                        <div>
                            <EditCampaignModal @handleUpdate="handleUpdate" :campaign="item.raw" :type="props.type" />
                        </div>
                    </td>
                </tr>
                <!-- <tr v-if="!campaigns">
                    <td colspan="4" class="text-center">No dataset</td>
                </tr> -->
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateCampaignModal from './CreateCampaignModal.vue';
import EditCampaignModal from './EditCampaignModal.vue';
import useCampaign from '@/composables/useCampaign';
import { onMounted } from 'vue';
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';

const router = useRouter();
const props = defineProps(['type'])
const campaignStore = useCampaignStore();
const { campaigns } = storeToRefs(campaignStore);
const { addCampaign, deleteCampaign, getCampaigns, updateCampaign } = useCampaign()

onMounted(async () => {
    await getCampaigns(props.type);
})

const selected = ref([]);
const search = ref('');

const handleSubmit = async (values: any) => {
    await addCampaign({ title: values.title, prizeCap: Number(values.prizeCap), type: props.type })
    await getCampaigns(props.type)
}

const handleUpdate = async (values: any) => {
    await updateCampaign({ id: values.id, title: values.title, prizeCap: Number(values.prizeCap) })
    await getCampaigns(props.type)
}

const handleSelect = async (item: any) => {
    await router.push(`/${props.type}/${item.raw.id}`)
}

const handleDeleteCampaign = async (item: any) => {
    await deleteCampaign(item.raw.id)
    await getCampaigns(props.type)
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