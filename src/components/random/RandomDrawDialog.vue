<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" prepend-icon='mdi-plus' class="text-none">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-if="showResult" v-model="dialog" class="overlay" persistent scrollable width="900">
        <VCard width="auto" class="bg-primary py-4 rounded-pill w-75 mx-auto">
            <!-- <div class="d-flex flex-no-wrap justify-space-between align-center px-4"> -->
            <!-- <div> -->
            <VCardTitle v-if="campaign" class="text-center text-h4 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
            <!-- </div> -->
            <!-- <v-avatar class="ma-1" size="80" rounded="pill">
                    <VImg :src="prizeImage" />
                </v-avatar> -->
            <!-- </div> -->
        </VCard>
        <v-item-group v-if="campaign" mandatory v-model="selectedPrize">
            <v-container>
                <v-row :dense="true">
                    <v-col class="text-center" v-for="item, index in campaign.prizes" :key="index">
                        <v-item v-slot="{ isSelected, toggle }">
                            <v-btn size="large" variant="elevated" icon="mdi-calendar"
                                :color="item.isDone ? 'primary' : 'white'" class="rounded-pill white" @click="toggle">
                                <v-icon v-if="isSelected">mdi-check-bold</v-icon>
                                <!-- <v-icon v-else-if="item.isDone">mdi-check-bold</v-icon> -->
                                <div v-else>{{ index + 1 }}</div>
                            </v-btn>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <WinnerTable :winners="winners" />
        <VRow justify="center" no-gutters class="mt-8">
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">{{ $t('button.exit') }}</v-btn>
            </VCol>
            <VCol class="d-flex justify-center">
                <v-btn color="green-darken-1" rounded="lg" variant="elevated" @click="handleRandom" :loading="isLoading">{{
                    $t('button.startRandom') }}</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
    <v-dialog v-else v-model="dialog" class="overlay" persistent scrollable width="900">
        <VCardTitle class="bg-primary py-2 rounded-pill w-50 mx-auto">
            <VCardTitle v-if="campaign" class="text-center text-h4 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
        </VCardTitle>
        <VImg v-if="!isCompleted" :src="Random" class="d-block mx-auto my-8 rounded-xl" width="600px" />
        <VRow v-else class="my-4 overflow-auto" justify="center">
            <VCol v-for="winner in winners" :key="winner.id" cols="4">
                <VCard>
                    <VCardItem class="d-flex justify-center">
                        <VImg :src="Winner" width="50" />
                    </VCardItem>
                    <VCardTitle class="text-center">
                        {{ winner.winnerName }}
                    </VCardTitle>
                    <VCardTitle class="text-center text-h4 font-weight-bold">
                        {{ winner.winnerPhone.slice(0, -2) + 'XX' }}
                    </VCardTitle>
                </VCard>
            </VCol>
        </VRow>
        <VRow justify="center" no-gutters>
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" rounded="lg" @click="handleClose">{{ $t('button.exit') }}</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Lottery from '@/assets/images/lottery.png'
import Winner from '@/assets/images/winner.png'
import Random from '@/assets/images/random2.gif'
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCampaignStore } from '@/stores/campaign';
import WinnerTable from './WinnerTable.vue';
import { useDrawStore } from '@/stores/draw';
import { useToast } from 'vue-toast-notification';
import { useI18n } from "vue-i18n";
import useImage from '@/composables/useImage';

const i18n = useI18n();
const $toast = useToast()
const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const drawStore = useDrawStore();
const { campaign } = storeToRefs(campaignStore)
const { isLoading, winners } = storeToRefs(drawStore)
const { getImage } = useImage();

const dialog = ref(false)
const showResult = ref(true)
const isCompleted = ref(false)
const selectedPrize = ref(99)
const prizeImage = ref('');



await campaignStore.getCampaign(slug)

watch(() => selectedPrize.value, async () => {
    if (campaign.value?.prizes[selectedPrize.value].isDone) {
        await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
        if (campaign.value?.prizes[selectedPrize.value].image) {
            prizeImage.value = await getImage(campaign.value?.prizes[selectedPrize.value].image as string)
        }
    } else {
        winners.value = []
    }
})

const handleDialog = async () => {
    await campaignStore.getCampaign(slug)

    if (campaign.value?.prizes.length === 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return
    }
    if (!campaign.value?.file) {
        $toast.warning(i18n.t('alert.selectCoupon'))
        return
    }
    selectedPrize.value = campaign.value?.prizes.length - 1
    await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)

    dialog.value = !dialog.value
}


const handleClose = () => {
    showResult.value = true
    isCompleted.value = false
}
const handleRandom = async () => {
    if (selectedPrize.value === null) {
        $toast.warning(i18n.t('alert.noPrize'))
        return;
    }
    if (campaign.value?.prizes[selectedPrize.value].isDone) {
        alert(i18n.t('alert.alreadyRandom'))
        return;
    }
    showResult.value = false
    await drawStore.randomDraw({ campaignId: slug, prizeId: campaign.value?.prizes[selectedPrize.value].id as string })
    await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
    await campaignStore.getCampaign(slug)
    isCompleted.value = true
}
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>