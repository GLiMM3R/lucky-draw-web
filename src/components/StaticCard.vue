<template>
    <VSheet rounded="lg" elevation="1" color="white">
        <VContainer>
            <VRow>
                <VCol class="static-detail" cols="7">
                    <h3 style="font-size: 32px; font-weight: 600;">{{ props.item.value }}k</h3>
                    <p style="font-size: 14px; font-weight: 500;">{{ props.item.text }}</p>
                </VCol>
                <VCol cols="5">
                    <VImg :src="props.item.logo" width="90" height="90" />
                </VCol>
            </VRow>
        </VContainer>
    </VSheet>
</template>

<script setup lang="ts">
const props = defineProps(["item"])
</script>