<template>
    <v-btn variant="outlined" rounded="lg" class="text-none"> + Create Prize
        <v-dialog v-model="dialog" activator="parent" width="400">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
                </template>
                <v-card-title style="text-align: center">
                    Create Prize
                </v-card-title>
                <VCardItem>
                    <VContainer>
                        <VForm @submit.prevent="submit">
                            <VTextField label="Prize Name" v-model="title.value.value"
                                :error-messages="title.errorMessage.value" variant="outlined" rounded="lg" />
                            <VTextField label="Rank" v-model="rank.value.value" :error-messages="rank.errorMessage.value"
                                type="number" variant="outlined" rounded="lg" />
                            <VTextField label="Prize Amount" v-model="amount.value.value"
                                :error-messages="amount.errorMessage.value" type="number" variant="outlined" rounded="lg" />
                            <DropFile @getImage="getImage" />
                            <v-btn color="primary" type="submit" rounded="lg" block class="my-4 text-none">Confirm</v-btn>
                        </VForm>
                    </VContainer>
                </VCardItem>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import DropFile from './DropFile.vue';
import usePrize from '@/composables/usePrize';
import useCampaign from '@/composables/useCampaign';
import { useRoute } from 'vue-router';
import { usePrizeStore } from '@/stores/prize';
import { storeToRefs } from 'pinia';
import { useCampaignStore } from '@/stores/campaign';

const route = useRoute();
const slug = route.params.slug as string

const prizeStore = usePrizeStore();
const campaignStore = useCampaignStore();
const { campaign } = storeToRefs(campaignStore);
const { getCampaign } = useCampaign();
const { addPrize } = usePrize();

const dialog = ref(false)
const file = ref<File>();

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        title(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        rank(val: number) {
            if (val < 0) return 'Value must greater than 0'
            let prizes: any = []
            if (campaign.value?.prizes) {
                prizes = campaign.value.prizes
            }
            if (prizes.filter((item: any) => Number(item.rank) == val).length > 0) return 'Already exists'

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
    await addPrize({ campaignId: slug, title: values.title, rank: values.rank, amount: values.amount, file: values.file })
    await getCampaign(slug)
    handleReset();
    dialog.value = false
})

</script>