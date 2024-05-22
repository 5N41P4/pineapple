<template>
    <div>
        <div class="card text-light">
            <div class="card-header">
                <h2>Target</h2>
            </div>
            <div class="card-body justify-content-between">
                <label for="accessPoint.essid">ESSID:</label>
                <input class:="input" v-model="accessPoint.essid" @change="updateTarget('accessPoint', accessPoint)"
                    placeholder="ESSID" />
                <label for="accessPoint.bssid">BSSID:</label>
                <input class:="input" v-model="accessPoint.bssid" @change="updateTarget('accessPoint', accessPoint)"
                    placeholder="BSSID" />
                <label for="accessPoint.channel">Channel:</label>
                <input class:="input" v-model="accessPoint.channel" @change="updateTarget('accessPoint', accessPoint)"
                    placeholder="Channel" />
                <label for="client.station">Client MAC:</label>
                <input class:="input" v-model="client.station" @change="updateTarget('client', client)"
                    placeholder="Client MAC" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            accessPoint: {},
            client: {}
        };
    },
    created() {
        this.accessPoint = { ...this.target.accessPoint };
        this.client = { ...this.target.client };
    },
    computed: {
        ...mapState({
            target: state => state.target
        })
    },
    watch: {
        target: {
            handler(newValue) {
                this.accessPoint = { ...newValue.accessPoint };
                this.client = { ...newValue.client };
            },
            deep: true
        }
    },
    methods: {
        updateTarget(key, value) {
            this.$store.commit('setTarget', { [key]: value });
        }
    }
};
</script>

<style scoped>
.card {
    background-color: #434D49;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.btn-primary {
    background-color: #36BF8D;
    border-color: #36BF8D;
}
</style>