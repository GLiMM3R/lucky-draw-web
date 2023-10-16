<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" width="900">
        <VRow justify="center" v-if="!result">
            <VCol>
                <VRow justify="center">
                    <VCard color="#028947" width="600px" rounded="pill">
                        <VCardTitle class="text-center text-h4 py-4">
                            Wheel Draw
                        </VCardTitle>
                    </VCard>
                </VRow>
                <VRow justify="center" class="my-8">
                    <FortuneWheel style="width: 600px; max-width: 100%;" :verify="canvasVerify" :canvas="canvasOptions"
                        :prizes="prizes" @rotateStart="onCanvasRotateStart" @rotateEnd="onRotateEnd" />
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
                        <VImg :src="Winner" width="80" class="mx-auto" />
                    </VCardItem>
                    <VCardTitle class="text-center text-h4 py-4">
                        {{ prize?.title }}
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
import FortuneWheel from '@/components/fortuneWheel/FortuneWheel.vue';
import Winner from '@/assets/images/winner.png'
import { useToast } from 'vue-toast-notification';
import { usePrizeStore } from '@/stores/prize';
import { storeToRefs } from 'pinia';
import type { PrizeConfig } from '../fortuneWheel/types';
import { useCampaignStore } from '@/stores/campaign';
import { useDrawStore } from '@/stores/draw';
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const props = defineProps(['campaign', 'coupon'])
const $toast = useToast()

const prizeStore = usePrizeStore()
const campaignStore = useCampaignStore();
const drawStore = useDrawStore()
const { prize } = storeToRefs(prizeStore)

const dialog = ref(false)
const result = ref(false)

const handleDialog = (rotate: Function) => {
    if (props.campaign.prizes.length <= 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return;
    }
    if (!props.coupon) {
        $toast.warning(i18n.t('alert.noCustomer'))
        return;
    }
    result.value = false
    dialog.value = !dialog.value
}

const canvasVerify = ref(false)
const verifyDuration = 2
const canvasOptions = {
    btnWidth: 100,
    borderColor: '#028947',
    borderWidth: 20,
    lineHeight: 30,
    fontSize: 14,
    fontFamily: 'Poppins, Noto Sans Serif'
}

const bgColor = ['#fff', '#dd3832', '#fef151']
let i = 0;


const probability = (100 / props.campaign.prizes.length).toFixed(2);

const prizes = props.campaign.prizes.map((item: any, index: number) => {
    if (item.isDone) {
        return
    }

    const prize = {
        id: index + 1,
        name: item.title,
        value: item.id,
        bgColor: bgColor[i++],
        color: '#000',
        probability
    }

    if (i === 3) i = 0;

    return prize;
})

function testRequest(verified: boolean, duration: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(verified)
        }, duration)
    })
}

function onCanvasRotateStart(rotate: Function) {
    if (canvasVerify.value) {
        const verified = true
        testRequest(verified, verifyDuration * 1000).then((verifiedRes) => {
            if (verifiedRes) {
                rotate()
                canvasVerify.value = true
            }
        })
        return
    }
}

async function onRotateEnd(prize: PrizeConfig) {
    await prizeStore.getPrize(prize.value)
    result.value = true
}

const handleConfirm = async () => {
    await drawStore.wheelDraw({ campaignId: props.campaign.id, prizeId: prize.value?.id as string, couponId: props.coupon.id, winnerName: props.coupon.name, winnerPhone: props.coupon.phone })
    dialog.value = false
    await campaignStore.getCampaign(props.campaign.id)
}
</script>