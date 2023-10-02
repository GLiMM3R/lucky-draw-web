<template>
    <div class="text-center">
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
                                <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none"
                                    :loading="isLoading">Confirm</v-btn>
                            </VForm>
                        </VContainer>
                    </VCardItem>
                </v-card>
            </v-dialog>
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import usePrize from '@/composables/usePrize';
import DropFile from '../DropFile.vue';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()
const { addPrize, getPrizes, isLoading } = usePrize();
const props = defineProps(['campaignId'])
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

            return 'Rank > 0!'
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
    await addPrize({ campaignId: props.campaignId, title: values.title, rank: values.rank, amount: values.amount, file: file.value })
    await getPrizes(props.campaignId)
    $toast.success('Create prize success!')
    handleReset();
    dialog.value = false
})


</script>