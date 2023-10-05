<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        Start Random
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" width="900">
        <VRow justify="center">
            <FortuneWheel style="width: 500px; max-width: 100%;" :verify="canvasVerify" :canvas="canvasOptions"
                :prizes="prizes" @rotateStart="onCanvasRotateStart" @rotateEnd="onRotateEnd" />
        </VRow>
        <VRow justify="center">
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" width="160" rounded="lg" @click="dialog = false">Exit</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import FortuneWheel from '@/components/fortuneWheel/FortuneWheel.vue';
import type { PrizeConfig } from '@/components/FortuneWheel/types'

const props = defineProps(['prizes'])

const dialog = ref(false)

const handleDialog = async () => {
    dialog.value = !dialog.value
}

const canvasVerify = ref(false)
const verifyDuration = 2
const canvasOptions = {
    btnWidth: 100,
    borderColor: '#028947',
    borderWidth: 30,
    lineHeight: 30,
    fontSize: 14
}

const bgColor = ['#fff', '#dd3832', '#fef151']
let i = 0;


const probability = (100 / props.prizes.length).toFixed(2);

const prizes = props.prizes.map((item: any, index: number) => {
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
            } else {
                alert('未通过验证')
            }
        })
        return
    }
}

function onRotateEnd(prize: PrizeConfig) {
    alert(prize.name)
}
</script>