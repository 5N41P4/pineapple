<template>
    <div class="card text-light">
        <div class="card-body">
            <h4 class="card-title">Recon</h4>
            <h5 class="card-title">Interface</h5>
            <div class="row row-sm2">
                <select class="col form-dropdown" v-model="selectedInterface" id="interface">
                    <option v-for="iface in interfaces" :key="iface" :value="iface"
                        :disabled="iface.mode !== 'up' && iface.mode !== 'recon'">
                        {{ iface.name }}
                    </option>
                </select>
            </div>
            <br />
            <SwitchButton v-if="isIfFetched && selectedInterface != null" @switchStateChanged="handleSwitchChanged"
                label="Deauth" :initialSwitchState="initialSwitchState" />
            <input type="number" class="form-input" v-model="time" placeholder="Time in minutes" />
            <br />
            <br />
            <div class="d-flex btn-group">
                <button id="start" @click="sendStart"
                    :disabled="!(selectedInterface && selectedInterface.mode != 'recon')" class="btn btn-primary">
                    Start
                </button>
                <button id="stop" @click="sendStop"
                    :disabled="!(selectedInterface && selectedInterface.mode == 'recon')" class="btn btn-danger">
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
        };
    },
    created() {
        this.$store.dispatch("fetchInterfaces").then(() => {
            this.selectedInterface = this.interfaces.find(iface => iface.mode === 'recon') || this.interfaces.find(iface => iface.mode === 'up');
            this.isIfFetched = true;
        });
    },
    computed: {
        ...mapState(["interfaces"]),
        initialSwitchState() {
            return this.selectedInterface?.deauth;
        }
    },
    watch: {
        selectedInterface() {
            this.switchState = this.selectedInterface?.deauth === 'true' ? true : false;
        }
    },
    methods: {
        sendStart() {
            const jsonData = {
                action: "recon",
                time: this.time < 0 ? 0 : this.time,
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
            // console.log(jsonData)
            location.reload();
        },
        sendStop() {
            const jsonData = {
                action: "stop",
                deauth: false,
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
            location.reload()
        },
        handleSwitchChanged(newVal) {
            this.switchState = newVal;
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
