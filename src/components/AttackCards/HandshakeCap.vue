<template>
    <div class="card text-light">
        <div class="card-body">
            <h4 class="card-title">Handshake Capture</h4>
            <h5 class="card-title">Interface</h5>
                <select class="form-dropdown w-50" v-model="selectedInterface" id="interface">
                    <option v-for="iface in interfaces" :key="iface" :value="iface"
                        :disabled="iface.mode !== 'up' && iface.mode !== 'capture'">
                        {{ iface.name }}
                    </option>
                </select>
            <br />
            <SwitchButton v-if="isIfFetched && selectedInterface != null" @switchStateChanged="handleSwitchChanged"
                label="DeAuth" :initialSwitchState="initialSwitchState" />
            <br />
            <div class="d-flex btn-group">
                <button @click="sendStart" class="btn btn-primary"
                    :disabled="!isValidTarget || !(selectedInterface && selectedInterface.mode != 'accesspoint')">
                    Start
                </button>
                <button @click="sendStop" :disabled="!(selectedInterface && selectedInterface.mode == 'accesspoint')"
                    class="btn btn-danger">
                    Stop
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SwitchButton from "@/components/atomic/SwitchButton.vue"
export default {
    data() {
        return {
            selectedInterface: null,
            isIfFetched: false,
            switchState: false,
            validTarget: false,
        };
    },
    created() {
        this.$store.dispatch("fetchInterfaces").then(() => {
            this.selectedInterface = this.interfaces.find(iface => iface.mode === 'accesspoint') || this.interfaces.find(iface => iface.mode === 'up');
            this.isIfFetched = true;
        })
    },
    watch: {
        selectedInterface() {
            this.switchState = this.selectedInterface?.deauth === 'true' ? true : false;
        }
    },
    computed: {
        ...mapState(["interfaces", "target"]),
        initialSwitchState() {
            return this.selectedInterface?.deauth;
        },
    },
    methods: {
        sendStart() {
            const jsonData = {
                action: "accesspoint",
                time: 0,
                target: {
                    bssid: this.target.accessPoint.bssid ? this.target.accessPoint.bssid : "",
                    essid: this.target.accessPoint.essid,
                    station: this.target.client.station ? this.target.client.station : "",
                    channel: this.target.accessPoint.channel.toString(),
                    privacy: this.target.accessPoint.privacy,
                },
                deauth: this.switchState,
            };
            fetch("/api/interfaces/" + this.selectedInterface.name, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data sent successfully:", data)
                    this.fetchInterfaces();
                })
                .catch((error) => console.error("Error sending data:", error));
            location.reload();
        },
        sendStop() {
            const jsonData = {
                action: "stop",
            };
            fetch("/api/interfaces/" + this.selectedInterface.name, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data sent successfully:", data)
                    this.fetchInterfaces();
                })
                .catch((error) => console.error("Error sending data:", error));
            location.reload();
        },
        handleSwitchChanged(newVal) {
            console.log(`The switch state has changed to ${newVal}`)
        },
        isValidTarget() {
            if (this.target.channel && this.target.privacy && this.target.essid) {
                return true;
            }
            return false;
        }
    },
    components: {
        SwitchButton,
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
</style>
