<template>
    <v-container class="pa-0">
        <div class="title">{{ capitalizeLetter($t(props.pageTitle)) }}</div>
        <v-breadcrumbs :items="props.items" class="breadcrumbs" density="compact">
            <template v-slot:divider>
                <v-icon icon="mdi-circle-small "></v-icon>
            </template>
            <template v-slot:title="{ item }">
                {{ capitalizeLetter($t(item.title)) }}
            </template>
        </v-breadcrumbs>
    </v-container>
</template>

<script setup lang="ts">
import { capitalizeLetter } from '@/utils/capitalizeLetter';

const props = defineProps(['items', 'pageTitle'])
</script>

<style scoped lang="scss">
.breadcrumbs {
    padding: 0;
}

.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}
</style>