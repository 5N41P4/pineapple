<template>
    <div class="card text-light">
        <div class="card-body">
            <h4 class="card-title">Capture</h4>
            <h5 class="card-title">Interface</h5>
            <div class="row row-sm2">
                <select class="col form-dropdown" v-model="selectedInterface" id="interface">
                    <option v-for="iface in interfaces" :key="iface" :value="iface"
                        :disabled="iface.mode !== 'up' && iface.mode !== 'capture'">
                        {{ iface.name }}
                    </option>
                </select>
            </div>
            <br>
            <div class="row row-sm2">
                <input type="text form-input" v-model="selectedMac" placeholder="Target MAC [BSSID|Device]">
            </div>
            <br />
            <SwitchButton v-if="isIfFetched && selectedInterface != null" @switchStateChanged="handleSwitchChanged"
                label="DeAuth" :initialSwitchState="initialSwitchState" />
            <input type="number" class="form-input" v-model="time" placeholder="Time in minutes" />
            <br />
            <div class="d-flex btn-group">
                <button @click="sendStart" class="btn btn-primary"
                    :disabled="!isValidMac || !(selectedInterface && selectedInterface.mode != 'capture')">
                    Start
                </button>
                <button @click="sendStop" :disabled="!(selectedInterface && selectedInterface.mode == 'capture')"
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
            time: null,
            isIfFetched: false,
            switchState: false,
            selectedMac: "",
        };
    },
    created() {
        this.$store.dispatch("fetchInterfaces").then(() => {
            this.selectedInterface = this.interfaces.find(iface => iface.mode === 'capture') || this.interfaces.find(iface => iface.mode === 'up');
            this.isIfFetched = true;
        })
    },
    watch: {
        selectedInterface() {
            this.switchState = this.selectedInterface?.deauth === 'true' ? true : false;
        }
    },
    computed: {
        ...mapState(["interfaces"]),
        initialSwitchState() {
            return this.selectedInterface?.deauth;
        },
        isValidMac() {
            const macRegex = /^$|^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
            return macRegex.test(this.selectedMac);
        }
    },
    methods: {
        sendStart() {
            const jsonData = {
                action: "capture",
                time: this.time < 0 ? 0 : this.time,
                target: this.selectedMac,
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
                identifier: this.selectedInterface.name,
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
