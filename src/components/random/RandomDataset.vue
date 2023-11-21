<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.coupon') }}</h2>
        <div>
            <VBtn v-if="!draw?.isComplete" class="text-none" variant="outlined" rounded="lg" prepend-icon='mdi-import'
                :loading="isSelecting" @click="handleFileImport">
                {{ $t('button.importCoupon') }}</VBtn>
            <input ref="uploader" accept=".csv" type="file" class="d-none" @change="onFileChanged" />
            <VBtn class="text-none ml-4" prepend-icon='mdi-export' rounded="lg" @click="handleDownload">{{
                $t('button.exportCoupon') }}</VBtn>
        </div>
    </div>
    <VCard rounded="lg" color="white" class="shadow">
        <v-table>
            <thead>
                <tr style="background-color: rgba(244, 246, 248, 1); color: #637381;">
                    <th class=" text-center border-0">
                        {{ $t('table.dataset.title') }}
                    </th>
                    <th class="text-center border-0">
                        {{ $t('table.dataset.createdAt') }}
                    </th>
                    <th class="text-center border-0">
                        {{ $t('table.dataset.createdBy') }}
                    </th>
                    <th class="text-center border-0">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="draw?.dataset" class="text-center">
                    <td>{{ draw.dataset ? draw.dataset.replace(`draw/${draw.id}/dataset/`, '') : '' }}
                    </td>
                    <td>{{ new Date(draw?.createdAt).toDateString() ?? '' }}</td>
                    <td>{{ draw?.createdBy.username ?? '' }}</td>
                    <td v-if="draw?.isComplete === false">
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
import { storeToRefs } from 'pinia';
import { useDrawStore } from '@/stores/draw';
import { onUnmounted } from 'vue';

const route = useRoute();
const slug = route.params.slug as string

const drawStore = useDrawStore()
const { draw, isLoading } = storeToRefs(drawStore)
const { downloadCsv } = useCsv();

await drawStore.fetchDrawBySlug(slug)

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
        await drawStore.uploadFileDataset(draw.value!.id, selectedFile.value)
        await drawStore.fetchDrawBySlug(slug)
    }
};

async function handleDownload() {
    if (!draw.value?.dataset) {
        return alert('No file!')
    }
    await downloadCsv(draw.value.dataset, draw.value.dataset.replace(`dataset/${slug}`, ''));
}

async function handleRemoveFile() {
    selectedFile.value = null;
    await drawStore.uploadFileDataset(draw.value!.id, selectedFile.value)
    await drawStore.fetchDrawBySlug(slug)
}

onUnmounted(() => {
    drawStore.$reset();
})
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
</style>