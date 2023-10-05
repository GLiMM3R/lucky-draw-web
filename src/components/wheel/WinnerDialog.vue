<template>
    <v-btn variant="elevated" rounded="lg" @click="handleDialog" class="text-none">
        View
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" persistent width="800">
        <div class="d-flex flex-column justify-center">
            <VCard class="bg-primary py-4" rounded="pill">
                <VCardTitle class="text-center text-h4 font-weight-bold">
                    {{ props.selectedPrize.title }}
                </VCardTitle>
            </VCard>
            <div>
                <VRow>
                    <VCol v-for="winner in winnerState.winners" :key="winner.id" cols="6">
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
            </div>
            <VRow justify="center" no-gutters>
                <VCol class="d-flex justify-center">
                    <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">Exit</v-btn>
                </VCol>
            </VRow>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Winner from '@/assets/images/winner.png'
import { useToast } from 'vue-toast-notification';
import useWinner from '@/composables/useWinner';

const props = defineProps(['selectedPrize', 'selectedCoupon'])
const $toast = useToast()
const { winnerState, getWinnerRecord } = useWinner();
const dialog = ref(false)

const handleDialog = async () => {
    if (!props.selectedPrize) {
        $toast.warning('Select prize first!', { position: 'top' });
        return;
    }

    await getWinnerRecord(props.selectedPrize.campaignId, props.selectedPrize.id)
    dialog.value = !dialog.value
}

</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>