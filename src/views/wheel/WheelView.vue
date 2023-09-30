<template>
  wheel
  <VBtn @click="getCampaigns">
    click
  </VBtn>
</template>

<script setup lang="ts">
import useCampaign from '@/composables/useCampaign'
import useUser from '@/composables/useUser'
import { onMounted } from 'vue'

const { getCampaigns } = useCampaign()

onMounted(async () => {
  await getCampaigns('random')
})
</script>
