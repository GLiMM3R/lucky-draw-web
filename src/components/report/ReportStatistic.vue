<template>
    <VCard rounded="lg" color="white" class="shadow pa-2">
        <VContainer>
            <VRow justify="center">
                <VCol align-selft="center" cols="7">
                    <p style="font-size: 14px; font-weight: 500;">{{ props.text }}</p>
                    <h3 style="font-size: 32px; font-weight: 600;">{{ props.value }}</h3>
                </VCol>
                <VCol cols="5">
                    <VImg :src="props.logo" width="90" height="90" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
</template>

<script setup lang="ts">
const props = defineProps(["value", "text", "logo"])
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>