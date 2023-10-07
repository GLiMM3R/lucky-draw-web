<template>
    <div class="dataset-header">
        <h2 class="title">Coupon Data Set</h2>
        <div>
            <VBtn class="text-none" variant="outlined" rounded="lg" :loading="isSelecting" @click="handleFileImport">+
                Import
                Coupon</VBtn>
            <input ref="uploader" accept=".csv" type="file" class="d-none" @change="onFileChanged" />
            <VBtn class="text-none ml-4" rounded="lg">+ Export Coupon</VBtn>
        </div>
    </div>
    <VCard rounded="lg" color="white" elevation="1">
        <v-table>
            <thead>
                <tr style="background-color: #F4F6F8; color: #637381;">
                    <th class=" text-center border-0">
                        Dataset Name
                    </th>
                    <th class="text-center border-0">
                        Create Date
                    </th>
                    <th class="text-center border-0">
                        Create By
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
import useCampaign from '@/composables/useCampaign';

const props = defineProps(['campaign'])

const route = useRoute();
const slug = route.params.slug as string

const { getCampaign, uploadFileDataset } = useCampaign();


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
        await uploadFileDataset(slug, selectedFile.value)
        await getCampaign(slug)
    }
};

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
</style>