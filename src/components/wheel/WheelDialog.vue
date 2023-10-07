<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        Start Random
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
                    <v-btn color="red" variant="flat" width="160" rounded="lg" @click="dialog = false">Exit</v-btn>
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
                            @click="dialog = false">
                            Confirm</VBtn>
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
import type { PrizeConfig } from '@/components/FortuneWheel/types'
import { useToast } from 'vue-toast-notification';
import usePrize from '@/composables/usePrize';
import { usePrizeStore } from '@/stores/prize';
import { storeToRefs } from 'pinia';

const props = defineProps(['prizes', 'coupon'])
const $toast = useToast()

const prizeStore = usePrizeStore()
const { prize } = storeToRefs(prizeStore)
const { getPrize } = usePrize()

const dialog = ref(false)
const result = ref(false)

const handleDialog = (rotate: Function) => {
    if (props.prizes.length <= 0) {
        $toast.warning('No prizes')
        return;
    }
    if (!props.coupon) {
        $toast.warning('Select coupon first')
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
    borderWidth: 30,
    lineHeight: 30,
    fontSize: 16
}

const bgColor = ['#fff', '#dd3832', '#fef151']
let i = 0;


const probability = (100 / props.prizes.length).toFixed(2);

const prizes = props.prizes.map((item: any, index: number) => {
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
    await getPrize(prize.value)
    result.value = true
}

const handleConfirm = () => {
    
}
</script>