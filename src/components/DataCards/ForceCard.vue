<template>
    <div class="card">
        <div class="card-body text-light">
            <h5 class="card-title">{{ title }}</h5>
            <Chart :nodes="this.nodes" :links="this.links" />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Chart from "@/components/atomic/ForceChart.vue";

export default {
    components: {
        Chart
    },
    props: {
        title: String,
        loadData: String, // Add a new prop
    },
    data() {
        return {
            nodes: [],
            links: []
        };
    },
    computed: {
        ...mapState(["accesspoints", "clients", "capture"]) // Add 'capture' to the mapped state
    },
    methods: {
        ...mapActions(["fetchAccesspoints", "fetchClients", "fetchCapture"]), // Add 'fetchCapture' to the mapped actions
        processData(accessPoints, clients) {
            this.nodes = [...accessPoints, ...clients].map(item => ({
                id: item.station || item.bssid,
                group: item.station ? 'client' : 'accessPoint',
                size: 10 + Math.log(100 + item.power > 0 ? 100 + item.power : 1) / 10,
                title: item.station || item.essid === '' ? item.bssid : item.essid,
                isMock: false // Add a new property to indicate whether the node is a mock node
            }));

            // Create a set of all node IDs for efficient lookup
            const nodeIds = new Set(this.nodes.map(node => node.id));

            this.links = [];

            clients.forEach(client => {
                // If the bssid is not in the nodes array, add a mock node
                if (!nodeIds.has(client.bssid) && client.bssid !== '(not associated)') {
                    this.nodes.push({
                        id: client.bssid,
                        group: 'accessPoint',
                        size: 5, // Use a default size
                        title: client.bssid,
                        isMock: true // Indicate that this is a mock node
                    });
                    nodeIds.add(client.bssid);
                }

                // If the bssid is '(not associated)', add a mock node only if it doesn't exist yet
                if (client.bssid === '(not associated)' && !nodeIds.has('(not associated)')) {
                    this.nodes.push({
                        id: '(not associated)',
                        group: 'accessPoint',
                        size: 5, // Use a default size
                        title: '(not associated)',
                        isMock: true // Indicate that this is a mock node
                    });
                    nodeIds.add('(not associated)');
                }

                // Add a link between the client and the bssid
                this.links.push({
                    source: client.station,
                    target: client.bssid,
                    value: client.packets
                });

                // If the client has probed essids, add a mock node for each one and a link between the client and the essid
                if (client['probed essids']) {
                    client['probed essids'].split(',').forEach(essid => {
                        if (!nodeIds.has(essid)) {
                            this.nodes.push({
                                id: essid,
                                group: 'accessPoint',
                                size: 5, // Use a default size
                                title: essid,
                                isMock: true // Indicate that this is a mock node
                            });
                            nodeIds.add(essid);
                        }

                        // Add a link between the client and the probed essid
                        this.links.push({
                            source: client.station,
                            target: essid,
                            value: client.packets
                        });
                    });
                }
            });
        }
    },
    async created() {
        if (this.loadData === 'accesspointsAndClients') {
            await Promise.all([this.fetchAccesspoints(), this.fetchClients()]);
            this.processData(this.accesspoints, this.clients);
        } else if (this.loadData === 'capture') {
            await this.fetchCapture();
            this.processData(this.capture.accesspoints, this.capture.clients);
        }
    }
}
</script>

<style scoped>
.card {
    background-color: #434D49;
}
</style>