<template>
    <header class="d-flex align-items-center py-3 justify-content-between">
        <div class="d-flex align-items-center">
            <div class="btn">
                <router-link to="/" class="text-light text-decoration-none">Recon</router-link>
            </div>
            <div class="btn">
                <router-link to="/capture" class="text-light text-decoration-none">Capture</router-link>
            </div>
            <div class="btn">
                <router-link to="/attack" class="text-light text-decoration-none">Attacks</router-link>
            </div>
            <div class="btn">
                <router-link to="/scheduler" class="text-light text-decoration-none">Schedule</router-link>
            </div>
            <div class="btn">
                <router-link to="/filter" class="text-light text-decoration-none">Filter</router-link>
            </div>
        </div>
        <div class="d-flex flex-column align-items-center text-light">
            <span>Disk: <small id="disk">{{ system.disk && system.disk.percent ? system.disk.percent.toFixed(2) + '%' : 'Loading...'
                    }}</small></span>
            <span>Load: <small id="load">{{ system.cpu && system.cpu.load5 ? system.cpu.load5.toFixed(2) : 'Loading...'
                    }}</small></span>
            <span>Mem: <small id="mem">{{ system.mem && system.mem.memory ? system.mem.memory.toFixed(2) + '%' : 'Loading...'
                    }}</small></span>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['system']),
    },
    created() {
        this.$store.dispatch('fetchSystem');
    },
    methods: {
        updateTimer() {
            setInterval(() => {
                this.$store.dispatch('fetchSystem');
            }, 10000);
        },
    },
};
</script>

<style scoped>
header {
    background-color: #438c72;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* Adjust padding/margin as needed */
    padding: 1rem;
    /* Ensure header stays above other elements */
    z-index: 10;
}

.span {
    font-size: 0.5rem;
    margin: 0;
}

router-link {
    margin: 1rem;
}
</style>
