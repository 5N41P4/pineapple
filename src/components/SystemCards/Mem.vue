<template>
    <div class="card text-light">
        <div class="card-body">
            <h5 class="card-title">Memory Usage</h5>
            <h1 id="mem"></h1>
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
                const response = await fetch('/api/mem');
                const data = await response.json();
                this.renderValue(data);
            } catch (error) {
                console.error(error);
            }
        },
        renderValue(data) {
            document.getElementById('mem').innerText = data.memory.toFixed(2) + '%';
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