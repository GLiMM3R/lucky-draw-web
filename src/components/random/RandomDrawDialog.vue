<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" prepend-icon='mdi-plus' class="text-none">
        {{ $t('button.startRandom') }}
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" persistent width="900">
        <!-- <VCard width="auto" class="bg-primary rounded-lg" height="100">
            <VCardTitle v-if="draw" class="text-center d-flex align-center justify-center text-h3 font-weight-bold">
                {{ capitalizeLetter(draw.title) }}
            </VCardTitle>
        </VCard> -->
        <VCard color="primary" rounded="lg" height="5rem" class="d-flex justify-center align-center">
            <VCardTitle class="text-center" style="font-size: 2rem; font-weight: 700;">
                {{ capitalizeLetter(draw?.title) }}
            </VCardTitle>
        </VCard>
        <v-item-group v-if="draw" mandatory v-model="selectedPrize">
            <v-container>
                <v-row :dense="true" justify="start" no-gutters>
                    <v-col class="text-center" v-for="item, index in drawPrizes" :key="index">
                        <v-item v-slot="{ isSelected, toggle }">
                            <div class="text-center">
                                <v-chip v-if="!item.isComplete" class="ma-2" :color="isSelected ? 'primary' : 'white'"
                                    variant="elevated" text-color="white" @click="toggle"
                                    :size="isSelected ? 'x-large' : 'large'" rounded
                                    :append-icon="isSelected ? 'mdi-check-bold' : ''">
                                    {{ item.rank + '. ' + capitalizeLetter(item.title) }}
                                </v-chip>
                                <v-chip v-else class="ma-2" :color="isSelected ? 'primary' : 'white'" variant="elevated"
                                    text-color="white" @click="toggle" :size="isSelected ? 'x-large' : 'large'" rounded>
                                    {{ item.rank + '. ' + capitalizeLetter(item.title) }}
                                    <template v-slot:append>
                                        <v-avatar size="32" color="white" class="ml-2">
                                            <VImg :src="Winner" />
                                        </v-avatar>
                                    </template>
                                </v-chip>
                            </div>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <RandomWinnerTable :winners="drawReports" id="elementToCapture" />
        <VRow justify="center" no-gutters class="mt-4">
            <VCol class="d-flex justify-center">
                <v-btn color="red" variant="flat" rounded="lg" class="text-none" @click="dialog = false">{{
                    $t('button.exit') }}</v-btn>
            </VCol>
            <VCol v-if="drawPrizes[selectedPrize].isComplete === false" class="d-flex justify-center">
                <v-btn color="green-darken-1" rounded="lg" variant="elevated" class="text-none" @click="handleRandom"
                    :loading="isLoading">{{
                        $t('button.startRandom') }}</v-btn>
            </VCol>
            <VCol v-else class="d-flex justify-center">
                <v-btn color="green-darken-1" rounded="lg" variant="elevated" class="text-none" @click="saveAsImage"
                    :loading="isLoading">Export to Canvas</v-btn>
            </VCol>
        </VRow>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Winner from '@/assets/images/winner.png'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import RandomWinnerTable from './RandomWinnerTable.vue';
import { useToast } from 'vue-toast-notification';
import { useI18n } from "vue-i18n";
import { useDrawStore } from '@/stores/draw';
import { useDrawPrizeStore } from '@/stores/drawPrize';
import { useDrawReportStore } from '@/stores/drawReport';
import { capitalizeLetter } from '@/utils/capitalizeLetter';
import html2canvas from 'html2canvas';

const i18n = useI18n();
const $toast = useToast()
const route = useRoute();
const slug = route.params.slug as string

const drawStore = useDrawStore();
const drawPrizeStore = useDrawPrizeStore();
const drawReportStore = useDrawReportStore();
const { draw, isLoading } = storeToRefs(drawStore)
const { drawPrizes } = storeToRefs(drawPrizeStore)
const { drawReports } = storeToRefs(drawReportStore)

const dialog = ref(false)
const selectedPrize = ref(99)

await drawStore.fetchDrawBySlug(slug)

watch(() => selectedPrize.value, async () => {
    if (drawPrizes.value[selectedPrize.value].isComplete) {
        await drawReportStore.fetchDrawReportsByPrizeId(slug, drawPrizes.value[selectedPrize.value].id as string)
    } else {
        drawReports.value = []
    }
})

function saveAsImage() {
    html2canvas(document.querySelector('#elementToCapture')!).then(canvas => {
        const dataUrl = canvas.toDataURL();

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${slug}_${drawPrizes.value[selectedPrize.value].title}.png`;
        link.click();
    });
};

const handleDialog = async () => {
    if (drawPrizes.value?.length === 0) {
        $toast.warning(i18n.t('alert.noPrize'))
        return
    }
    if (!draw.value?.dataset) {
        $toast.warning(i18n.t('alert.selectCoupon'))
        return
    }

    selectedPrize.value = drawPrizes.value?.length - 1
    dialog.value = !dialog.value

    if (draw.value.isComplete) {
        await drawReportStore.fetchDrawReportsByPrizeId(slug, drawPrizes.value[selectedPrize.value].id as string)
    }
}

const handleRandom = async () => {
    if (draw.value?.device === 'mobile') {
        window.open(`/random/${slug}/${drawPrizes.value[selectedPrize.value].id as string}/mobile`)
    } else {
        window.open(`/random/${slug}/${drawPrizes.value[selectedPrize.value].id as string}/desktop`)
    }
    dialog.value = !dialog.value
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