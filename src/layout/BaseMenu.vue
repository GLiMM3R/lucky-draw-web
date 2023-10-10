<script setup lang="ts">
import English from '@/assets/images/united-kingdom.png'
import Laos from '@/assets/images/laos.png'
const items = [{ logo: English }, { logo: Laos }]
</script>

<template>
  <div class="d-flex justify-space-around">
    <v-btn class="text-none">
      <v-badge content="2" color="error">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    <VMenu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          <VImg :src="English" width="32" />
        </v-btn>
      </template>
      <VList>
        <VListItem v-for="(item, index) in items" :key="index" :value="index">
          <v-list-item-title>
            <VImg :src="item.logo" width="32" />
          </v-list-item-title>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>
