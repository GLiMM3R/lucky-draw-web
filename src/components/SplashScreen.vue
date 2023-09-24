<template>
  <div class="layout-wrapper" :class="!props.isLoading ? 'fadeout' : ''">
    <div class="logo">
      <VImg :src="Logo" :width="400" :height="400" aspect-ratio="1" />
      <v-progress-circular
        :width="4"
        :size="46"
        color="white"
        indeterminate
        class="spinner"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/images/jmart.png'

const props = defineProps(['isLoading'])
</script>

<style scoped>
.layout-wrapper {
  height: 100vh;
  width: 100%;
  background-color: #028947;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  position: relative;
  display: flex;
  flex-direction: column;
}

.spinner {
  position: absolute;
  top: 70%;
  left: 50%;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
