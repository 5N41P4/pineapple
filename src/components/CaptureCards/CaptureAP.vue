<template>
    <div class="card text-light">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Accesspoints</h5>
            </div>
            <br />
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ESSID</th>
                        <th scope="col">BSSID</th>
                        <th scope="col">Security</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody v-if="accesspoints.length > 0">
                    <tr v-for="ap in accesspoints" :key="ap.bssid">
                        <td>{{ ap.essid }}</td>
                        <td>{{ ap.bssid }}</td>
                        <td>{{ ap.privacy }}</td>
                        <td class="dropdown-cell">
                            <button type="button" class="btn btn-light btn-sm"
                                @click="toggleDropdown(ap.bssid)">...</button>
                            <div v-if="activeDropdown === ap.bssid" class="custom-dropdown-menu">
                                <AddApButton :apiEndpoint="getFilterEndpoint()" :itemID="ap.bssid" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import AddApButton from "@/components/atomic/AddButton.vue"
export default {
    props: {
        accesspoints: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeDropdown: null,
            filterEndpoint: "/api/filter/aps"
        };
    },
    methods: {
        toggleDropdown(bssid) {
            this.activeDropdown = this.activeDropdown === bssid ? null : bssid;
        },
        getFilterEndpoint() {
            return this.filterEndpoint;
        },
    },
    components: {
        AddApButton
    },
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
