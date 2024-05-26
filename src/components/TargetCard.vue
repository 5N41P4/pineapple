<template>
    <div>
        <div class="card text-light">
            <div class="card-header">
                <h5>Target</h5>
            </div>
            <div class="card-body">
                <div class="row row-sm2">
                    <div class="col">
                        <label for="accessPoint.essid">ESSID:</label>
                        <input class:="input" v-model="accessPoint.essid"
                            @change="updateTarget('accessPoint', accessPoint)" placeholder="Example" />
                        <label for="accessPoint.bssid">BSSID:</label>
                        <input class:="input" v-model="accessPoint.bssid"
                            @change="updateTarget('accessPoint', accessPoint)" placeholder="AA:BB:CC:DD:EE:FF" />
                        <label for="accessPoint.channel">Channel:</label>
                        <input class:="input" v-model="accessPoint.channel"
                            @change="updateTarget('accessPoint', accessPoint)" placeholder="[1-16]" />
                    </div>
                    <div class="col">
                        <label for="accessPoint.channel">Privacy:</label>
                        <input class:="input" v-model="accessPoint.privacy"
                            @change="updateTarget('accessPoint', accessPoint)" placeholder="[WEP|WPA|WPA2|WPA3]" />
                        <br />
                        <span>Client:</span>
                        <label for="client.station">MAC:</label>
                        <input class:="input" v-model="client.station" @change="updateTarget('client', client)"
                            placeholder="FF:EE:DD:CC:BB:AA" />
                    </div>
                </div>
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
        isValidMac() {
            const macRegex = /^$|^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
            return macRegex.test(this.target);
        },
        updateTarget(key, value) {
            if ((key === 'BSSID' || key === 'client') && !this.isValidMacAddress(value.station)) {
                return;
            }
            this.$store.commit('setTarget', { [key]: value });
        }
    }
};
</script>

<style scoped>
.card {
    background-color: #434D49;
}

.card-body .col {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.btn-primary {
    background-color: #36BF8D;
    border-color: #36BF8D;
}
</style>