<template>
    <div class="card mb-3 text-light">
        <div class="card-body">
            <h5 class="card-title">CPU Usage</h5>
            <h2 id="loadavg"></h2>
        </div>
    </div>
</template>

<script>
export default {
    mounted: function () {
        this.fetchData();
        this.updateTimer();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('/api/cpu');
                const data = await response.json();
                this.renderValue(data);
            } catch (error) {
                console.error(error);
            }
        },
        renderValue(data) {
            document.getElementById('loadavg').innerText = "Load AVG: " + data.load1.toFixed(2) + " " + data.load5.toFixed(2) + " " + data.load15.toFixed(2);
        },
        updateTimer() {
            setInterval(() => {
                this.fetchData();
            }, 10000);
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
