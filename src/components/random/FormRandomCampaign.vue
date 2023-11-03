<template>
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
                <v-card-title v-if="$props.campaign" style="text-align: center">
                    {{ $t('modalTitle.editCampaign') }}
                </v-card-title>
                <v-card-title v-else style="text-align: center">
                    {{ $t('modalTitle.createCampaign') }}
                </v-card-title>
                <VCardItem>
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField :label="$t('textfield.label.campaignName')" v-model="title.value.value"
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                            <VTextField :label="$t('textfield.label.winningQuota')" v-model="prizeCap.value.value"
                                :error-messages="prizeCap.errorMessage.value" type="number" variant="outlined" rounded="lg"
                                class="my-4" />
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
import { useDrawStore } from '@/stores/draw';

const props = defineProps(['campaign'])

const i18n = useI18n();
const dialog = ref(false)

const drawStore = useDrawStore()
const { isLoading } = storeToRefs(drawStore)

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.campaign?.title ?? '',
        prizeCap: props.campaign?.prizeCap ?? 1,
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length < 0) return i18n.t('validate.campaignTitle')
            return true
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
    if (props.campaign) {
        await drawStore.updateDraw({ id: props.campaign.id, title: values.title.trim(), prizeCap: Number(values.prizeCap) })
        await drawStore.fetchDraws();
    } else {
        await drawStore.addDraw({ title: values.title.trim(), prizeCap: Number(values.prizeCap) });
        await drawStore.fetchDraws();
    }
    handleReset();
    dialog.value = false
})
</script>@/stores/draw