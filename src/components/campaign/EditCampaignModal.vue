<template>
    <v-dialog width="400">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" size="small" variant="text" class="text-none">
                Edit Campaign</v-list-item>
            <!-- <v-btn v-bind="props" size="small" variant="text">Edit Campaign</v-btn> -->
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="isActive.value = false"></VBtn>
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
                                variant="outlined" rounded="lg" class="my-4" />
                            <v-btn color="primary" type="submit" rounded="lg" block class="my-4" :loading="isLoading">{{
                                $t('button.confirm')
                            }}</v-btn>
                        </VForm>
                    </VContainer>
                </VCardItem>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from 'vee-validate'
import { useCampaignStore } from '@/stores/campaign';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const props = defineProps(['campaign', 'type'])
const emit = defineEmits(['handleUpdate'])
const campaignStore = useCampaignStore();
const { isLoading } = storeToRefs(campaignStore);
const dialog = ref(false)

const isDisabled = props.type !== 'random'

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.campaign.title,
        prizeCap: props.campaign.prizeCap
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length < 0) return i18n.t('validate.campaignTitle')

            return true
        },
        prizeCap(val: number) {
            if (val < 0) return i18n.t('validate.prizeCap')

            return true
        }
    }
})

const title = useField('title')
const prizeCap = useField('prizeCap')


const submit = handleSubmit(async (values) => {
    await campaignStore.updateCampaign({ id: props.campaign.id, title: values.title.trim(), prizeCap: Number(values.prizeCap) })
    handleReset();
    dialog.value = false
})


</script>