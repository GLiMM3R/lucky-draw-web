<template>
    <VContainer>
        <VRow>
            <VCol>
                <div class="title">Random Draw</div>
                <Breadcrumbs :items="items" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol cols="12" md="6" lg="4" xl="3" v-for="item, index in statics" :key="index">
                <StaticCard :item="item" />
            </VCol>
        </VRow>
        <VRow>
            <VContainer>
                <VTabs v-model="tab" color="primary" align-tabs="start">
                    <VTab :value="1">New</VTab>
                    <VTab :value="2">Done</VTab>
                </VTabs>
                <VWindow v-model="tab">
                    <VWindowItem v-for="n in 2" :key="n" :value="n" style="padding: 16px 4px;">
                        <VSheet elevation="1" rounded="lg" color="white">
                            <VCardTitle class="d-flex">
                                <VTextField v-model="search" variant="outlined" density="comfortable"
                                    prepend-inner-icon="mdi-magnify" placeholder="Search..." />
                                <CreateCampaignModal @handleSubmit="handleSubmit" :isLoading="isLoading" />
                            </VCardTitle>
                            <RandomCampaignTable :campaigns="campaignState.campaigns" :search="search" />
                        </VSheet>
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import LogoStatic from '@/assets/images/campaign_static.png'
import LogoDone from '@/assets/images/done.png'
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import StaticCard from '@/components/StaticCard.vue';
import CreateCampaignModal from '@/components/CreateCampaignModal.vue';
import RandomCampaignTable from '@/components/random/RandomCampaignTable.vue';
import useCampaign from '@/composables/useCampaign';
import { ref, onMounted } from 'vue';

const { campaignState, addCampaign, getCampaigns, isLoading } = useCampaign();
const tab = ref(null)
const search = ref('')

const handleSubmit = async (values: any) => {
    await addCampaign({ title: values.title, prizeCap: Number(values.prizeCap), campaignType: 'random' })
    await getCampaigns('random');
}

onMounted(async () => {
    await getCampaigns('random');
})

const statics = [
    {
        value: '8.2',
        text: 'New Campagins',
        logo: LogoStatic
    },
    {
        value: '124',
        text: 'Done',
        logo: LogoDone
    },
]

const items = [
    {
        title: 'Home',
        disabled: false,
        href: '/home',
    },
    {
        title: 'Random Draw',
        disabled: true,
        href: '/random',
    },
];

</script>

<style scoped lang="scss">
.title {
    font-size: 24px;
    font-weight: 600;
    padding-left: 2px;
}

.static-detail {
    margin: auto 0;
}
</style>