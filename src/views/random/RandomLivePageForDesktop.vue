<template>
    <VApp>
        <VLayout :full-height="true">
            <VMain style="position: relative;">
                <VImg v-if="backgroundImage" :src="backgroundImage" width="100%" height="100%"
                    style="position: absolute; z-index: -1;" cover />
                <VContainer class="fill-height pa-0" :style="breakpoint ? 'width: 1366px;' : 'width: 1200px;'"
                    :fluid="width < 1920 ? true : false">
                    <VRow class="fill-height">
                        <VCol :cols="12" :sm="12" :md="12" :lg="4" class="d-flex flex-column">
                            <VCard color="primary" rounded="pill" height="5rem">
                                <VImg :src="Logo" height="5rem" />
                            </VCard>
                            <VSheet class="rounded-lg fill-height main-content flex-1 flex-column justify-center"
                                :class="breakpoint ? 'mt-10' : 'mt-8'">
                                <VCard style="position: absolute;" :height="breakpoint ? '3.75rem' : '2.75rem'"
                                    :style="breakpoint ? 'top: -34px;' : 'top: -24px;'" width="300" color="#FFCD00"
                                    rounded="pill" class="d-flex justify-center align-center">
                                    <VCardTitle class="text-center font-weight-bold text-primary">
                                        {{ $t('modalTitle.winnerName') }}
                                    </VCardTitle>
                                </VCard>
                                <VContainer v-if="drawPrize?.isComplete" class="d-flex flex-column">
                                    <VRow align="start">
                                        <transition-group>
                                            <VCol cols="12" v-for="winner, index in items" :key="winner.id"
                                                style="transition: all 0.5s;">
                                                <VCard :height="breakpoint ? 48 : 48"
                                                    class="d-flex align-center rounded-lg item-wrapper"
                                                    style="position: relative; transition: all 0.5s;">
                                                    <VCardTitle>
                                                        {{ winner.phone.slice(0, -2) + 'XX' }} - {{
                                                            winner.name
                                                        }}
                                                    </VCardTitle>
                                                    <VImg :src="Confetti" width="100"
                                                        style="position: absolute; right: -16px;" />
                                                </VCard>
                                            </VCol>
                                        </transition-group>
                                    </VRow>
                                </VContainer>
                                <v-pagination v-model="page" color="primary"
                                    style="position: absolute; bottom: 0; width: 100%;"
                                    :length="Math.ceil(drawReports.length / perPage)" size="24" />
                            </VSheet>
                        </VCol>
                        <VCol class="d-flex flex-column">
                            <VCard color="primary" rounded="pill" height="5rem" class="d-flex justify-center align-center"
                                :class="breakpoint ? 'mb-10' : 'mb-8'">
                                <VCardTitle class="text-center"
                                    :style="breakpoint ? 'font-size: 2.4rem; font-weight: 700;' : 'font-size: 2rem; font-weight: 700;'">
                                    {{ capitalizeLetter(draw?.title) }}
                                </VCardTitle>
                            </VCard>
                            <VSheet class="rounded-lg main-content-no-flex flex-1 overflow-hidden">
                                <VContainer class="fill-height pa-0">
                                    <VRow class="fill-height">
                                        <VCol :cols="12" class="d-flex flex-column justify-space-between">
                                            <VRow justify="space-evenly" align="center" class="flex-1">
                                                <RandomButton v-if="!startRandom" :title="$t('button.startRandom')"
                                                    color="#FFCD00" text-color="primary" @handleClick="handleStartRandom" />
                                                <RandomButton v-else :title="$t('button.stopRandom')" color="red"
                                                    text-color="white" :disabled="isEnabled"
                                                    @handleClick="handleStopRandom" />
                                                <PrizeDetailCard :amount="drawPrize?.amount" :title="drawPrize?.title"
                                                    :rank="drawPrize?.rank" :height="height * 0.18" />
                                                <div v-if="prizeImage" class="rounded-lg img-wrapper">
                                                    <VSheet elevation="1" class="rounded-lg overflow-hidden">
                                                        <VImg :width="240" :height="height * 0.18" :src="prizeImage" />
                                                    </VSheet>
                                                    <VImg width="30" :src="Badge"
                                                        style="position: absolute; top: 5px; right: 5px;" />
                                                </div>
                                            </VRow>
                                            <VRow v-if="startRandom" class="flex-1 d-flex justify-center align-center">
                                                <div v-if="!loadingImage">
                                                    <NumberGenerator :numbers="numbers" />
                                                </div>
                                                <VImg v-else :src="loadingImage" :height="height * 0.17" class="mx-10" />
                                            </VRow>
                                            <VRow v-else class="flex-1 d-flex justify-center align-center">
                                                <p v-if="!drawReports">Start random to Get Winner</p>
                                            </VRow>
                                        </VCol>
                                    </VRow>
                                </VContainer>
                            </VSheet>
                            <VSheet class="rounded-lg main-content d-md-flex d-none mt-4 flex-1">
                            </VSheet>
                        </VCol>
                    </VRow>
                </VContainer>
            </VMain>
        </VLayout>
    </VApp>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, watch } from 'vue';
import { useDisplay } from 'vuetify';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDrawPrizeStore } from '@/stores/drawPrize';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import { useDrawStore } from '@/stores/draw';
import { useDrawReportStore } from '@/stores/drawReport';
import useImage from '@/composables/useImage';
import useRandomGenerator from '@/composables/useRandomGenerator';
import Logo from '@/assets/images/jmart-logo.png'
import Badge from '@/assets/images/badge.png'
import Confetti from '@/assets/images/confetti.png'
import RandomButton from '@/components/random/RandomButton.vue';
import PrizeDetailCard from '@/components/random/PrizeDetailCard.vue';
import NumberGenerator from '@/components/random/NumberGenerator.vue';
import type { DrawReport } from '@/stores/types/drawReport';
import { useReactiveLocalStorage } from '@/composables/useReactiveLocalStorage';

const { performAction } = useReactiveLocalStorage('status');

const route = useRoute();
const slug = route.params.slug as string
const prizeId = route.params.prizeId as string

const randomGenerator = useRandomGenerator();
const drawStore = useDrawStore();
const drawPrizeStore = useDrawPrizeStore();
const drawReportStore = useDrawReportStore();
const { draw } = storeToRefs(drawStore)
const { drawPrize } = storeToRefs(drawPrizeStore)
const { drawReports } = storeToRefs(drawReportStore)
const { getImage } = useImage();

const { width, height } = useDisplay()
const breakpoint = computed(() => width.value > 1366)

const startRandom = ref(false)
const page = ref(1)
// const perPage = ref(6)
const items = ref<DrawReport[]>([]);
const isEnabled = ref(false);
const prizeImage = ref();
const backgroundImage = ref();
const loadingImage = ref();
const numbers = reactive({
    customerId_1: 0,
    customerId_2: 0,
    number_1: 0,
    number_2: 0,
    number_3: 0,
    number_4: 0,
    number_5: 0,
    number_6: 0,
    number_7: 0,
    number_8: 0
})
const perPage = computed(() => {
    if (height.value > 750) {
        return 10
    } else {
        return 7
    }
})

onMounted(async () => {
    document.title = `Random ${capitalizeLetter(slug)}`
    await drawPrizeStore.fetchSingleDrawPrizeById(prizeId)
    await drawStore.fetchDrawBySlug(slug)

    if (drawPrize.value?.isComplete) {
        await drawReportStore.fetchDrawReportsByPrizeId(slug, prizeId)
    }

    if (drawPrize.value?.image) {
        prizeImage.value = await getImage(drawPrize.value?.image)
    }

    if (draw.value?.backgroundImage) {
        backgroundImage.value = await getImage(draw.value?.backgroundImage)
    }

    if (draw.value?.loadingImage) {
        loadingImage.value = await getImage(draw.value?.loadingImage)
    }
})

const visiblePages = computed(() => {
    return drawReports.value.slice((page.value - 1) * perPage.value, page.value * perPage.value)
})

watch(() => visiblePages.value, () => {
    items.value = []
    visiblePages.value.forEach((item, index) => {
        setTimeout(() => {
            items.value.push(item)
        }, 360 * (index + 1))
    })
})

const handleStartRandom = async () => {
    if (drawPrize.value?.isComplete) {
        alert('Already random!')
        return;
    }

    startRandom.value = true
    isEnabled.value = true

    setTimeout(() => {
        isEnabled.value = false
    }, 3000);

    animateRandomNumber()

    await drawStore.luckyDraw({ slug: slug, prizeId: prizeId })
}

const handleStopRandom = async () => {
    startRandom.value = false
    await drawPrizeStore.fetchSingleDrawPrizeById(prizeId)
    await drawReportStore.fetchDrawReportsByPrizeId(slug, prizeId)
    // localStorage.setItem('status', 'processing');
    performAction()
}

const animateRandomNumber = () => {
    if (!startRandom.value) {
        numbers.customerId_1 = 0
        numbers.customerId_2 = 0
        numbers.number_1 = 0
        numbers.number_2 = 0
        numbers.number_3 = 0
        numbers.number_4 = 0
        numbers.number_5 = 0
        numbers.number_6 = 0
        numbers.number_7 = 0
        numbers.number_8 = 0
        return
    }

    numbers.customerId_1 = randomGenerator.generateRandomCustomerNumber()
    numbers.customerId_2 = randomGenerator.generateRandomCustomerNumber()
    numbers.number_1 = randomGenerator.generateRandomPhoneNumber()
    numbers.number_2 = randomGenerator.generateRandomNumber()
    numbers.number_3 = randomGenerator.generateRandomNumber()
    numbers.number_4 = randomGenerator.generateRandomNumber()
    numbers.number_5 = randomGenerator.generateRandomNumber()
    numbers.number_6 = randomGenerator.generateRandomNumber()
    numbers.number_7 = randomGenerator.generateRandomNumber()
    numbers.number_8 = randomGenerator.generateRandomNumber()

    requestAnimationFrame(animateRandomNumber)
}

</script>

<style>
.v-enter-from {
    opacity: 0;
    translate: -50px 0;
}

.v-enter-to {
    opacity: 1;
    translate: 0 0;
}

.v-leave-from {
    opacity: 1;
    translate: 0 0;
}

.v-leave-to {
    opacity: 0;
    translate: 50px 0;
}

.item {
    background-color: #e0e0e0;
    padding: 10px;
    margin: 10px;
    border: 1px solid #333;
}

.content-wrapper {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
}

.img-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main-content {
    position: relative;
    display: flex;
    align-items: center;
    border: 3px #028947 solid;
    background-color: #F0FFF8;
}

.main-content-no-flex {
    border: 3px #028947 solid;
    background-color: #F0FFF8;
}

.flex-1 {
    flex: 1;
}
</style>                 