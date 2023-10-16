<template>
    <div class="dataset-header">
        <h2 class="title">{{ $t('table.title.coupon') }}</h2>
        <div>
            <VBtn class="text-none" variant="outlined" rounded="lg" prepend-icon='mdi-plus' :loading="isSelecting"
                @click="handleFileImport">
                {{ $t('button.importCoupon') }}</VBtn>
            <input ref="uploader" accept=".csv" type="file" class="d-none" @change="onFileChanged" />
            <VBtn class="text-none ml-4" prepend-icon='mdi-plus' rounded="lg" @click="handleDownload">{{
                $t('button.exportCoupon') }}</VBtn>
        </div>
    </div>
    <VCard rounded="lg" color="white" class="shadow">
        <v-table>
            <thead>
                <tr style="background-color: #F4F6F8; color: #637381;">
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
                <tr v-if="props.campaign.file" class="text-center">
                    <td>{{ props.campaign.file ? props.campaign.file.replace(`coupon/${props.campaign.id}/`, '') : '' }}
                    </td>
                    <td>{{ new Date(props.campaign.createdAt).toLocaleString() ?? '' }}</td>
                    <td>{{ props.campaign.createdBy.username ?? '' }}</td>
                    <td><v-btn size="small" variant="text" icon="mdi-trash-can-outline" color="red" @click="() => { }" />
                        <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
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
import { useCampaignStore } from '@/stores/campaign';
import useCsv from '@/composables/useCsv';

const props = defineProps(['campaign'])
const campaignStore = useCampaignStore();
const { downloadCsv } = useCsv();

const route = useRoute();
const slug = route.params.slug as string


const uploader = ref(null);
const isSelecting = ref(false);
const selectedFile = ref(null);

function handleFileImport() {
    isSelecting.value = true;
    window.addEventListener('focus', () => {
        isSelecting.value = false
    }, { once: true });

    uploader.value.click();
};

async function onFileChanged(event: Event) {
    const files = event.target.files[0];
    if (!files.type.match('text/csv')) {
        alert('alert')
        return;
    }
    if (files) {
        selectedFile.value = files;
        uploader.value.value = null;
        await campaignStore.uploadFileDataset(slug, selectedFile.value)
        await campaignStore.getCampaign(slug)
    }
};

async function handleDownload() {
    await downloadCsv(props.campaign.file, props.campaign.file.replace(`coupon/${props.campaign.id}/`, ''));
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
</style>