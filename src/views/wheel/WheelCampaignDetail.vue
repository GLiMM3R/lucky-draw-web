<template>
    <VContainer>
        <VRow class="static">
            <VCol>
                <CustomerTable v-if="campaign?.coupons" :coupon="campaign.coupons"
                    @handleSelectCoupon="handleSelectCoupon" />
            </VCol>
        </VRow>
        <VRow class="static">
            <VCol>
                <PrizeTable v-if="campaign?.prizes" :prizes="campaign.prizes" type="wheel" />
            </VCol>
        </VRow>
        <VRow justify="center">
            <Suspense>
                <WheelDialog v-if="campaign" :campaign="campaign" :coupon="selectedCoupon"
                    @resetSelectCoupon="resetSelectCoupon" />
            </Suspense>
        </VRow>
    </VContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useCampaignStore } from '@/stores/campaign';

import WheelDialog from '@/components/wheel/WheelDialog.vue';
import PrizeTable from '@/components/campaign/PrizeTable.vue';
import CustomerTable from '@/components/wheel/CustomerTable.vue';
import { ref } from 'vue';

const route = useRoute();
const slug = route.params.slug as string

const campaignStore = useCampaignStore();
const { campaign } = storeToRefs(campaignStore);

const selectedCoupon = ref('');

const handleSelectCoupon = (value: string) => {
    selectedCoupon.value = value;
}

const resetSelectCoupon = () => {
    selectedCoupon.value = '';
}

onMounted(async () => {
    await campaignStore.getCampaignBySlug(slug)
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
</style>