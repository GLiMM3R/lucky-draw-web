<template>
    <VContainer>
        <VRow>
            <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                <Suspense>
                    <UploadImageDialog title="Random Draw Image" buttonTitle="Customize Random Draw" :logo="Random"
                        @handleFunction="uploadRandom" />
                </Suspense>
            </VCol>
            <VCol cols="12" sm="12" md="6" lg="4" xl="3">
                <Suspense>
                    <UploadImageDialog title="Wheel Draw Image" buttonTitle="Customize Wheel Draw" :logo="Wheel"
                        @handleFunction="uploadWheel" />
                </Suspense>
            </VCol>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import UploadImageDialog from '@/components/customization/UploadImageDialog.vue'
import Wheel from '@/assets/images/wheel.png'
import Random from '@/assets/images/lottery.png'
import { useAppSettingStore } from '@/stores/appsetting'

const appSettingStore = useAppSettingStore();

async function uploadRandom(values: any) {
    await appSettingStore.updateAppSetting({ type: 'random', image: values })
}

async function uploadWheel(values: any) {
    await appSettingStore.updateAppSetting({ type: 'wheel', image: values })
}
</script>

