<template>
    <div class="card text-light">
        <div class="card-body">
            <h5 class="card-title">Disk Usage</h5>
            <h1 id="disk"></h1>
            <div v-if="chart">
                <canvas id="pieChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    components: {
        Chart,
    },
    mounted: function () {
        this.fetchData();
        this.updateTimer();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('/api/disk');
                const data = await response.json();
                this.renderValue(data);
                if (this.chart) {
                    this.renderPieChart(data);
                }
            } catch (error) {
                console.error(error);
            }
        },
        renderPieChart(data) {
            const ctx = document.getElementById('pieChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        "Used Disk Space",
                        "Free Disk Space"
                    ],
                    datasets: [
                        {
                            label: "GB",
                            data: [data.used, data.free],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.3)",
                                "rgba(54, 162, 235, 0.3)"
                            ],
                            borderColor: "white",
                            borderWidth: 1
                        }
                    ]
                },

            });
        },
        renderValue(data) {
            document.getElementById('disk').innerText = data.percent.toFixed(2) + '%';
        },
        updateTimer() {
            setInterval(() => {
                this.fetchData();
            }, 20000);
        },
    },
    props: {
        chart: {
            type: Boolean,
            default: false,
        },
    },
};

</script>

<style scoped>
.card {
    background-color: #434D49;
}

h1 {
    text-align: center;
}
</style>
