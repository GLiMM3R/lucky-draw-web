<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        Start Random
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" persistent width="800">
        <div class="d-flex flex-column justify-center">
            <VCard class="bg-primary py-4" rounded="pill">
                <VCardTitle class="text-center text-h3 font-weight-bold">
                    Prize {{ selectedPrize + 1 }}
                </VCardTitle>
            </VCard>
            <v-item-group mandatory v-model="selectedPrize">
                <v-container>
                    <v-row :dense="true">
                        <v-col v-for="item, index in $props.campaign.prizes" :key="item.id">
                            <v-item v-slot="{ isSelected, toggle }">
                                <v-btn size="x-large" variant="elevated" icon="mdi-calendar"
                                    class="align-center rounded-pill bg-primary" :disabled="item.isDone"
                                    :class="item.isDone ? 'secondary' : ''" @click="toggle">
                                    <v-icon v-if="isSelected">mdi-check-bold</v-icon>
                                    <div v-else>{{ index + 1 }}</div>
                                </v-btn>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>{{ winnerData }}
            <VImg :src="Lottery" class="d-block mx-auto w-50 my-8" />
            <VRow justify="center" no-gutters>
                <VCol class="d-flex justify-center">
                    <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">Exit</v-btn>
                </VCol>
                <VCol class="d-flex justify-center">
                    <v-btn color="green-darken-1" rounded="lg" variant="elevated" @click="handleRandom">Start
                        Random</v-btn>
                </VCol>
            </VRow>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Lottery from '@/assets/images/lottery.png'
import useRandom from '@/composables/useRandom';
import { useToast } from 'vue-toast-notification';

const $toast = useToast()
const props = defineProps(['campaign'])
const { doRandom } = useRandom();
const dialog = ref(false)
const winnerData = ref([])
const selectedPrize = ref(null)



const handleDialog = () => {
    dialog.value = !dialog.value
}

const handleRandom = async () => {
    if (selectedPrize.value === null) {
        alert('Select prize first!');
        return;
    }
    winnerData.value = await doRandom({ campaignId: props.campaign.id, prizeId: props.campaign.prizes[selectedPrize.value].id })
    selectedPrize.value === null
}

</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>