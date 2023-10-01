<template>
    <v-btn variant="elevated" rounded="lg" @click="dialog = !dialog">
        Start Random
    </v-btn>
    <v-dialog v-model="dialog" class="overlay" persistent width="600">
        <div class="d-flex flex-column justify-center">
            <VCard class="bg-primary py-8" rounded="pill">
                <VCardTitle class="text-center text-h2 font-weight-bold">
                    Prize 10
                </VCardTitle>
            </VCard>
            <VImg :src="Lottery" class="d-block mx-auto w-75 my-16" />
            <VRow justify="center" no-gutters>
                <VCol class="d-flex justify-center">
                    <v-btn color="red" variant="flat" rounded="lg" @click="dialog = false">Exit</v-btn>
                </VCol>
                <VCol class="d-flex justify-center">
                    <v-btn color="green-darken-1" rounded="lg" variant="elevated" @click="dialog = false">Start
                        Random</v-btn>
                </VCol>
            </VRow>
        </div>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Lottery from '@/assets/images/lottery.png'


const dialog = ref(false)
</script>

<style scoped lang="scss">
.v-overlay--active {
    backdrop-filter: blur(2px);
    background: rgb(0 0 0 / 0.8);
}
</style>