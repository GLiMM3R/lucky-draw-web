<template>
    <v-item-group mandatory v-model="selected" @change="selectedPrize" @model-value="selectedPrize">
        <v-container>
            <v-row :dense="true">
                <v-col v-for="n in 10" :key="n">
                    <v-item v-slot="{ isSelected, toggle }">
                        <v-btn size="x-large" variant="elevated" icon="mdi-calendar"
                            class="align-center rounded-pill bg-primary" @click="toggle">
                            <v-icon v-if="isSelected">mdi-check-bold</v-icon>
                            <div v-else>{{ n }}</div>
                        </v-btn>
                    </v-item>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
    {{ selected }}
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['selectedPrize'])
const selected = ref(null)

const selectedPrize = () => {
    console.log('changed');

    emit('selectedPrize', selected.value)
}
</script>