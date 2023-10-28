<template>
    <VCard class="shadow">
        <VCardTitle>Customer</VCardTitle>
        <Doughnut :data="chartData" :options="chartOptions" />
    </VCard>
</template>

<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { ChartOptions, ChartConfiguration } from 'chart.js'
ChartJS.register(ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    labels: ['Ban', 'Gold', 'Jmart', 'New'],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [40, 20, 80, 10]
        }
    ]
};

const chartOptions = {
    cutout: '80%',
    responsive: true,
    plugins: {
        // title: {
        //     display: true,
        //     text: 'Custom Chart Title',
        //     position: 'bottom'
        // },
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                usePointStyle: true,
                boxWidth: 6
            }
        },
    }
};
</script>

<style scoped>
.shadow {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20);
}
</style>