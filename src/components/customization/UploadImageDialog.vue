<template>
    <VCard rounded="lg" color="white" class="shadow pointer pa-2" @click="() => handleDialog">
        <VContainer>
            <VRow justify="space-between">
                <VCol align-self='center'>
                    <h5 style="font-size: 18px; font-weight: 500;">{{ props.buttonTitle }}</h5>
                    <VAvatar color="rgba(2, 137, 71, 1)" size="40px" class="mt-2">
                        <VIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path
                                    d="M0.729492 4.83784C0.729492 3.29217 1.53057 1.6746 2.78355 0.729736C2.78355 1.59757 3.49219 2.78379 4.8376 2.78379C5.65475 2.78379 6.43844 3.1084 7.01625 3.68622C7.59407 4.26403 7.91868 5.04772 7.91868 5.86487C7.91868 6.2613 7.83755 6.63719 7.70095 6.98536C8.46275 7.58996 9.21296 8.20902 9.95117 8.84222L7.81495 10.9784C7.182 10.24 6.56294 9.48982 5.95809 8.72822C5.60157 8.87049 5.22145 8.94436 4.8376 8.94595C2.56787 8.94595 0.729492 7.10757 0.729492 4.83784ZM13.2099 11.8709L14.5872 10.4937C15.2249 10.822 15.9311 10.9955 16.6484 11C17.8741 11 19.0497 10.5131 19.9164 9.64636C20.7831 8.77964 21.27 7.60411 21.27 6.37838C21.27 5.63379 21.0769 4.93952 20.7637 4.31714L17.1619 7.91892L15.1079 5.86487L18.7097 2.26309C18.0719 1.93475 17.3657 1.76129 16.6484 1.75676C15.4227 1.75676 14.2472 2.24368 13.3804 3.1104C12.5137 3.97713 12.0268 5.15265 12.0268 6.37838C12.0268 7.12298 12.2199 7.81725 12.5331 8.43963L1.75652 19.2162L3.81057 21.2703L10.8437 14.2372C12.7779 16.2218 14.8277 18.0905 16.9822 19.8335L18.4457 21.0135L19.9862 19.473L18.8062 18.0095C17.0632 15.8549 15.1945 13.8052 13.2099 11.8709Z"
                                    fill="#F9FFFC" />
                            </svg>
                        </VIcon>
                    </VAvatar>
                </VCol>
                <VCol>
                    <VImg :src="props.logo" width="100" height="100" class="img" />
                </VCol>
            </VRow>
        </VContainer>
    </VCard>
    <v-dialog v-model="dialog" activator="parent" width="400" on>
        <VCard>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <VCardTitle class="text-center">
                {{ props.title }}
            </VCardTitle>
            <VCardItem>
                <UploadImage @getImage="getImage" />
            </VCardItem>
            <VCardActions>
                <v-btn color="primary" type="submit" rounded="lg" variant="elevated" block class="my-4 text-none"
                    @click="handleConfirm">{{
                        $t('button.confirm') }}</v-btn>
            </VCardActions>
        </VCard>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UploadImage from '@/components/UploadImage.vue';

const props = defineProps(['title', 'buttonTitle', 'logo', 'url'])
const emits = defineEmits(['handleFunction'])
const file = ref<File>();

const getImage = (value: File) => {
    file.value = value
}
const dialog = ref(false)

const handleDialog = () => dialog.value = true

const handleConfirm = () => {
    emits('handleFunction', file.value)
    dialog.value = false
}
</script>
