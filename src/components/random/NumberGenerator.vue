<template>
    <div class="randomGif">
        <VImg :src="CustomerNumber" width="156" class="mr-2" />
        <VImg :src="RandomNumber" width="500" />
        <div class="number-wrapper" style="left: 36px;">
            <span class="number">
                {{ props.numbers.customerId_1 }}
            </span>
            <span class="number">
                {{ props.numbers.customerId_2 }}
            </span>
        </div>
        <div class="number-wrapper" style="left: 200px;">
            <span class="number">
                {{ props.numbers.number_1 }}
            </span>
            <span class="number">
                {{ props.numbers.number_2 }}
            </span>
            <span class="number">
                {{ props.numbers.number_3 }}
            </span>
        </div>
        <div class="number-wrapper" style="left: 372px;">
            <span class="number">
                {{ props.numbers.number_4 }}
            </span>
            <span class="number">
                {{ props.numbers.number_5 }}
            </span>
            <span class="number">
                {{ props.numbers.number_6 }}
            </span>
        </div>
        <div class="number-wrapper" style="right: 48px;">
            <span class="number">
                {{ props.numbers.number_7 }}
            </span>
            <span class="number">
                {{ props.numbers.number_8 }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import RandomNumber from '@/assets/images/randomNumber.png'
import CustomerNumber from '@/assets/images/customerNumber.png'

const props = defineProps(['numbers', 'startRandom'])
</script>

<style>
.randomGif {
    position: relative;
    display: flex;
    align-items: center;
    color: #028947;
}

.number-wrapper {
    display: flex;
    gap: 26px;
    position: absolute;
}

.number {
    font-size: 2.5rem;
    font-weight: 700;
}
</style>