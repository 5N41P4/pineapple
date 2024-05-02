<template>
    <div class="card mb-3 text-light">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <canvas id="barChart"></canvas>
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
                this.renderBarChart(data);
            } catch (error) {
                console.error(error);
            }
        },
        renderBarChart(data) {
            const ctx = document.getElementById('barChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
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
</script>

<style scoped>
    .card {
        background-color: #434D49;
    }
</style>