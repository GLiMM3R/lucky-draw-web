<template>
  <div class="d-flex justify-space-around">
    <VMenu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <VImg :src="getLanguage() === 'en' ? English : Laos" width="32" />
        </v-btn>
      </template>
      <VList>
        <VListItem v-for="(item, index) in items" :key="index" :value="index" @click="handleSwitchlanguage(item)">
          <v-list-item-title>
            <VImg :src="item.logo" width="32" />
          </v-list-item-title>
        </VListItem>
      </VList>
    </VMenu>
    <!-- <v-btn class="text-none">
      <v-badge content="2" color="error">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn> -->
    <v-btn class="text-none" variant="text" @click="handleLogout">
      <v-icon size="24">mdi-logout</v-icon>
      <v-tooltip activator="parent" location="bottom">Logout</v-tooltip>
    </v-btn>
    <!-- 
    <VMenu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <v-avatar color="info">
            <v-icon icon="mdi-face-man-shimmer"></v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <VList>
        <VListItem @click="handleLogout">
          <v-list-item-title>
            Logout
          </v-list-item-title>
        </VListItem>
      </VList>
    </VMenu> -->
  </div>
</template>

<script setup lang="ts">
import English from '@/assets/images/united-kingdom.png'
import Laos from '@/assets/images/laos.png'
import { removeAccessToken } from '@/utils/token';
import { useRouter } from 'vue-router';
import { useAppSettingStore } from '@/stores/appsetting';

const router = useRouter();
const { getLanguage, setLanguage } = useAppSettingStore();
const items = [{ logo: English, value: 'en' }, { logo: Laos, value: 'la' }]

const handleLogout = () => {
  removeAccessToken();
  removeAccessToken();
  router.replace('/login')
}

const handleSwitchlanguage = (item: any) => {
  setLanguage(item.value)
  location.reload();
}
</script>