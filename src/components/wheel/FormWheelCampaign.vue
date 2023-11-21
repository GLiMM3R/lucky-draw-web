<template>
    <!-- <VBtn rounded="lg" prepend-icon='mdi-plus' class="text-none mt-2 ml-4">{{ $t('button.newCampaign') }}
    </VBtn>
    <v-dialog v-model="dialog" activator="parent" width="400"> -->
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ props }">
            <VListItem v-if="$props.campaign" v-bind="props">
                {{ $t('button.campaignSetting') }}
            </VListItem>
            <VBtn v-else v-bind="props" rounded="lg" prepend-icon='mdi-plus' class="text-none mt-2 ml-4">{{
                $t('button.newCampaign') }}
            </VBtn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="isActive.value = false"></VBtn>
                </template>
                <v-card-title style="text-align: center">
                    {{ $t('modalTitle.createCampaign') }}
                </v-card-title>
                <VCardItem>
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField :label="$t('textfield.label.campaignName')" v-model="title.value.value" autofocus
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                            <p>Base Icon</p>
                            <Suspense>
                                <UploadImage @handleGetImage="getBaseIcon" @handleRemove="removeBaseIcon"
                                    :title="$t('uploadFile.chooseFile')" :description="$t('uploadFile.dropFile')"
                                    :image="props.campaign?.baseIcon" />
                            </Suspense>
                            <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none"
                                :loading="isLoading">{{
                                    $t('button.confirm') }}</v-btn>
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
import { useI18n } from "vue-i18n";
import { storeToRefs } from 'pinia';
import { useWheelStore } from '@/stores/wheel';
import UploadImage from '../UploadImage.vue';

const props = defineProps(['campaign'])

const i18n = useI18n();
const dialog = ref(false)
const baseIcon = ref()

const wheelStore = useWheelStore()
const { wheels, isLoading } = storeToRefs(wheelStore)

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.campaign?.title ?? '',
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length < 0) return i18n.t('validate.campaignTitle')

            if (props.campaign?.title !== val) {
                if (wheels.value.filter((item: any) => item.title === val?.trim()).length > 0) return i18n.t('validate.campaignExist')
            }

            return true
        },
    }
})

const title = useField('title')

const getBaseIcon = (value: File) => {
    baseIcon.value = value
}

const removeBaseIcon = async () => {
    if (props.campaign.id) {
        await wheelStore.removeBaseIcon(props.campaign.id)
    }
}

const submit = handleSubmit(async (values) => {
    if (props.campaign) {
        await wheelStore.updateWheel({ id: props.campaign.id, title: values.title.trim(), baseIcon: baseIcon.value })
        await wheelStore.fetchWheels();
    } else {
        await wheelStore.addWheel({ title: values.title.trim(), baseIcon: baseIcon.value });
        await wheelStore.fetchWheels();
    }
    handleReset();
    dialog.value = false
})
</script>