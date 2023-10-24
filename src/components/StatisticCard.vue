<template>
    <VCard rounded="lg" color="white" class="shadow pa-2">
        <VContainer>
            <VRow justify="center">
                <VCol align-selft="center" cols="7">
                    <h3 style="font-size: 32px; font-weight: 600;">{{ props.item.value }}</h3>
                    <p style="font-size: 14px; font-weight: 500;">{{ props.item.text }}</p>
                </VCol>
                <VCol cols="5">
                    <VImg :src="props.item.logo" width="90" height="90" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
</template>

<script setup lang="ts">
const props = defineProps(["item"])
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>