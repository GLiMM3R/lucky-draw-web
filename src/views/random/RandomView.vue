<template>
    <VContainer>
        <VRow>
            <VCol>
                <h2 class="title">Random Draw</h2>
                <v-breadcrumbs :items="items" class="breadcrumbs" density="compact">
                    <template v-slot:divider>
                        <v-icon icon="mdi-circle-small "></v-icon>
                    </template>
                </v-breadcrumbs>
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
                    <VWindowItem v-for="n in 2" :key="n" :value="n" style="padding: 16px 0;">
                        <VCard color="white">
                            <VContainer fluid>
                                <VCardTitle>
                                    <VTextField v-model="search" variant="outlined" prepend-inner-icon="mdi-magnify"
                                        placeholder="Search..." />
                                </VCardTitle>
                                <VDataTable :headers="headers" :items="campaigns" :search="search" show-select></VDataTable>
                            </VContainer>
                        </VCard>
                    </VWindowItem>
                </VWindow>
            </VContainer>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import LogoStatic from '@/assets/images/campaign_static.png'
import LogoDone from '@/assets/images/done.png'
import StaticCard from '@/components/StaticCard.vue';
import { ref } from 'vue';

const tab = ref(null)
const search = ref('')

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
        title: 'Random Draw',
        disabled: true,
        href: '/random',
    }
];

const headers = [
    {
        key: 'title',
        title: 'Campaign Name'
    },
    {
        key: 'createdAt',
        title: 'Create Date'
    },
    {
        key: 'createdBy',
        title: 'Create By'
    },
    {
        key: 'prizeCap',
        title: 'Winning quota'
    },
]

const campaigns = [
    {
        "title": "campaign1",
        "createdAt": "2022",
        "createdBy": "author1",
        "prizeCap": 10000
    },
    {
        "title": "campaign2",
        "createdAt": "2021",
        "createdBy": "author2",
        "prizeCap": 5000
    },
    {
        "title": "campaign3",
        "createdAt": "2020",
        "createdBy": "author3",
        "prizeCap": 8000
    },
    {
        "title": "campaign4",
        "createdAt": "2019",
        "createdBy": "author4",
        "prizeCap": 12000
    },
    {
        "title": "campaign5",
        "createdAt": "2018",
        "createdBy": "author5",
        "prizeCap": 15000
    },
    {
        "title": "campaign6",
        "createdAt": "2017",
        "createdBy": "author6",
        "prizeCap": 20000
    },
    {
        "title": "campaign7",
        "createdAt": "2016",
        "createdBy": "author7",
        "prizeCap": 25000
    },
    {
        "title": "campaign8",
        "createdAt": "2015",
        "createdBy": "author8",
        "prizeCap": 30000
    },
    {
        "title": "campaign9",
        "createdAt": "2014",
        "createdBy": "author9",
        "prizeCap": 35000
    },
    {
        "title": "campaign10",
        "createdAt": "2013",
        "createdBy": "author10",
        "prizeCap": 40000
    }
]
</script>

<style scoped lang="scss">
.title {
    font-size: 36px;
    font-weight: 700;
    padding-left: 2px;
}

.breadcrumbs {
    padding: 0;
}

.static-detail {
    margin: auto 0;
}
</style>