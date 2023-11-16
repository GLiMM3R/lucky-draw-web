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
        <template v-slot:default="{ isActive }">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="isActive.value = false"></VBtn>
                </template>
                <v-card-title v-if="props.prize" style="text-align: center">
                    {{ $t('modalTitle.editPrize') }}
                </v-card-title>
                <v-card-title v-else style="text-align: center">
                    {{ $t('modalTitle.createPrize') }}
                </v-card-title>
                <VCardItem>
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField :label="$t('textfield.label.prizeName')" v-model="title.value.value"
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" autofocus
                                class="mb-4" />
                            <VTextField :label="$t('textfield.label.prizeRank')" v-model="rank.value.value"
                                :error-messages="rank.errorMessage.value" type="number" variant="outlined" rounded="lg"
                                class="mb-4" />
                            <VTextField :label="$t('textfield.label.prizeAmount')" v-model="amount.value.value"
                                :error-messages="amount.errorMessage.value" type="number" variant="outlined" rounded="lg"
                                class="mb-4" />
                            <Suspense>
                                <UploadImage @handleGetImage="getImage" :image="props.prize?.image" :isRounded="false"
                                    :title="$t('uploadFile.chooseFile')" :description="$t('uploadFile.dropFile')" />
                            </Suspense>
                            <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none"
                                :loading="isLoading">{{ $t('button.confirm') }}</v-btn>
                        </VForm>
                    </VContainer>
                </VCardItem>
            </v-card>
        </template>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import UploadImage from '@/components/UploadImage.vue';
import { useDrawPrizeStore } from '@/stores/drawPrize';

const route = useRoute();
const slug = route.params.slug as string

const props = defineProps(['prize'])

const drawPrizeStore = useDrawPrizeStore();
const { drawPrizes, isLoading } = storeToRefs(drawPrizeStore);

const dialog = ref(false)
const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.prize?.title ?? '',
        rank: props.prize?.rank ?? 0,
        amount: props.prize?.amount ?? 0,
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true
            return 'Title is required!'
        },
        rank(val: number) {
            if (!val || val < 0) return 'Value must greater than 0'

            if (Number(props.prize?.rank) != val) {
                if (drawPrizes.value.filter((item: any) => Number(item.rank) == val).length > 0) return 'Already exists'
            }

            return true
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
    if (props.prize) {
        await drawPrizeStore.updateDrawPrize(props.prize.id, { slug: slug, title: values.title, rank: values.rank, amount: values.amount, image: file.value })
    } else {
        await drawPrizeStore.addDrawPrize({ slug: slug, title: values.title.trim(), rank: values.rank, amount: values.amount, image: file.value })
    }
    await drawPrizeStore.fetchDrawPrizeBySlug(slug)
    handleReset();
    dialog.value = false
})

</script>