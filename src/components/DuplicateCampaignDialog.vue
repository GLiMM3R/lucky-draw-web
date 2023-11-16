<template>
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ props }">
            <v-list-item v-if="$props.buttonText" v-bind="props" size="small" variant="text" :color="$props.color"
                class="text-none">{{
                    $props.buttonText
                }}</v-list-item>
            <v-btn v-else v-bind="props" size="small" variant="text" :icon="$props.icon" :color="$props.color"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="isActive.value = false"></VBtn>
                </template>
                <v-card-title class="text-center font-weight-bold">
                    {{ $t('modalTitle.duplicateCampaign') }}
                </v-card-title>
                <v-card-item class="pa-1">
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField :label="$t('textfield.label.campaignName')" v-model="title.value.value"
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                            <v-btn class="text-none" type="submit" color="primary" block variant="elevated" rounded="lg">
                                {{ $t('button.confirm') }}
                            </v-btn>
                        </VForm>
                    </VContainer>
                </v-card-item>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const dialog = ref(false)

const props = defineProps(['icon', 'color', 'buttonText', 'campaign'])
const emit = defineEmits(['handleConfirm'])

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true
            return i18n.t('validate.campaignTitle')
        },
    }
})

const title = useField('title')

const submit = handleSubmit(async (values) => {
    emit('handleConfirm', { id: props.campaign.id, title: values.title })
    handleReset();
    dialog.value = false
})
</script>