<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        Start Random
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" persistent width="800">
        <div class="d-flex flex-column justify-center">
            <VCard class="bg-primary py-2" rounded="pill">
                <VCardTitle class="text-center text-h4 font-weight-bold">
                    Prize {{ selectedPrize + 1 }}
                </VCardTitle>
                <VCardSubtitle v-if="campaign" class="text-center text-h5">
                    {{ campaign.prizes[selectedPrize].title }}
                </VCardSubtitle>
            </VCard>
            <v-item-group v-if="campaign" mandatory v-model="selectedPrize">
                <v-container>
                    <v-row :dense="true">
                        <v-col class="text-center" v-for="item, index in campaign.prizes" :key="item.id">
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
            <VImg v-if="!campaign.prizes[selectedPrize].isDone" :src="Lottery" class="d-block mx-auto w-50 my-8" />
            <VRow v-else class="my-4">
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
                    <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">Exit</v-btn>
                </VCol>
                <VCol class="d-flex justify-center">
                    <v-btn color="green-darken-1" rounded="lg" variant="elevated" @click="handleRandom"
                        :loading="isLoading">Start
                        Random</v-btn>
                </VCol>
            </VRow>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Lottery from '@/assets/images/lottery.png'
import Winner from '@/assets/images/winner.png'
import useRandom from '@/composables/useRandom';
import useWinner from '@/composables/useWinner';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useCampaign from '@/composables/useCampaign';
import { watchEffect } from 'vue';

// const props = defineProps(['campaign'])
const { randomDraw, isLoading } = useRandom();
const { winners, getWinnerRecord } = useWinner()
const dialog = ref(false)
const selectedPrize = ref(99)
const route = useRoute();
const { campaign, getCampaign } = useCampaign();
const slug = route.params.slug as string

await getCampaign(slug)

watch(() => selectedPrize.value, async () => {
    if (campaign.value.prizes[selectedPrize.value].isDone) {
        await getWinnerRecord(campaign.value.id, campaign.value.prizes[selectedPrize.value].id)
    } else {
        winners.value = [];
    }
})

watchEffect(() => winners.value)

const handleDialog = async () => {
    await getCampaign(slug)

    if (campaign.value.prizes.length === 0) {
        alert('No prizes')
        return
    }
    if (!campaign.value.file) {
        alert('No dataset')
        return
    }
    selectedPrize.value = campaign.value?.prizes.length - 1
    dialog.value = !dialog.value
}

const handleRandom = async () => {
    if (selectedPrize.value === null) {
        alert('Select prize first!');
        return;
    }
    winners.value = await randomDraw({ campaignId: slug, prizeId: campaign.value.prizes[selectedPrize.value].id as string })
    await getCampaign(slug)
}

</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>