<template>
    <VCard rounded="lg" class="shadow">
        <VCardTitle class="d-flex">
            <VTextField v-model="search" variant="outlined" density="comfortable" prepend-inner-icon="mdi-magnify"
                :placeholder="$t('textfield.placeholder.search')" />
            <FormWheelCampaign />
        </VCardTitle>
        <VDataTable :headers="headers" :items="props.campaigns" :search="search" :hover="true" class="text-center"
            @click:row="handleSelect">
            <template v-slot:headers="{ columns, toggleSort, isSorted, getSortIcon }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td style="background-color: rgba(244, 246, 248, 1); text-align: center; cursor: pointer;">
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
            <template v-slot:item.actions="{ item }">
                <div v-if="!item.raw.isComplete" style="text-align: center; display: flex; justify-content: center;">
                    <div>
                        <ConfirmDialog message="Do you want to delete this?" icon="mdi-trash-can-outline" color="red"
                            @handleConfirm="handleDeleteCampaign(item)" />
                    </div>
                    <div>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn variant="text" size="small" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <FormWheelCampaign :campaign="item.raw" />
                                </v-list-item>
                                <v-list-item>
                                    <ConfirmDialog :message="$t('message.finishCampaign')"
                                        :buttonText="$t('button.finishCampaign')"
                                        @handleConfirm="handleFinishCampaign(item.raw)" />
                                </v-list-item>
                                <v-list-item>
                                    <DuplicateCampaignDialog :buttonText="$t('button.duplicateCampaign')"
                                        :campaign="item.raw" @handleConfirm="handleDuplicateCampaign"
                                        :loading="isLoading" />
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfirmDialog from '../ConfirmDialog.vue';
import { useI18n } from "vue-i18n";
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import FormWheelCampaign from './FormWheelCampaign.vue';
import { useWheelStore } from '@/stores/wheel';
import DuplicateCampaignDialog from '../DuplicateCampaignDialog.vue';
import { storeToRefs } from 'pinia';

const i18n = useI18n();
const router = useRouter();
const props = defineProps(['campaigns'])
const wheelStore = useWheelStore();
const { isLoading } = storeToRefs(wheelStore)

const search = ref('');

const handleSelect = async (item: any, row: any) => {
    if (!row.item.raw.isComplete) {
        await router.push(`/wheel/${row.item.raw.slug}`)
    } else if (row.item.raw.isComplete) {
        await router.push(`/wheel/report/${row.item.raw.slug}`)
    }
}

const handleDuplicateCampaign = async (values: any) => {
    await wheelStore.duplicateWheel({ id: values.id, title: values.title })
    await wheelStore.fetchWheels();
}

const handleFinishCampaign = async (values: any) => {
    await wheelStore.updateWheel({ id: values.id, isComplete: true })
    await wheelStore.fetchWheels();
}

const handleDeleteCampaign = async (item: any) => {
    await wheelStore.deleteWheel(item.raw.id)
    await wheelStore.fetchWheels();
}

const headers = [
    {
        key: 'title',
        title: i18n.t('table.campaign.title'),
    },
    {
        key: 'createdAt',
        title: i18n.t('table.campaign.createdAt')
    },
    {
        key: 'createdBy',
        title: i18n.t('table.campaign.createdBy')
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