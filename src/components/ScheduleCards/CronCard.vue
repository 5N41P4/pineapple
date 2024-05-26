<template>
    <div class="card text-light">
        <div class="card-body">
            <h4 class="card-title">Schedule</h4>

            <h5 class="card-title">Interface</h5>
            <select class="form-dropdown" v-model="selectedInterface" id="interface">
                <option disabled value="">Please select an interface</option>
                <option v-for="iface in interfaces" :key="iface" :value="iface">
                    {{ iface.name }}
                </option>
            </select>

            <h5 class="card-title">Action</h5>
            <select class="w-50" v-model="action">
                <option disabled value="">Please select an action</option>
                <option value="capture">Capture</option>
            </select>
            <br />
            <input class="w-50" type="number form-input" v-model="time" placeholder="Time in minutes">
            <SwitchButton @switchStateChanged="switchState = !switchState" :initialSwitchState="false" label="DeAuth" />
            <br />

            <h5 class="card-title">Hour of the Day</h5>
            <div class="hours">
                <label v-for="hour in hours" :key="hour" class="hour">
                    <input type="checkbox" :value="hour" v-model="selectedHours" />
                    {{ hour }}
                </label>
            </div>

            <h5 class="card-title">Day of the Week</h5>
            <div class="days">
                <label v-for="day in days" :key="day" class="day">
                    <input type="checkbox" :value="day" v-model="selectedDays" />
                    {{ day }}
                </label>
            </div>

            <p>Cron String: {{ cronString }}</p>
            <button class="btn btn-primary" @click="sendJob()"
                :disabled="!isValidTarget || (selectedHours.length <= 0 || selectedDays.length <= 0)">Schedule</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import SwitchButton from "@/components/atomic/SwitchButton.vue";

export default {
    data() {
        return {
            selectedInterface: null,
            cronString: '',
            action: '',
            switchState: false,
            time: null,
            hours: Array.from({ length: 24 }, (_, i) => i), // Array of hours from 0 to 23
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Array of days
            selectedHours: [],
            selectedDays: [],
        };
    },
    created() {
        this.$store.dispatch("fetchInterfaces");
    },
    watch: {
        selectedHours: {
            handler() {
                this.generateCronString();
            },
            deep: true,
        },
        selectedDays: {
            handler() {
                this.generateCronString();
            },
            deep: true,
        },
    },
    computed: {
        ...mapState(["interfaces", "target"]),

    },
    methods: {
        generateCronString() {
            const selectedIndexes = this.selectedDays.map(day => this.days.indexOf(day));
            const hours = this.selectedHours.length > 0 ? this.selectedHours.join(',') : '*';
            const days = selectedIndexes.length > 0 ? selectedIndexes.join(',') : '*';
            this.cronString = `0 ${hours} * * ${days}`;
        },
        sendJob() {
            const jsonData = {
                id: 0,
                cron: this.cronString,
                cmd: {
                    interface: this.selectedInterface.name,
                    action: this.action,
                    time: this.time !== null && Number.isInteger(this.time) ? this.time : (this.time !== null ? parseInt(this.time) : 0),
                    target: {
                        bssid: this.target && this.target.accessPoint && this.target.accessPoint.bssid !== null ? this.target.accessPoint.bssid : "",
                        essid: this.target && this.target.accessPoint && this.target.accessPoint.essid !== null ? this.target.accessPoint.essid : "",
                        station: this.target && this.target.client && this.target.client.station !== null ? this.target.client.station : "",
                        channel: this.target && this.target.accessPoint && this.target.accessPoint.channel !== null ? this.target.accessPoint.channel.toString() : "",
                        privacy: this.target && this.target.accessPoint && this.target.accessPoint.privacy !== null ? this.target.accessPoint.privacy : "",
                    },
                    deauth: this.switchState,
                },
            };
            fetch("/api/schedule", {
                method: "PUT",
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
        isValidTarget() {
            if (!this.target || (this.target.BSSID && this.target.channel)) {
                return true;
            }
            return false;
        },
    },
    components: {
        SwitchButton,
    },
};
</script>

<style scoped>
.card {
    background-color: #434d49;
}

.hours,
.days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.hour,
.day {
    flex: 1 0 21%;
    /* This will create a 5-column layout */
    margin: 5px;
    text-align: center;
}
</style>