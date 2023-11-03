<template>
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ props }">
            <v-list-item v-if="$props.buttonText" v-bind="props" size="small" variant="text" :color="$props.color"
                class="text-none">{{
                    $props.buttonText
                }}</v-list-item>
            <v-btn v-else v-bind="props" size="small" variant="text" :icon="$props.icon" :color="$props.color"></v-btn>
        </template>
        <template v-slot:default="{ isActive }">
            <v-card>
                <template v-slot:append>
                    <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="isActive.value = false"></VBtn>
                </template>
                <v-card-title class="text-center font-weight-bold">
                    Confirm?
                </v-card-title>
                <v-card-text class="text-center mb-4">
                    {{ props.message }}
                </v-card-text>
                <v-card-actions>
                    <v-btn class="text-none" color="primary" block variant="elevated" rounded="lg"
                        @click="handleConfirm">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const dialog = ref(false)

const props = defineProps(['message', 'icon', 'color', 'buttonText'])
const emit = defineEmits(['handleConfirm'])

const handleConfirm = () => {
    emit('handleConfirm')
    dialog.value = false
}
</script>