<template>
    <v-breadcrumbs :items="props.items" class="breadcrumbs" density="compact">
        <template v-slot:divider>
            <v-icon icon="mdi-circle-small "></v-icon>
        </template>
    </v-breadcrumbs>
</template>

<script setup lang="ts">
const props = defineProps(['items'])
</script>

<style scoped lang="scss">
.breadcrumbs {
    padding: 0;
}
</style>