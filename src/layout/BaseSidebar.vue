<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Logo from '@/assets/images/jmart.png'
import { useI18n } from "vue-i18n";

const i18n = useI18n();
const route = useRoute();
const drawer = ref(true)

const menuItems = [
  {
    title: i18n.t('menuitem.home'),
    route: 'homepage',
    icon: 'mdi-gauge',
    value: 'home'
  },
  {
    title: i18n.t('menuitem.report'),
    route: 'campaign-report',
    icon: 'mdi-finance',
    value: 'report'
  },
  {
    title: i18n.t('menuitem.random'),
    route: 'random-campaign',
    icon: 'mdi-ferris-wheel',
    value: 'random'
  },
  {
    title: i18n.t('menuitem.wheel'),
    route: 'wheel',
    icon: 'mdi-dharmachakra',
    value: 'wheel'
  },
  {
    title: 'Customization',
    route: 'customization',
    icon: 'mdi-tune-vertical-variant',
    value: 'customization'
  }
]
</script>

<template>
  <VNavigationDrawer v-model="drawer" width="280" class="border-1 navigation-drawer" permanent>
    <VListItem class="d-flex justify-center logo">
      <VImg :src="Logo" width="113" style="object-fit: contain;" />
    </VListItem>

    <VListItem class="user-info" title="Hudson Alvarez" subtitle="Admin" nav>
      <template v-slot:prepend>
        <VAvatar size="40px">
          <VImg src="https://randomuser.me/api/portraits/men/85.jpg" />
        </VAvatar>
      </template>
    </VListItem>
    <VList density="comfortable" nav class="list-item">
      <VListItem :title="$t('menuitem.general')" density="compact" />
      <VListItem v-for="item in menuItems" :key="item.value" :prepend-icon="item.icon" :title="item.title"
        :value="item.value" height="48px" color="#00AB55" class="menu-item" :is="RouterLink" :to="{ name: item.route }"
        exact>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped lang="scss">
.logo {
  border-radius: 12px;
  background: #028947;
  height: 70px;
  margin: 13px 20px;
}

.navigation-drawer {
  background: #fff;
}

.user-info {
  background: #919eab14;
  padding: 16px 20px;
  margin: 0 20px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.list-item {
  padding: 0 16px;
  border-radius: 8px;
}

.menu-item {
  padding: 0 12px 0 16px;
}

.active {
  background-color: #028947;
}
</style>
