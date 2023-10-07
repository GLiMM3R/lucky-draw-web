<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        Start Random
    </v-btn>
    <v-dialog v-if="showResult" v-model="dialog" class="overlay" persistent scrollable width="900">
        <VCardTitle class="bg-primary py-2 rounded-pill w-50 mx-auto">
            <VCardTitle v-if="campaign" class="text-center text-h4 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
        </VCardTitle>
        <v-item-group v-if="campaign" mandatory v-model="selectedPrize">
            <v-container>
                <v-row :dense="true">
                    <v-col class="text-center" v-for="item, index in campaign.prizes" :key="index">
                        <v-item v-slot="{ isSelected, toggle }">
                            <v-btn size="large" variant="elevated" icon="mdi-calendar"
                                :color="!item.isDone ? 'primary' : 'white'" class="rounded-pill"
                                :class="item.isDone ? 'primary' : ''" @click="toggle">
                                <v-icon v-if="isSelected">mdi-check-bold</v-icon>
                                <v-icon v-else-if="item.isDone">mdi-check-bold</v-icon>
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
                <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">Exit</v-btn>
            </VCol>
            <VCol class="d-flex justify-center">
                <v-btn color="green-darken-1" rounded="lg" variant="elevated" @click="handleRandom"
                    :loading="isLoading">Start
                    Random</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
    <v-dialog v-else v-model="dialog" class="overlay" persistent scrollable width="900">
        <VCardTitle class="bg-primary py-2 rounded-pill w-50 mx-auto">
            <VCardTitle v-if="campaign" class="text-center text-h4 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
        </VCardTitle>
        <VImg v-if="!isCompleted" :src="Lottery" class="d-block mx-auto my-8" width="300" />
        <VRow v-else class="my-4 overflow-auto">
            <VCol v-for="winner in winners" :key="winner.id">
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
                <v-btn color="red" variant="flat" rounded="lg" @click="handleClose">Exit</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Lottery from '@/assets/images/lottery.png'
import Winner from '@/assets/images/winner.png'
import useRandom from '@/composables/useRandom';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useCampaign from '@/composables/useCampaign';
import { useWinnerStore } from '@/stores/winner';
import { storeToRefs } from 'pinia';
import { useCampaignStore } from '@/stores/campaign';
import WinnerTable from './WinnerTable.vue';

const route = useRoute();
const slug = route.params.slug as string

const winnerStore = useWinnerStore();
const campaignStore = useCampaignStore();
const { winners } = storeToRefs(winnerStore)
const { campaign } = storeToRefs(campaignStore)
const { getWinnerRecord, randomDraw, isLoading } = useRandom();
const { getCampaign } = useCampaign();

const dialog = ref(false)
const showResult = ref(true)
const isCompleted = ref(false)
const selectedPrize = ref(99)

await getCampaign(slug)

watch(() => selectedPrize.value, async () => {
    if (campaign.value?.prizes[selectedPrize.value].isDone) {
        await getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
    } else {
        winners.value = []
    }
})

const handleDialog = async () => {
    await getCampaign(slug)

    if (campaign.value?.prizes.length === 0) {
        alert('No prizes')
        return
    }
    if (!campaign.value?.file) {
        alert('No dataset')
        return
    }
    selectedPrize.value = campaign.value?.prizes.length - 1
    await getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)

    dialog.value = !dialog.value
}


const handleClose = () => {
    showResult.value = true
    isCompleted.value = false
}
const handleRandom = async () => {
    if (selectedPrize.value === null) {
        alert('Select prize first!');
        return;
    }
    if (campaign.value?.prizes[selectedPrize.value].isDone) {
        alert('Already random');
        return;
    }
    showResult.value = false
    await randomDraw({ campaignId: slug, prizeId: campaign.value?.prizes[selectedPrize.value].id as string })
    setTimeout(async () => {
        await getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
        await getCampaign(slug)
        isCompleted.value = true
    }, 3000);
}
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>