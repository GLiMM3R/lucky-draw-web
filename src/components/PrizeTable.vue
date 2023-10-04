<template>
    <div class="dataset-header">
        <h2 class="title">Prize Tier</h2>
        <div>
            <VBtn rounded="lg" variant="outlined" class="text-none">+ Create Prize
                <v-dialog v-model="dialog" activator="parent" width="400">
                    <v-card>
                        <template v-slot:append>
                            <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
                        </template>
                        <v-card-title style="text-align: center">
                            Create Prize
                        </v-card-title>
                        <VCardItem>
                            <VContainer>
                                <VForm @submit.prevent="submit">
                                    <VTextField label="Prize Name" v-model="title.value.value"
                                        :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                                    <VTextField label="Rank" v-model="rank.value.value"
                                        :error-messages="rank.errorMessage.value" type="number" variant="outlined"
                                        rounded="lg" />
                                    <VTextField label="Prize Amount" v-model="amount.value.value"
                                        :error-messages="amount.errorMessage.value" type="number" variant="outlined"
                                        rounded="lg" />
                                    <DropFile @getImage="getImage" />
                                    <v-btn color="primary" type="submit" rounded="lg" block
                                        class="my-4 text-none">Confirm</v-btn>
                                </VForm>
                            </VContainer>
                        </VCardItem>
                    </v-card>
                </v-dialog>
            </VBtn>
        </div>
    </div>
    <VCard rounded="lg" color="white" elevation="1">
        <VDataTable :headers="prizeHeaders" :items="props.campaign?.prizes">
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
            <template v-slot:item="{ item }">
                <tr v-if="props.campaign">
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
                        <VChip rounded="sm" :color="getColor(item.columns.amount)">
                            {{ item.columns.amount }}
                        </VChip>
                    </td>
                    <td style="border-bottom: none; text-align: center;">
                        <VChip v-if="item.columns.isDone" rounded="sm" :color="getColor(item.columns.prizeCap)">
                            {{ item.columns.isDone ? 'Complete' : '' }}
                        </VChip>
                    </td>
                    <td style="border-bottom: none; text-align: center;">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" @click="() => { }" />
                        <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="4" class="text-center">No dataset</td>
                </tr>
            </template>
        </VDataTable>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import DropFile from './DropFile.vue';

const props = defineProps(['campaign'])
const emit = defineEmits(['handleSumitPrize'])

const dialog = ref(false)

const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        rank(val: number) {
            if (val > 0) return true
            return 'Rank must greater than 0'
        },
        amount(val: number) {
            if (val > 0) return true

            return 'Prize amount > 0!'
        }
    }
})

const title = useField('title')
const rank = useField('rank')
const amount = useField('amount')

const getImage = (value: File) => {
    file.value = value
}

const submit = handleSubmit(async (values) => {
    emit('handleSumitPrize', { title: values.title, rank: values.rank, amount: values.amount, file: file.value })
    handleReset();
    dialog.value = false
})

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
    {
        key: 'isDone',
        title: 'Status'
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