<template>
  <SplashScreen :isLoading="loading" v-if="loading" />
  <VContainer v-else class="layout-wrapper" :fluid="true">
    <VRow class="content" justify="center">
      <VCol cols="12" sm="12" md="12" lg="6" class="logo">
        <VImg :src="Logo" width="600" height="300" />
        <!-- <p>Lucky Draw System</p> -->
      </VCol>
      <VCol cols="12" sm="12" md="12" lg="6" style="display: flex; justify-content: center;">
        <VCard class="card" width="600" height="620">
          <VForm @submit.prevent="submit">
            <VCardTitle style="color: white; text-align: center; font-size: 48px" class="py-16">
              Login
            </VCardTitle>
            <VCardItem>
              <VLabel class="mb-2" style="color: white">{{ $t('textfield.label.username') }}</VLabel>
              <VTextField v-model="username.value.value" :error-messages="username.errorMessage.value" variant="outlined"
                bgColor="white" rounded="lg" density="comfortable" />
              <VLabel class="mb-2" style="color: white">{{ $t('textfield.label.password') }}</VLabel>
              <VTextField v-model="password.value.value" :error-messages="password.errorMessage.value"
                :type="isShowPassword ? 'text' : 'password'" variant="outlined" bgColor="white" rounded="lg"
                density="comfortable" :append-inner-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="showPassword" />
              <div class="d-flex justify-center my-10">
                <VBtn type="submit" :loading="isLoading" color="#12BA68" rounded="lg" class="my-6" width="140px">{{
                  $t('button.login') }}
                </VBtn>
              </div>
            </VCardItem>
          </VForm>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import SplashScreen from '@/components/SplashScreen.vue'
import { useUserStore } from '@/stores/user'
import Logo from '@/assets/images/logo-banner.png'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isLoading } = storeToRefs(userStore)

const loading = ref(true)
const isShowPassword = ref(false)

const showPassword = () => isShowPassword.value = !isShowPassword.value;

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    username(val: string) {
      if (val?.trim().length > 0) return true

      return 'Username is required!'
    },
    password(val: string) {
      if (val?.trim().length > 0) return true

      return 'Password is required!'
    }
  }
})

const username = useField('username')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  await userStore.login(values.username, values.password)
})

setTimeout(() => {
  loading.value = false
}, 1000)
</script>

<style scoped lang="scss">
.layout-wrapper {
  height: 100vh;
  background-color: #028947;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  p {
    position: absolute;
    transform: translate(7%, 150%);
    color: #fff;
    font-size: 24px;
    font-family: 'Poppins';
  }
}

.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 24px;
}

.textfield {
  height: 56px;
}
</style>
