<template>
    <VCard rounded="lg" color="white" class="shadow pointer pa-2" is="a" :href="props.url">
        <VContainer>
            <VRow justify="space-between">
                <VCol align-self='center'>
                    <h5 style="font-size: 18px; font-weight: 500;">{{ props.title }}</h5>
                    <VIcon color="green" size="large" icon="mdi-arrow-right-circle" />
                </VCol>
                <VCol class="d-flex">
                    <VImg :src="props.logo" width="100" height="100" class="img" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'logo', 'url'])
</script>


<style scoped>
.pointer {
    cursor: pointer;
}

.img {
    object-fit: contain;
}

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>