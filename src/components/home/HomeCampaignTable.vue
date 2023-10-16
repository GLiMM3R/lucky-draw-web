<template>
    <VContainer>
        <VCard class="shadow">
            <VDataTable :headers="headers" :items="$props.campaigns" class="text-center">
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title class="text-h5 text-left">{{ props.title }}</v-toolbar-title>
                    </v-toolbar>
                </template>
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
                <template v-slot:item.title="{ item }">
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
                </template>
                <template v-slot:bottom>
                    <div class="text-right pa-2">
                        <VBtn variant="text" class="text-none" appendIcon="mdi-chevron-right" :is="RouterLink"
                            :to="props.url">
                            {{ $t('button.viewall') }}</VBtn>
                    </div>
                </template>
            </VDataTable>
        </VCard>
    </VContainer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps(['campaigns', 'title', 'url', 'isLoading'])
import { useI18n } from "vue-i18n";

const i18n = useI18n();

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
    { title: '', key: "actions", sortable: false },
]

const getColor = (quota: number) => {
    if (quota < 1) return 'grey'
    else if (quota < 3) return 'red'
    else if (quota < 5) return 'orange'
    else return 'green'
};
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>