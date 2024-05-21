<template>
    <div class="card text-light">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Clients</h5>
            </div>
            <br />
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">Network</th>
                        <th scope="col">Device</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="capture.clients.length > 0">
                    <tr v-for="cl in capture.clients" :key="cl.station">
                        <td>{{ cl.bssid }}</td>
                        <td>{{ cl.station }}</td>
                        <td class="dropdown-cell">
                            <button type="button" class="btn btn-light btn-sm"
                                @click="toggleDropdown(cl.station)">...</button>
                            <div v-if="activeDropdown === cl.station" class="custom-dropdown-menu">
                                <AddClButton :apiEndpoint="getFilterEndpoint()" :itemID="cl.station" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import AddClButton from "@/components/atomic/AddButton.vue"
export default {
    data() {
        return {
            activeDropdown: null,
            filterEndpoint: "/api/filter/clients"
        };
    },
    computed: {
        ...mapState(["capture"])
    },
    methods: {
        getFilterEndpoint() {
            return this.filterEndpointEndpoint;
        },
        toggleDropdown(station) {
            this.activeDropdown = this.activeDropdown === station ? null : station;
        },
    },
    components: {
        AddClButton
    }
};
</script>

<style scoped>
.card {
    background-color: #434d49;
}

.btn-primary {
    background-color: #36bf8d;
    border-color: #36bf8d;
}

.dropdown-cell {
    position: relative;
}

.custom-dropdown-menu {
    position: absolute;
    top: 0%;
    right: 100%;
    background-color: #434d49;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: fit-content;
    z-index: 100;
}

.custom-dropdown-menu button {
    margin: 0.5rem;
}
</style>
