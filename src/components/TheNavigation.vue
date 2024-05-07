<template>
    <header class="d-flex align-items-center py-3">
        <div class="btn">
            <router-link to="/" class="text-light text-decoration-none"
                >Home</router-link
            >
        </div>
        <div class="btn">
            <router-link to="/filter" class="text-light text-decoration-none"
                >Filter</router-link
            >
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
