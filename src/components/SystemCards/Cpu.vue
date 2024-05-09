<template>
    <div class="card text-light">
        <div class="card-body">
            <h5 class="card-title">Load Avg</h5>
            <div class="row">
                <h3 id="loadavg1" class="col mx-auto text-center"></h3>
                <h3 id="loadavg2" class="col mx-auto text-center"></h3>
                <h3 id="loadavg3" class="col mx-auto text-center"></h3>
            </div>

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
            document.getElementById('loadavg1').innerText = data.load1.toFixed(2) 
            document.getElementById('loadavg2').innerText = data.load5.toFixed(2) 
            document.getElementById('loadavg3').innerText = data.load15.toFixed(2);
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
