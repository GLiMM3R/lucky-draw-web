<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" prepend-icon='mdi-plus' class="text-none">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-if="showResult" v-model="dialog" class="overlay" persistent scrollable width="900">
        <VCard width="auto" class="bg-primary  rounded-lg">
            <VCardTitle v-if="campaign" class="text-center py-8 text-h3 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
        </VCard>
        <v-item-group v-if="campaign" mandatory v-model="selectedPrize">
            <v-container>
                <v-row :dense="true">
                    <v-col class="text-center" v-for="item, index in campaign.prizes" :key="index">
                        <v-item v-slot="{ isSelected, toggle }">
                            <VAvatar v-if="!item.isDone" @click="toggle" :size="isSelected ? 58 : 48"
                                :color="isSelected ? 'primary' : 'white'" style="cursor: pointer;">
                                <v-icon v-if="isSelected" :icon="isSelected ? 'mdi-check-bold' : ''" />
                                <div v-else>{{ item.rank }}</div>
                            </VAvatar>
                            <VAvatar v-else @click="toggle" :size="isSelected ? 58 : 48" style="cursor: pointer;"
                                :color="isSelected ? 'primary' : 'white'">
                                <div>
                                    <v-img :src="Winner" width="14" />
                                    <span>{{ item.rank }}</span>
                                </div>
                            </VAvatar>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <WinnerTable :winners="winners" />
        <VRow justify="center" no-gutters class="mt-8">
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" rounded="lg" class="text-none" @click="dialog = false">{{
                    $t('button.exit') }}</v-btn>
            </VCol>
            <VCol v-if="campaign?.prizes[selectedPrize].isDone === false" class="d-flex justify-center">
                <v-btn color="green-darken-1" rounded="lg" variant="elevated" class="text-none" @click="handleRandom"
                    :loading="isLoading">{{
                        $t('button.startRandom') }}</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
    <v-dialog v-else-if="errorMessage" v-model="dialog" class="overlay" persistent scrollable width="600">
        <VCard class="my-4">
            <VCardTitle class="text-center my-8">{{ errorMessage }}</VCardTitle>
            <VCardActions>
                <VSpacer />
                <v-btn color="red" variant="flat" rounded="lg" @click="handleClose" class="text-none">{{
                    $t('button.exit')
                }}</v-btn>
                <VSpacer />
            </VCardActions>
        </VCard>
        <VRow justify="center" no-gutters>
            <VCol class="d-flex justify-center">
            </VCol>
        </VRow>
    </v-dialog>
    <v-dialog v-else v-model="dialog" class="overlay" persistent scrollable width="900">
        <Confetti v-if="visible" />
        <!-- <VCard width="auto" class="bg-primary rounded-lg">
            <VCardTitle v-if="campaign" class="text-center py-8 text-h3 font-weight-bold">
                {{ campaign.prizes[selectedPrize].title }}
            </VCardTitle>
        </VCard> -->
        <VImg v-if="!isCompleted" :src="loadingImage ? loadingImage : Random" class="d-block mx-auto my-8 rounded-xl"
            width="600px" height="600px" />
        <VRow v-else justify="center" class="overflow-auto my-4">
            <VCol v-for="winner in winners" :key="winner.id" cols="6">
                <VCard>
                    <VCardItem class="d-flex justify-center">
                        <VAvatar size="80">
                            <VImg :src="prizeImage ?? Winner" width="50" />
                        </VAvatar>
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
        <VRow v-if="isCompleted" justify="center" no-gutters>
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" rounded="lg" @click="handleClose" class="text-none">{{ $t('button.exit')
                }}</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
import Confetti from '@/components/Confetti.vue'
import { nextTick } from 'vue';
import { useAppSettingStore } from '@/stores/appsetting';

const i18n = useI18n();
const $toast = useToast()
const route = useRoute();
const slug = route.params.slug as string

const appSettingStore = useAppSettingStore();
const campaignStore = useCampaignStore();
const drawStore = useDrawStore();
const { campaign } = storeToRefs(campaignStore)
const { isLoading, winners, errorMessage } = storeToRefs(drawStore)
const { getImage } = useImage();

const dialog = ref(false)
const showResult = ref(true)
const isCompleted = ref(false)
const selectedPrize = ref(99)
const prizeImage = ref(null);
const loadingImage = ref('');

await campaignStore.getCampaignBySlug(slug)

watch(() => selectedPrize.value, async () => {
    if (campaign.value?.prizes[selectedPrize.value].isDone) {
        await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
    } else {
        winners.value = []
    }
})

const visible = ref(false);

const explode = async () => {
    visible.value = false;
    await nextTick();
    visible.value = true;
};

const handleDialog = async () => {
    await campaignStore.getCampaignBySlug(slug)
    const appsetting = await appSettingStore.getAppSetting();

    if (appsetting && appsetting.randomImage) {
        loadingImage.value = await getImage(appsetting.randomImage)
    }

    if (campaign.value?.prizes.length === 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return
    }
    if (!campaign.value?.file) {
        $toast.warning(i18n.t('alert.selectCoupon'))
        return
    }

    selectedPrize.value = campaign.value?.prizes.length - 1
    dialog.value = !dialog.value

    if (campaign.value.isDone) {
        await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
    }
}

const handleClose = () => {
    errorMessage.value = ''
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
    await drawStore.randomDraw({ campaignSlug: slug, prizeId: campaign.value?.prizes[selectedPrize.value].id as string })
    if (!errorMessage.value) {
        setTimeout(async () => {
            await drawStore.getWinnerRecord(slug, campaign.value?.prizes[selectedPrize.value].id as string)
            await campaignStore.getCampaignBySlug(slug)
            if (campaign.value?.prizes[selectedPrize.value].image) {
                prizeImage.value = await getImage(campaign.value?.prizes[selectedPrize.value].image as string)
            };
            isCompleted.value = true
            await explode();
        }, 3000);
    }
}
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 1);
}

.element-wrapper {
    position: relative;
}

.element {
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateX(50%);
}
</style>