<template>
    <VBtn rounded="lg" prepend-icon='mdi-plus' class="text-none mt-2 ml-4">{{ $t('button.newCampaign') }}
    </VBtn>
    <v-dialog v-model="dialog" activator="parent" width="400">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                {{ $t('modalTitle.createCampaign') }}
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField :label="$t('textfield.label.campaignName')" v-model="title.value.value"
                            :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                        <VTextField :label="$t('textfield.label.winningQuota')" v-model="prizeCap.value.value"
                            :disabled="isDisabled" :error-messages="prizeCap.errorMessage.value" type="number"
                            variant="outlined" rounded="lg" />
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none"
                            :loading="props.isLoading">{{
                                $t('button.confirm') }}</v-btn>
                    </VForm>
                </VContainer>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import { useI18n } from "vue-i18n";
import { computed } from 'vue';

const i18n = useI18n();
const props = defineProps(['isLoading', 'type'])
const emit = defineEmits(['handleSubmit'])
const dialog = ref(false)

const isDisabled = computed(() => props.type !== 'random')

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        prizeCap: 1
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return i18n.t('validate.campaignTitle')
        },
        prizeCap(val: number) {
            if (val > 0) return true

            return i18n.t('validate.prizeCap')
        }
    }
})

const title = useField('title')
const prizeCap = useField('prizeCap')

const submit = handleSubmit(async (values) => {
    emit('handleSubmit', values)
    handleReset();
    dialog.value = false
})


</script>