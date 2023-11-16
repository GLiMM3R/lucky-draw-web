<template>
    <div class="d-flex flex-column align-center">
        <VAvatar class="avatar" color="primary" :size="height * 0.12">
            <VImg :src="Logo" />
        </VAvatar>
        <VBtn class="text-none btn" :class="props.textColor ? `text-${props.textColor}` : ''" :disabled="props.disabled"
            :color="props.color ? props.color : ''" rounded="large" @click="() => emits('handleClick')">
            {{ props.title }}
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/jmart-logo.png'
import { useDisplay } from 'vuetify';

const { width, height } = useDisplay()
const emits = defineEmits(['handleClick'])
const props = defineProps(['size', 'color', 'textColor', 'title', 'disabled'])
</script>

<style>
.btn {
    border: 3px #028947 solid;
    top: -10px;
}
</style>