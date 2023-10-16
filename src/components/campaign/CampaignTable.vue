<template>
    <VCard rounded="lg" class="shadow">
        <VCardTitle class="d-flex">
            <VTextField v-model="search" variant="outlined" density="comfortable" prepend-inner-icon="mdi-magnify"
                :placeholder="$t('textfield.placeholder.search')" />
            <CreateCampaignModal @handleSubmit="handleSubmit" :type="$props.type" />
        </VCardTitle>
        <VDataTable :headers="headers" :items="props.campaigns" :search="search" :hover="true" class="text-center">
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

            <!-- <template v-slot:item.title="{ item, toggleSelect }">
                {{ item.columns.title }}
            </template>
            <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.columns.createdAt).toDateString() }}
            </template>
            <template v-slot:item.createdBy="{ item }">
                {{ item.columns.createdBy.username }}
            </template>
            <template v-slot:item.prizeCap="{ item }">
                <VChip rounded="sm" :color="getColor(item.columns.prizeCap)">
                    {{ item.columns.prizeCap }}
                </VChip>
            </template>
            <template v-slot:item.actions="{ item }">
                <div style="border-bottom: none; text-align: center; display: flex; justify-content: center;">
                    <div>
                        <ConfirmDialog message="Do you want to delete this?" @handleConfirm="handleDeleteCampaign(item)" />
                    </div>
                    <div>
                        <EditCampaignModal @handleUpdate="handleUpdate" :campaign="item.raw" :type="props.type" />
                    </div>
                </div>
            </template> -->

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
                    <td @click="handleSelect(item)"
                        style="background-color: white; border-bottom: none; text-align: center;">
                        <VChip rounded="sm" :color="getColor(item.columns.isDone)">
                            {{ item.columns.isDone ? 'Completed' : 'In progress' }}
                        </VChip>
                    </td>
                    <td style="background-color: white; border-bottom: none;">
                        <div style="border-bottom: none; text-align: center; display: flex; justify-content: center;">
                            <div>
                                <ConfirmDialog message="Do you want to delete this?" icon="mdi-trash-can-outline"
                                    color="red" @handleConfirm="handleDeleteCampaign(item)" />
                            </div>
                            <div>
                                <EditCampaignModal @handleUpdate="handleUpdate" :campaign="item.raw" :type="props.type" />
                            </div>
                            <div>
                                <ConfirmDialog message="Do you want to complete this campaign?"
                                    icon="mdi-checkbox-marked-circle-outline"
                                    @handleConfirm="handleFinishCampaign(item.raw)" />
                            </div>
                        </div>
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
import EditCampaignModal from './EditCampaignModal.vue';
import { useCampaignStore } from '@/stores/campaign';
import ConfirmDialog from '../ConfirmDialog.vue';
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const router = useRouter();
const props = defineProps(['campaigns', 'type'])
const campaignStore = useCampaignStore();

const selected = ref([]);
const search = ref('');

const handleSubmit = async (values: any) => {
    await campaignStore.addCampaign({ title: values.title, prizeCap: Number(values.prizeCap), type: props.type })
    await campaignStore.getCampaigns()
}

const handleUpdate = async (values: any) => {
    await campaignStore.updateCampaign({ id: values.id, title: values.title, prizeCap: Number(values.prizeCap) })
    await campaignStore.getCampaigns()
}

const handleFinishCampaign = async (values: any) => {
    await campaignStore.updateCampaign({ id: values.id, isDone: true })
    await campaignStore.getCampaigns()
}

const handleSelect = async (item: any) => {
    await router.push(`/${props.type}/${item.raw.id}`)
}

const handleDeleteCampaign = async (item: any) => {
    await campaignStore.deleteCampaign(item.raw.id)
    await campaignStore.getCampaigns()
}

const headers = [
    {
        key: 'title',
        title: i18n.t('table.header.campaign.title'),
    },
    {
        key: 'createdAt',
        title: i18n.t('table.header.campaign.createdAt')
    },
    {
        key: 'createdBy',
        title: i18n.t('table.header.campaign.createdBy')
    },
    {
        key: 'prizeCap',
        title: i18n.t('table.header.campaign.prizeCap')
    },
    {
        key: 'isDone',
        title: i18n.t('table.header.campaign.status')
    },
    { title: '', key: "actions", sortable: false },
]

const getColor = (status: boolean) => {
    if (status) return 'green'
    else return 'grey'
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