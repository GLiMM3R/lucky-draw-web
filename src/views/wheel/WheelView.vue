<template>
  wheel
  <VBtn @click="refreshToken">
    click
  </VBtn>
</template>

<script setup lang="ts">
import useCampaign from '@/composables/useCampaign'
import useUser from '@/composables/useUser'
import { onMounted } from 'vue'

const { refreshToken } = useUser()
const { getCampaigns } = useCampaign()

onMounted(async () => {
  await getCampaigns()
})
</script>
