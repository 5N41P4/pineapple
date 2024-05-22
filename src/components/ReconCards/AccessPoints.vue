<template>
    <div class="card text-light">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">Accesspoints</h5>
                <div class="btn-group">
                    <RefreshButton :apiEndpoint="getApiEndpoint()" />
                    <ResetButton :apiEndpoint="getApiEndpoint()" />
                </div>
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
                                <button type="button" class="btn btn-primary btn-sm"
                                    @click="setTargetAccesspoint(ap)">Target</button>
                                <AddApButton :apiEndpoint="getFilterEndpoint()" :itemID="ap.bssid" />
                                <DeleteButton :apiEndpoint="getApiEndpoint()" :itemID="ap.bssid" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import RefreshButton from "@/components/atomic/RefreshButton.vue"
import DeleteButton from "@/components/atomic/DeleteButton.vue"
import ResetButton from "@/components/atomic/ResetButton.vue"
import AddApButton from "@/components/atomic/AddButton.vue"
export default {
    data() {
        return {
            activeDropdown: null,
            apiEndpoint: "/api/accesspoints",
            filterEndpoint: "/api/filter/aps"
        };
    },
    computed: {
        ...mapState(["accesspoints"])
    },
    created() {
        this.$store.dispatch("fetchAccesspoints");
        this.updateTimer();
    },
    methods: {
        ...mapMutations(["setTarget"]),
        setTargetAccesspoint(accessPoint) {
            this.setTarget({ accessPoint });
        },
        toggleDropdown(bssid) {
            this.activeDropdown = this.activeDropdown === bssid ? null : bssid;
        },
        getApiEndpoint() {
            return this.apiEndpoint;
        },
        getFilterEndpoint() {
            return this.filterEndpoint;
        },
        updateTimer() {
            setInterval(() => {
                this.$store.dispatch("fetchAccesspoints");
            }, 30000);
        },
    },
    components: {
        RefreshButton,
        DeleteButton,
        ResetButton,
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
