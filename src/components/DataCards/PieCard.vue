<template>
    <div class="card text-light mb-3">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <canvas id="pieChart"></canvas>
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
        this.fetchPieData();
    },
    methods: {
        fetchPieData() {
            fetch('http://192.168.1.172:8080/api/test')
                .then(response => response.json())
                .then(data => {
                    // Use the fetched data in the renderPieChart method
                    this.renderPieChart(data);
                })
                .catch(error => {
                    console.error('Error fetching pie data:', error);
                });
        },
        renderPieChart(data) {
            const ctx = document.getElementById('pieChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
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