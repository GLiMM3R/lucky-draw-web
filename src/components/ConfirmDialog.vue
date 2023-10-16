<template>
    <div class="text-center">
        <v-btn size="small" variant="text" :icon="$props.icon" :color="$props.color" @click="dialog = true" />
        <v-dialog v-model="dialog" width="400">
            <v-card>
                <v-card-title class="bg-warning">
                    Confirm?
                </v-card-title>
                <v-card-text class="text-center">
                    {{ props.message }}
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="dialog = false">Close</v-btn>
                    <v-btn color="primary" @click="handleConfirm">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const dialog = ref(false)

const props = defineProps(['message', 'icon', 'color'])
const emit = defineEmits(['handleConfirm'])

const handleConfirm = () => {
    emit('handleConfirm')
    dialog.value = false
}
</script>