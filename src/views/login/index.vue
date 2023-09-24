<template>
    <SplashScreen :isLoading="isLoading" v-if="isLoading" />
    <VContainer v-else class="layout-wrapper" :fluid="true">
        <!-- <VMain class="content"> -->
        <VRow class="content">
            <VCol>
                <VImg :src="Logo" width="500" height="200" cover />
            </VCol>
            <VCol>
                <VCard class="card">
                    <VCardTitle style="color: white; text-align: center;">
                        Login
                    </VCardTitle>
                    <VCardItem>
                        <VLabel class="mb-2" style="color: white;" text="Username"></VLabel>
                        <VTextField id="username" variant="outlined" bgColor="white" rounded="lg" />
                        <VLabel class="mb-2" style="color: white;">Password</VLabel>
                        <VTextField variant="outlined" bgColor="white" rounded="lg" />
                        <VBtn color="#12BA68">Login</VBtn>
                    </VCardItem>
                </VCard>
            </VCol>
        </VRow>
        <!-- </VMain> -->
    </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SplashScreen from '@/components/SplashScreen.vue'
import Logo from '@/assets/images/jmart.png'

const isLoading = ref(true)

setTimeout(() => {
    isLoading.value = false
}, 1000)
</script>


<style scoped lang="scss">
.layout-wrapper {
    height: 100vh;
    background-color: #028947;
    display: flex;
    justify-content: center;
    align-items: center;
}

// .content {
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

.card {
    background: rgba(255, 255, 255, 0.10);
    width: 600px;
    padding: 18px;
}

.textfield {
    height: 56px;
}
</style>