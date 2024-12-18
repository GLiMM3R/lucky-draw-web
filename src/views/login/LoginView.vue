<template>
  <VApp>
    <VLayout :full-height="true">
      <VMain style="position: relative;" class="layout-wrapper">
        <SplashScreen :isLoading="loading" v-if="loading" />
        <VContainer v-else class="content-wrapper">
          <VRow class="content" justify="center">
            <VCol cols="12" sm="12" md="12" lg="5" class="logo">
              <VImg :src="Logo" :width="width * 0.4" class="mx-auto" />
            </VCol>
            <VSpacer />
            <VCol cols="12" sm="12" md="12" lg="5" style="display: flex; justify-content: center;">
              <VCard class="card" width="600" height="620">
                <VForm @submit.prevent="submit">
                  <VCardTitle style="color: white; text-align: center; font-size: 48px;" class="py-16">
                    Login
                  </VCardTitle>
                  <VCardItem>
                    <VLabel class="mb-2" style="color: white">Username</VLabel>
                    <VTextField v-model="username.value.value" :error-messages="username.errorMessage.value"
                      variant="outlined" autofocus bgColor="white" rounded="lg" density="comfortable" />
                    <VLabel class="mb-2" style="color: white">Password</VLabel>
                    <VTextField v-model="password.value.value" :error-messages="password.errorMessage.value"
                      :type="isShowPassword ? 'text' : 'password'" variant="outlined" bgColor="white" rounded="lg"
                      density="comfortable"
                      :append-inner-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
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
      </VMain>
    </VLayout>
  </VApp>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useForm, useField } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { useAppSettingStore } from '@/stores/appsetting'
import SplashScreen from '@/components/SplashScreen.vue'
import Logo from '@/assets/images/logo-banner.png'
import { removeAccessToken, removeRefreshToken } from '@/utils/token'
import { useDisplay } from 'vuetify'

const userStore = useUserStore()
const { isLoading } = storeToRefs(userStore)
const { setLanguage } = useAppSettingStore()
const { width } = useDisplay();

const loading = ref(true)
const isShowPassword = ref(false)

const showPassword = () => isShowPassword.value = !isShowPassword.value;

onMounted(() => {
  setLanguage('en')
  removeAccessToken()
  removeRefreshToken()
  document.title = `Login`
})

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
  background-color: #028947;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1400px;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
}

.logo {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;

  p {
    position: absolute;
    transform: translate(7%, 150%);
    color: #fff;
    font-size: 24px;
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
