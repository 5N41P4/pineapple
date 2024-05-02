<template>
    <div class="card text-light mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <canvas id="lineChart"></canvas>
            </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    components: {
        Chart,
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://192.168.1.172:8080/api/test');
                const data = await response.json();
                this.renderLineChart(data);
            } catch (error) {
                console.error(error);
            }
        },
        renderLineChart(data) {
            const ctx = document.getElementById('lineChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [data.datasets[0]], // Corrected datasets property
                },
                options: {
                    // Add any custom options for the pie chart here
                },
            });
        },
    },
    props: {
        title: {
            type: String,
            default: "",
        },
    },
};
</script>$

<style scoped>
    .card {
        background-color: #434D49;
    }
</style>