<template>
    <v-btn size="small" variant="text" icon="mdi-dots-vertical" @click="() => { }" />
    <v-dialog v-model="dialog" activator="parent" width="400">
        <v-card>
            <template v-slot:append>
                <VBtn variant="text" size="md" color="red" icon="mdi-close" @click="dialog = false"></VBtn>
            </template>
            <v-card-title style="text-align: center">
                Edit Coupon
            </v-card-title>
            <VCardItem>
                <VContainer>
                    <VForm @submit.prevent="submit">
                        <VTextField label="Customer Name" v-model="name.value.value"
                            :error-messages="name.errorMessage.value" variant="outlined" rounded="lg" />
                        <VTextField label="Phone Number" v-model="phoneNumber.value.value"
                            :error-messages="phoneNumber.errorMessage.value" type="number" variant="outlined"
                            rounded="lg" />
                        <v-btn color="primary" type="submit" rounded="lg" block class="my-4">Confirm</v-btn>
                    </VForm>
                </VContainer>
            </VCardItem>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { useRoute } from 'vue-router';

const route = useRoute();
const slug = route.params.slug as string
const props = defineProps(['customer'])
const emit = defineEmits(['handleUpdateCoupon'])
const dialog = ref(false)

const { handleSubmit, handleReset } = useForm({
    initialValues: {
        name: props.customer.name,
        phoneNumber: props.customer.phone,
    },
    validationSchema: {
        name(val: string) {
            if (val?.trim().length > 0) return true

            return 'Title is required!'
        },
        phoneNumber(val: string) {
            if (val.trim().length > 7) return true

            return 'Phone number > 7!'
        },
    }
})

const name = useField('name')
const phoneNumber = useField('phoneNumber')

const submit = handleSubmit(async (values) => {
    emit('handleUpdateCoupon', { ...values, id: props.customer.id })
    handleReset();
    dialog.value = false
})
</script>