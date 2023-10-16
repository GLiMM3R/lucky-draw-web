<template>
    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
    <v-dialog v-model="dialog" activator="parent" width="400">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                {{ $t('modalTitle.editCampaign') }}
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField :label="$t('textfield.label.campaignName')" v-model="title.value.value"
                            :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                        <VTextField :label="$t('textfield.label.winningQuota')" v-model="prizeCap.value.value"
                            :disabled="isDisabled" :error-messages="prizeCap.errorMessage.value" type="number"
                            variant="outlined" rounded="lg" />
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4">{{ $t('button.confirm')
                        }}</v-btn>
                    </VForm>
                </VContainer>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'

const props = defineProps(['campaign', 'type'])
const emit = defineEmits(['handleUpdate'])
const dialog = ref(false)

const isDisabled = props.type !== 'random'

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.campaign.title,
        prizeCap: props.campaign.prizeCap
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        prizeCap(val: number) {
            if (val > 0) return true

            return 'Winning quota > 0!'
        }
    }
})

const title = useField('title')
const prizeCap = useField('prizeCap')


const submit = handleSubmit(async (values) => {
    emit('handleUpdate', { id: props.campaign.id, title: values.title, prizeCap: values.prizeCap })
    handleReset();
    dialog.value = false
})


</script>