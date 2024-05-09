<template>
    <div class="card">
        <div class="card-body text-light">
            <h5 class="card-title">{{ title }}</h5>
            <Chart :nodes="this.nodes" :links="this.links" />
        </div>
    </div>
</template>

<script>
import Chart from "@/components/atomic/ForceChart.vue";

export default {
    components: {
        Chart
    },
    props: {
        title: String,
    },
    data() {
        return {
            accesspoints: "/api/accesspoints", //"http://localhost:3000/accesspoints",
            clients: "/api/clients", //"http://localhost:3000/clients",
            nodes: [],
            links: []
        };
    },
    async created() {
        const urls = [this.accesspoints, this.clients];

        Promise.all(urls.map(url => fetch(url).then(response => response.json())))
            .then(([accessPoints, clients]) => {
                this.nodes = [...accessPoints, ...clients].map(item => ({
                    id: item.station || item.bssid,
                    group: item.station ? 'client' : 'accessPoint',
                    size: 10 + item.power / 10,
                    title: item.station || item.essid === '' ? item.bssid : item.essid
                }));

                this.links = clients
                .filter(client => client.bssid !== '(not associated)')
                .map(client => ({
                    source: client.station,
                    target: client.bssid,
                    value: client.packets
                }));
                console.log(this.nodes);
                console.log(this.links);
            });

    }
}
</script>

<style scoped>
.card {
    background-color: #434D49;
}
</style>