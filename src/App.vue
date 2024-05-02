<script setup>
import Navigation from "./components/TheNavigation.vue";
import Card from "./components/TextCard.vue";
import Mem from "./components/SystemCards/Mem.vue";
import Disk from "./components/SystemCards/Disk.vue";
import Cpu from "./components/SystemCards/Cpu.vue";
</script>

<template>
    <div>
        <Navigation />
        <main class="container">
            <div id="dash" class="row row-cols-md-3 g-10">
                <div class="col">
                    <Disk />
                </div>
                <div class="col">
                    <Cpu />
                </div>
                <div class="col">
                    <Mem />
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
