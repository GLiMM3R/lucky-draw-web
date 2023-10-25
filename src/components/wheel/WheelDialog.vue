<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" width="900">
        <VRow justify="center" v-if="!result">
            <VCol>
                <VRow justify="center">
                    <!-- <VCard color="#028947" width="600px" rounded="pill">
                        <VCardTitle class="text-center text-h4 py-4">
                            Wheel Draw
                        </VCardTitle>
                    </VCard> -->
                    <VCard width="900" class="bg-primary  rounded-lg">
                        <VCardTitle v-if="campaign" class="text-center py-8 text-h3 font-weight-bold">
                            Wheel Draw
                        </VCardTitle>
                    </VCard>
                </VRow>
                <VRow justify="center" class="my-8">
                    <Roulette v-if="wheelActive" ref="wheel" :items="items" :first-item-index="wheelData.firstItemIndex"
                        :centered-indicator="wheelData.wheelSettings.centeredIndicator"
                        :indicator-position="wheelData.wheelSettings.indicatorPosition" :size="wheelData.wheelSettings.size"
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
                            <div v-if="wheelData.wheelSettings.baseHtmlContent"
                                v-html="wheelData.wheelSettings.baseHtmlContent" />
                        </template>
                    </Roulette>
                </VRow>
                <VRow justify="center">
                    <v-btn color="red" variant="flat" width="160" rounded="lg" @click="dialog = false">{{ $t('button.exit')
                    }}</v-btn>
                </VRow>
            </VCol>
        </VRow>
        <VRow justify="center" class="my-8" v-else>
            <Transition>
                <VCard color="#028947" width="500px" class="px-4 py-4" rounded="lg">
                    <template v-slot:append>
                        <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
                    </template>
                    <VCardItem>
                        <VImg :src="prizeImage ? prizeImage : Winner" width="80" class="mx-auto" />
                    </VCardItem>
                    <VCardTitle class="text-center text-h4 py-4">
                        {{ capitalizeLetter(prize?.title as string) }}
                    </VCardTitle>
                    <VCardActions>
                        <VBtn class="text-none" variant="elevated" rounded="lg" block color="#00AB55"
                            @click="handleConfirm">
                            {{ $t('button.confirm') }}</VBtn>
                    </VCardActions>
                </VCard>
            </Transition>
        </VRow>
    </v-dialog>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import Roulette from '@/components/wheel/Roulette.vue'
import Winner from '@/assets/images/winner.png'
import { useToast } from 'vue-toast-notification';
import { usePrizeStore } from '@/stores/prize';
import { storeToRefs } from 'pinia';
import { useDrawStore } from '@/stores/draw';
import { useI18n } from "vue-i18n";
import useImage from '@/composables/useImage';
import { useAppSettingStore } from '@/stores/appsetting';
import { useRoute } from 'vue-router';
import { capitalizeLetter } from '@/utils/capitalizeLetter';

const i18n = useI18n();
const props = defineProps(['campaign', 'coupon'])
const emits = defineEmits(['resetSelectCoupon'])
const $toast = useToast()
const route = useRoute();
const slug = route.params.slug as string
const prizeStore = usePrizeStore()
const appSettingStore = useAppSettingStore()
const drawStore = useDrawStore()
const { prize } = storeToRefs(prizeStore)

const dialog = ref(false)
const result = ref(false)
const wheel = ref(null)
const wheelActive = ref(true)
const prizeImage = ref('');
const loadingImage = ref('');

const { getImage } = useImage();

const wheelData = {
    firstItemIndex: { value: 0 },
    wheelSettings: {
        centeredIndicator: true,
        indicatorPosition: "top",
        size: 700,
        displayShadow: true,
        duration: 5,
        resultVariation: 70,
        easing: "bounce",
        counterClockwise: true,
        horizontalContent: false,
        displayBorder: false,
        displayIndicator: true,
        baseDisplay: true,
        baseSize: 100,
        baseDisplayShadow: true,
        baseDisplayIndicator: true,
        baseBackground: "#098E30",
        baseHtmlContent: loadingImage.value ? `<img src="${loadingImage.value}" style="object-fit: cover; width: 100%" />` : "<strong>Go!</strong>",
    }
}

function launchWheel() {
    wheel.value.launchWheel();
};

function onHardReset() {
    wheelActive.value = false;
    // this.result = null;
    setTimeout(() => {
        wheelActive.value = true;
    }, 10);
};

async function wheelStartedCallback(resultItem: any) {
    await prizeStore.getPrize(resultItem.id)
    if (prize.value?.image && prize.value?.image !== null || prize.value?.image !== '') {
        prizeImage.value = await getImage(prize.value?.image as string)
    }
};

async function wheelEndedCallback(resultItem: any) {
    result.value = true
}
async function handleDialog(rotate: Function) {
    if (props.campaign.prizes.length <= 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return;
    }
    if (props.campaign.prizes.length < 4) {
        $toast.warning("Prize must have more than 4")
        return;
    }
    if (!props.coupon) {
        $toast.warning(i18n.t('alert.noCustomer'))
        return;
    }

    const appsetting = await appSettingStore.getAppSetting();
    console.log("🚀 ~ file: WheelDialog.vue:167 ~ handleDialog ~ appsetting:", appsetting)

    if (appsetting && appsetting.wheelImage) {
        loadingImage.value = await getImage(appsetting.wheelImage)
    }
    result.value = false
    dialog.value = !dialog.value
}

const items = props.campaign.prizes.map((item: any, index: number) => {
    if (item.isDone) {
        return
    }

    const prize = { id: item.id, name: item.title, htmlContent: item.title, textColor: "", background: "" }

    return prize;
})

async function handleConfirm() {
    await drawStore.wheelDraw({ campaignSlug: slug, prizeId: prize.value?.id as string, couponId: props.coupon.id, winnerName: props.coupon.name, winnerPhone: props.coupon.phone })
    dialog.value = false
    onHardReset()
    resetSelectCoupon()
}

function resetSelectCoupon() {
    emits('resetSelectCoupon')
}
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>