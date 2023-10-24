<template>
    <v-btn size="small" variant="text" icon="mdi-dots-vertical">
    </v-btn>
    <v-dialog v-model="dialog" activator="parent" width="400">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                {{ $t('modalTitle.editPrize') }}
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField :label="$t('textfield.label.prizeName')" v-model="title.value.value"
                            :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                        <VTextField :label="$t('textfield.label.prizeRank')" v-model="rank.value.value"
                            :error-messages="rank.errorMessage.value" type="number" variant="outlined" rounded="lg" />
                        <VTextField :label="$t('textfield.label.prizeAmount')" v-model="amount.value.value"
                            :error-messages="amount.errorMessage.value" type="number" variant="outlined" rounded="lg" />
                        <Suspense>
                            <!-- <DropFile @getImage="getImage" :image="props.prize.image" /> -->
                            <UploadImage @getImage="getImage" :image="props.prize.image" :isRounded="false" />
                        </Suspense>
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none">{{
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
import { usePrizeStore } from '@/stores/prize';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCampaignStore } from '@/stores/campaign';
import UploadImage from '@/components/UploadImage.vue';

const route = useRoute();
const slug = route.params.slug as string

const props = defineProps(['prize'])
const campaignStore = useCampaignStore();
const prizeStore = usePrizeStore();
const { prizes } = storeToRefs(prizeStore)
const dialog = ref(false)
const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        title: props.prize.title,
        rank: props.prize.rank,
        amount: props.prize.amount
    },
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        rank(val: number) {
            if (!val || val < 0) return 'Value must greater than 0'
            if (props.prize.rank != val && prizes.value.filter((item: any) => Number(item.rank) == val).length > 0) return 'Already exists'

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
    await prizeStore.updatePrize(props.prize.id, { campaignSlug: slug, title: values.title, rank: values.rank, amount: values.amount, file: file.value })
    handleReset();
    dialog.value = false
})

</script>