<template>
    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
    <v-dialog v-model="dialog" activator="parent" width="400">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                {{ $t('modalTitle.editCustomer') }}
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField :label="$t('textfield.label.customerName')" v-model="name.value.value"
                            :error-messages="name.errorMessage.value" variant="outlined" rounded="lg" />
                        <VTextField :label="$t('textfield.label.customerPhone')" v-model="phoneNumber.value.value"
                            :error-messages="phoneNumber.errorMessage.value" type="number" variant="outlined"
                            rounded="lg" />
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4" :loading="isLoading">{{
                            $t('button.confirm')
                        }}</v-btn>
                    </VForm>
                </VContainer>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useI18n } from "vue-i18n";
import { useCouponStore } from '@/stores/coupon';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

const route = useRoute();
const slug = route.params.slug as string
const i18n = useI18n();
const props = defineProps(['customer'])
const couponStore = useCouponStore();
const { isLoading } = storeToRefs(couponStore);
const dialog = ref(false)

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        name: props.customer.name,
        phoneNumber: props.customer.phone,
    },
    validationSchema: {
        name(val: string) {
            if (val) return true

            return i18n.t('validate.customerName')
        },
        phoneNumber(val: string) {
            if (val?.length >= 7) return true

            return i18n.t('validate.customerPhone')
        },
    }
})

const name = useField('name')
const phoneNumber = useField('phoneNumber')

const submit = handleSubmit(async (values) => {
    await couponStore.updateCoupon(props.customer.id, slug, { name: values.name, phone: values.phoneNumber })
    handleReset();
    dialog.value = false
})
</script>