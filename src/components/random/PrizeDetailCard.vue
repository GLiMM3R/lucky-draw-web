<template>
    <VCard color="primary" class="d-flex flex-column justify-center" :width="props.width ? props.width : 300"
        :height="props?.height">
        <VCardTitle class="text-center prize-header-detail pa-1">
            {{ $t('table.prize.rank') }} {{ props.rank }}
        </VCardTitle>
        <VCardItem class="pa-0">
            <!-- <VRow align-content="center" no-gutters>
                <VCol>
                    <VCardText class="pa-0 prize-detail">
                        {{ $t('table.prize.title') }}:
                    </VCardText>
                </VCol>
                <VCol>
                    <VCardText class="pa-0 text-right prize-detail text-center">
                        {{ capitalizeLetter(props.title) }}
                    </VCardText>
                </VCol>
            </VRow>
            <VRow align-content="center" class="" no-gutters>
                <VCol>
                    <VCardText class="pa-0 prize-detail">
                        {{ $t('table.prize.prizeAmount') }}:
                    </VCardText>
                </VCol>
                <VCol>
                    <VCardText class="pa-0 text-right prize-detail">
                        {{ props.amount }}
                    </VCardText>
                </VCol>
            </VRow> -->
            <v-list-item :title="$t('table.prize.title')" :subtitle="capitalizeLetter(props.title)"></v-list-item>
            <v-list-item :title="$t('table.prize.prizeAmount')" :subtitle="props.amount"></v-list-item>
        </VCardItem>
    </VCard>
</template>

<script setup lang="ts">
import { capitalizeLetter } from '@/utils/capitalizeLetter';

const props = defineProps(['title', 'rank', 'amount', 'width', 'height'])
</script>

<style>
.prize-header-detail {
    color: #FED066;
    font-weight: 700;
    font-size: 1.4rem;
}

.prize-detail {
    font-weight: 600;
    font-size: 1rem;
}
</style> 