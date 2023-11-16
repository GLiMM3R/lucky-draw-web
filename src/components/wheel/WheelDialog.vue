<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none" :loading="isLoading">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-model="dialog" persistent class="overlay" width="800">
        <VRow justify="center" v-if="!result">
            <VCol class="d-flex flex-column">
                <VCard class="bg-primary rounded-lg d-flex justify-center align-center py-4 mb-8">
                    <VCardTitle v-if="wheelPrizes" class="text-center text-h4 font-weight-bold">
                        {{ capitalizeLetter(props.campaign.title) }}
                    </VCardTitle>
                </VCard>
                <VRow justify="center">
                    <Roulette v-if="wheelActive" ref="wheelComponent" :items="items"
                        :first-item-index="wheelData.firstItemIndex"
                        :centered-indicator="wheelData.wheelSettings.centeredIndicator"
                        :indicator-position="wheelData.wheelSettings.indicatorPosition" :size="height * 0.7"
                        :display-shadow="wheelData.wheelSettings.displayShadow"
                        :display-border="wheelData.wheelSettings.displayBorder"
                        :display-indicator="wheelData.wheelSettings.displayIndicator"
                        :duration="wheelData.wheelSettings.duration"
                        :result-variation="wheelData.wheelSettings.resultVariation" :easing="wheelData.wheelSettings.easing"
                        :counter-clockwise="wheelData.wheelSettings.counterClockwise"
                        :horizontal-content="wheelData.wheelSettings.horizontalContent"
                        :base-display="wheelData.wheelSettings.baseDisplay" :base-size="wheelData.wheelSettings.baseSize"
                        :base-display-indicator="wheelData.wheelSettings.baseDisplayIndicator"
                        :base-display-shadow="wheelData.wheelSettings.baseDisplayShadow"
                        :base-background="wheelData.wheelSettings.baseBackground" @click="launchWheel"
                        @wheel-start="wheelStartedCallback" @wheel-end="wheelEndedCallback">
                        <template #baseContent>
                            <!-- <div v-if="wheelData.wheelSettings.baseHtmlContent"
                                v-html="wheelData.wheelSettings.baseHtmlContent" /> -->
                            <VImg v-if="baseIcon" :src="baseIcon" cover width="100%" />
                            <strong v-else>Go!</strong>
                        </template>
                    </Roulette>
                </VRow>
                <VRow justify="center" class="mt-8">
                    <v-btn color="red" variant="flat" width="160" rounded="lg" @click="closeDialog">{{ $t('button.exit')
                    }}</v-btn>
                </VRow>
            </VCol>
        </VRow>
        <VRow justify="center" class="result-dialog" v-else>
            <VImg :src="Firework" width="200" class="gimmick" />
            <VImg :src="Confetti2" width="220" class="gimmick-2" />
            <VImg :src="Confetti3" width="220" class="gimmick-3" />
            <VImg :src="Confetti4" width="160" class="gimmick-4" />
            <VImg :src="Confetti4" width="160" class="gimmick-5" />
            <VCard color="#F0FFF8" width="400" class="px-4 py-4" rounded="lg">
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="backToWheel"></VBtn>
                </template>
                <VCardItem class="rounded-lg mx-auto" style="position: relative;">
                    <VSheet elevation="1" class="rounded-lg overflow-hidden">
                        <VImg :src="prizeImage ? prizeImage : Winner" class="mx-auto" :width="width * 0.2"
                            :height="height * 0.2" cover />
                    </VSheet>
                    <VImg width="48" :src="Badge" style="position: absolute; top: -10px; right: -8px;" />
                </VCardItem>
                <VCardText class="text-center" style="font-size: 1.6rem; font-weight: 700; line-height: normal;">
                    {{ capitalizeLetter(wheelPrize?.title as string) }}
                </VCardText>
                <VCardText class="text-center" style="font-size: 1rem;">
                    {{ $t('message.congratz') }}
                </VCardText>
                <VCardActions>
                    <VBtn class="text-none" variant="elevated" rounded="lg" block color="#00AB55"
                        :loading="wheelReportLoading" @click="handleConfirm">
                        {{ $t('button.confirm') }}</VBtn>
                </VCardActions>
            </VCard>
        </VRow>
    </v-dialog>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useI18n } from "vue-i18n";
import { useToast } from 'vue-toast-notification';
import { useRoute } from 'vue-router';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { useWheelPrizeStore } from '@/stores/wheelPrize';
import { useWheelReportStore } from '@/stores/wheelReport';
import Roulette from '@/components/wheel/Roulette.vue'
import Winner from '@/assets/images/winner-large.png'
import useImage from '@/composables/useImage';
import Badge from '@/assets/images/badge.png'
import Firework from '@/assets/images/firework.png'
import Confetti2 from '@/assets/images/confetti_2.png'
import Confetti3 from '@/assets/images/confetti_3.png'
import Confetti4 from '@/assets/images/confetti_4.png'
import { useDisplay } from 'vuetify';
import { computed } from 'vue';

const i18n = useI18n();
const $toast = useToast()
const route = useRoute();
const props = defineProps(['campaign'])
const { width, height } = useDisplay();

const slug = route.params.slug as string
const wheelPrizeStore = useWheelPrizeStore()
const wheelReportStore = useWheelReportStore()
const { wheelPrize, wheelPrizes, isLoading } = storeToRefs(wheelPrizeStore)
const { isLoading: wheelReportLoading } = storeToRefs(wheelReportStore)
const { getImage } = useImage();

const dialog = ref(false)
const result = ref(false)
const wheelComponent = ref()
const wheelActive = ref(true)
const prizeImage = ref();
const baseIcon = ref();
const items = ref()
const breakpoint = computed(() => width.value > 1366)

const wheelData = {
    firstItemIndex: { value: 0 },
    wheelSettings: {
        centeredIndicator: true,
        indicatorPosition: "top",
        size: 500,
        displayShadow: true,
        duration: 8,
        resultVariation: 100,
        easing: "bounce",
        counterClockwise: true,
        horizontalContent: false,
        displayBorder: true,
        displayIndicator: true,
        baseDisplay: true,
        baseSize: 100,
        baseDisplayShadow: true,
        baseDisplayIndicator: true,
        baseBackground: "#098E30",
    }
}

function backToWheel() {
    prizeImage.value = null;
    onHardReset()
    result.value = false;
};

function closeDialog() {
    prizeImage.value = null;
    onHardReset()
    dialog.value = false;
};

function launchWheel() {
    wheelComponent.value!.launchWheel();
};

function onHardReset() {
    wheelActive.value = false;
    // this.result = null;
    setTimeout(() => {
        wheelActive.value = true;
    }, 10);
};

async function wheelStartedCallback(resultItem: any) {
    await wheelPrizeStore.fetchSingleWheelPrizeById(resultItem.id)
    if (wheelPrize.value?.image) {
        prizeImage.value = await getImage(wheelPrize.value?.image as string)
    }
};

async function wheelEndedCallback(resultItem: any) {
    result.value = true
}

async function handleDialog(rotate: Function) {
    if (wheelPrizes.value.length <= 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return;
    }

    if (props.campaign?.baseIcon) {
        baseIcon.value = await getImage(props.campaign?.baseIcon)
    }

    await wheelPrizeStore.fetchWheelPrizeBySlug(slug)

    items.value = wheelPrizes.value.map((item: any, index: number) => {
        if (item.isComplete) {
            console.log('complete');

            return
        }

        return { id: item.id, name: item.title, htmlContent: item.title.length > 12 ? capitalizeLetter(item.title)?.replace(/\s/g, "<br>") : capitalizeLetter(item.title), textColor: "", background: "" }
    }).filter((item) => !!item)

    if (items.value.length < 4) {
        $toast.warning("Prize must have more than 4")
        return;
    }

    result.value = false
    dialog.value = !dialog.value
}


async function handleConfirm() {
    await wheelReportStore.addWheelReport(props.campaign.id, wheelPrize.value!.id);
    await wheelPrizeStore.fetchWheelPrizeBySlug(slug)
    // dialog.value = false
    backToWheel()
}
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.9);
}

.result-dialog {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.gimmick {
    position: absolute;
    top: -100px;
}

.gimmick-4 {
    position: absolute;
    right: 120px;
    top: 40px;
}

.gimmick-5 {
    position: absolute;
    left: 120px;
    top: 40px;
}

.gimmick-2 {
    position: absolute;
    left: 100px;
    bottom: 0;
}

.gimmick-3 {
    position: absolute;
    right: 110px;
    bottom: 0;
}
</style>