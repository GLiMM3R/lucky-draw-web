<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.coupon') }}</h2>
        <div>
            <VBtn v-if="!random?.isComplete" class="text-none" variant="outlined" rounded="lg" prepend-icon='mdi-plus'
                :loading="isSelecting" @click="handleFileImport">
                {{ $t('button.importCoupon') }}</VBtn>
            <input ref="uploader" accept=".csv" type="file" class="d-none" @change="onFileChanged" />
            <VBtn class="text-none ml-4" prepend-icon='mdi-plus' rounded="lg" @click="handleDownload">{{
                $t('button.exportCoupon') }}</VBtn>
        </div>
    </div>
    <VCard rounded="lg" color="white" class="shadow">
        <v-table>
            <thead>
                <tr style="background-color: rgba(244, 246, 248, 1); color: #637381;">
                    <th class=" text-center border-0">
                        {{ $t('table.header.dataset.title') }}
                    </th>
                    <th class="text-center border-0">
                        {{ $t('table.header.dataset.createdAt') }}
                    </th>
                    <th class="text-center border-0">
                        {{ $t('table.header.dataset.createdBy') }}
                    </th>
                    <th class="text-center border-0">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="random?.dataset" class="text-center">
                    <td>{{ random?.dataset ? random?.dataset.replace(`dataset/${random?.slug}/`, '') : '' }}
                    </td>
                    <td>{{ new Date(random?.createdAt).toDateString() ?? '' }}</td>
                    <td>{{ random?.createdBy.username ?? '' }}</td>
                    <td v-if="random?.isComplete === false">
                        <v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" :loading="isLoading"
                            @click="handleRemoveFile" />
                    </td>
                </tr>
                <tr v-else>
                    <td colspan="4" class="text-center">No dataset</td>
                </tr>
            </tbody>
        </v-table>
    </VCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import useCsv from '@/composables/useCsv';
import { useRandomStore } from '@/stores/random';
import { storeToRefs } from 'pinia';

const route = useRoute();
const slug = route.params.slug as string

const randomStore = useRandomStore()
const { random, isLoading } = storeToRefs(randomStore)
const { downloadCsv } = useCsv();

await randomStore.fetchRandomBySlug(slug)

const uploader = ref();
const isSelecting = ref(false);
const selectedFile = ref();

function handleFileImport() {
    isSelecting.value = true;
    window.addEventListener('focus', () => {
        isSelecting.value = false
    }, { once: true });

    uploader.value.click();
};

async function onFileChanged(event: any) {
    const files = event.target.files[0];
    if (!files.type.match('text/csv')) {
        alert('File type is not support!')
        return;
    }
    if (files) {
        selectedFile.value = files;
        uploader.value.value = null;
        await randomStore.uploadFileDataset(random.value!.id, selectedFile.value)
        await randomStore.fetchRandomBySlug(slug)
    }
};

async function handleDownload() {
    if (!random.value?.dataset) {
        return alert('No file!')
    }
    await downloadCsv(random.value.dataset, random.value.dataset.replace(`dataset/${slug}`, ''));
}

async function handleRemoveFile() {
    selectedFile.value = null;
    await randomStore.uploadFileDataset(random.value!.id, selectedFile.value)
    await randomStore.fetchRandomBySlug(slug)
}
</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}

.dataset-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}

.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>@/stores/draw