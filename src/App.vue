<script setup>
import Navigation from "./components/TheNavigation.vue";
import Mem from "./components/SystemCards/Mem.vue";
import Disk from "./components/SystemCards/Disk.vue";
import Cpu from "./components/SystemCards/Cpu.vue";
</script>

<template>
    <div>
        <Navigation />
        <main class="container">
            <div id="dash" class="row">
                <div class="col-lg-4 d-flex align-items-stretch">
                    <Disk class="flex-grow-1" />
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                    <Cpu class="flex-grow-1" />
                </div>
                <div class="col-lg-4 d-flex align-items-stretch">
                    <Mem class="flex-grow-1" />
                </div>
            </div>
            <hr />
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped>
#dash {
    padding-top: 5rem;
}
</style>
