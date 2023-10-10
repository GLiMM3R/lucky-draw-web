<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Logo from '@/assets/images/jmart.png'

const drawer = ref(true)

const menuItems = [
  {
    title: 'Home',
    route: '/home',
    icon: 'mdi-gauge',
    value: 'home'
  },
  {
    title: 'Report',
    route: '/report',
    icon: 'mdi-finance',
    value: 'report'
  },
  {
    title: 'Random Draw',
    route: '/random',
    icon: 'mdi-ferris-wheel',
    value: 'random'
  },
  {
    title: 'Wheel Draw',
    route: '/wheel',
    icon: 'mdi-dharmachakra',
    value: 'wheel'
  },
  {
    title: 'Customization',
    route: '/customization',
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
      <VListItem title="General" density="compact" />
      <VListItem :component="RouterLink" v-for="item in menuItems" :key="item.value" :to="item.route"
        :prepend-icon="item.icon" :title="item.title" :value="item.value" height="48px" color="#00AB55"
        class="menu-item" />
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
</style>
