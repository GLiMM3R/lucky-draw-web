<template>
    wheel
</template>


<script setup lang="ts">
import useCampaign from '@/composables/useCampaign';
import { onMounted } from 'vue';

const { getCampaigns } = useCampaign()

onMounted(async () => {
    await getCampaigns()
})
</script>