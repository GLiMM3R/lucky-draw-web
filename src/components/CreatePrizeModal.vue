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
                                <VTextField label="Prize Amount" v-model="amount.value.value"
                                    :error-messages="amount.errorMessage.value" type="number" variant="outlined"
                                    rounded="lg" />
                                <DropFile @getImage="getImage" />
                                <v-btn color="primary" type="submit" rounded="lg" block class="my-4"
                                    :loading="props.isLoading">Confirm</v-btn>
                            </VForm>
                        </VContainer>
                    </VCardItem>
                </v-card>
            </v-dialog>
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useForm, useField } from 'vee-validate'
import usePrize from '@/composables/usePrize';
import DropFile from './DropFile.vue';

const { addPrize } = usePrize();

const dialog = ref(false)
const emit = defineEmits(['handleSubmit'])
const props = defineProps(['isLoading', 'campaignId'])

watchEffect(() => {
    if (!props.isLoading) {
        dialog.value = false
    }
})

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        amount(val: number) {
            if (val > 0) return true

            return 'Prize amount > 0!'
        }
    }
})

const title = useField('title')
const amount = useField('amount')
const file = ref<Object>();

const getImage = (value: File) => {
    console.log("🚀 ~ file: CreatePrizeModal.vue:70 ~ getImage ~ value:", value)
    file.value = value
}
const submit = handleSubmit(async (values) => {
    await addPrize({ campaignId: props.campaignId, title: values.title, amount: values.amount, file: file.value })
})


</script>