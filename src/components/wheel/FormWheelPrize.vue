<template>
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ props }">
            <VBtn v-if="$props.prize" v-bind="props" rounded="pill" size="small" variant="text" icon="mdi-dots-vertical"
                class="text-none mt-2 ml-4">
            </VBtn>
            <VBtn v-else v-bind="props" rounded="lg" prepend-icon='mdi-plus' class="text-none mt-2 ml-4">{{
                $t('button.createPrize') }}
            </VBtn>
        </template>
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                {{ $t('modalTitle.createPrize') }}
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField :label="$t('textfield.label.prizeName')" v-model="title.value.value" autofocus
                            :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" class="mb-4" />
                        <VTextField :label="$t('textfield.label.prizeAmount')" v-model="amount.value.value"
                            :error-messages="amount.errorMessage.value" type="number" variant="outlined" rounded="lg"
                            class="mb-4" />
                        <Suspense>
                            <UploadImage @handleGetImage="getImage" :image="props.prize?.image" :isRounded="false"
                                :title="$t('uploadFile.chooseFile')" :description="$t('uploadFile.dropFile')" />
                        </Suspense>
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none"
                            :loading="isLoading">{{
                                $t('button.confirm') }}</v-btn>
                    </VForm>
                </VContainer>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { useWheelPrizeStore } from '@/stores/wheelPrize';
import UploadImage from '@/components/UploadImage.vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const i18n = useI18n()
const route = useRoute();
const slug = route.params.slug as string

const props = defineProps(['prize'])

const wheelPrizeStore = useWheelPrizeStore();
const { isLoading } = storeToRefs(wheelPrizeStore)

const dialog = ref(false)
const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.prize?.title ?? '',
        amount: props.prize?.amount ?? 1,
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length < 3) return i18n.t('validate.campaignTitle')

            return true
        },
        amount(val: number) {
            if (val < 1) return i18n.t('validate.prizeAmount')

            return true
        }
    }
})

const title = useField('title')
const amount = useField('amount')

const getImage = (value: File) => {
    file.value = value
}

const submit = handleSubmit(async (values) => {
    if (props.prize) {
        await wheelPrizeStore.updateWheelPrize(props.prize.id, { slug: slug, title: values.title, amount: values.amount, image: file.value })
        await wheelPrizeStore.fetchWheelPrizeBySlug(slug)
    } else {
        await wheelPrizeStore.addWheelPrize({ slug: slug, title: values.title.trim(), amount: values.amount, image: file.value })
        await wheelPrizeStore.fetchWheelPrizeBySlug(slug)
    }
    handleReset();
    dialog.value = false
})

</script>