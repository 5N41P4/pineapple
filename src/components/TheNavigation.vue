<template>
    <header class="d-flex align-items-center py-3">
        <div class="btn">
            <router-link to="/" class="text-light text-decoration-none">Recon</router-link>
        </div>
        <div class="btn">
            <router-link to="/capture" class="text-light text-decoration-none">Capture</router-link>
        </div>
        <div class="btn">
            <router-link to="/filter" class="text-light text-decoration-none">Filter</router-link>
        </div>
        <div class="btn">
            <router-link to="/maps" class="text-light text-decoration-none">Map</router-link>
        </div>
        <div class="btn">
            <router-link to="/scheduler" class="text-light text-decoration-none">Schedule</router-link>
        </div>
    </header>
</template>

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

router-link {
    margin: 1rem;
}
</style>
