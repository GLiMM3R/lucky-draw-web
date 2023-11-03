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
                <v-card-title style="text-align: center">
                    {{ $t('modalTitle.createPrize') }}
                </v-card-title>
                <VCardItem>
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField :label="$t('textfield.label.prizeName')" v-model="title.value.value"
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" class="mb-4" />
                            <VTextField :label="$t('textfield.label.prizeRank')" v-model="rank.value.value"
                                :error-messages="rank.errorMessage.value" type="number" variant="outlined" rounded="lg"
                                class="mb-4" />
                            <VTextField :label="$t('textfield.label.prizeAmount')" v-model="amount.value.value"
                                :error-messages="amount.errorMessage.value" type="number" variant="outlined" rounded="lg"
                                class="mb-4" />
                            <Suspense>
                                <UploadImage @getImage="getImage" :image="props.prize?.image" :isRounded="false" />
                            </Suspense>

                            <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none">{{
                                $t('button.confirm') }}</v-btn>
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
import { useRandomPrizeStore } from '@/stores/randomPrize';
import { useRandomStore } from '@/stores/random';

const route = useRoute();
const slug = route.params.slug as string

const props = defineProps(['prize'])

const randomPrizeStore = useRandomPrizeStore();
const randomStore = useRandomStore();
const { randomPrizes } = storeToRefs(randomPrizeStore);

const dialog = ref(false)
const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.prize?.title ?? '',
        rank: props.prize?.rank ?? '',
        amount: props.prize?.amount ?? '',
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true
            return 'Title is required!'
        },
        rank(val: number) {
            if (!val || val < 0) return 'Value must greater than 0'

            if (randomPrizes.value.filter((item: any) => Number(item.rank) == val).length > 0) return 'Already exists'
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
        await randomPrizeStore.updateRandomPrize(props.prize.id, { randomSlug: slug, title: values.title, rank: values.rank, amount: values.amount, file: file.value })
        await randomPrizeStore.fetchRandomPrizeBySlug(slug)
    } else {
        await randomPrizeStore.addRandomPrize({ randomSlug: slug, title: values.title.trim(), rank: values.rank, amount: values.amount, file: file.value })
        await randomPrizeStore.fetchRandomPrizeBySlug(slug)
    }
    handleReset();
})

</script>@/stores/draw@/stores/drawPrize