<template>
  <SplashScreen :isLoading="loading" v-if="loading" />
  <VContainer v-else class="layout-wrapper" :fluid="true">
    <VRow class="content">
      <VCol cols="6" class="logo">
        <VImg :src="Logo" width="500" height="500" />
      </VCol>
      <VCol cols="6">
        <VCard class="card">
          <VForm @submit.prevent="submit">
            <VCardTitle style="color: white; text-align: center; font-size: 48px" class="py-8">
              Login
            </VCardTitle>
            <VCardItem>
              <VLabel class="mb-2" style="color: white">Username</VLabel>
              <VTextField v-model="username.value.value" :error-messages="username.errorMessage.value" variant="outlined"
                bgColor="white" rounded="lg" density="compact" />
              <VLabel class="mb-2" style="color: white">Password</VLabel>
              <VTextField v-model="password.value.value" :error-messages="password.errorMessage.value"
                :type="isShowPassword ? 'text' : 'password'" variant="outlined" bgColor="white" rounded="lg"
                density="compact" :append-inner-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="showPassword" />
              <div class="d-flex justify-center">
                <VBtn type="submit" :loading="isLoading" color="#12BA68" rounded="lg" class="my-6" width="140px">Login
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
import useUser from '@/composables/useUser'
import Logo from '@/assets/images/jmart.png'

const { login, isLoading } = useUser()

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
  await login(values.username, values.password)
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
}

.card {
  background: rgba(255, 255, 255, 0.1);
  width: 500px;
  padding: 24px;
}

.textfield {
  height: 56px;
}
</style>
