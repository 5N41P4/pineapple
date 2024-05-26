<script setup>
import Navigation from "@/components/TheNavigation.vue";
import Mem from "@/components/SystemCards/Mem.vue";
import Disk from "@/components/SystemCards/Disk.vue";
import Cpu from "@/components/SystemCards/Cpu.vue";
</script>

<template>
    <div>
        <Navigation />
        <main class="container">
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped>
main {
    padding-top: 7rem;
}
</style>
