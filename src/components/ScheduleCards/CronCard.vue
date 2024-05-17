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
            <select v-model="action">
                <option disabled value="">Please select an action</option>
                <option value="capture">Capture</option>
            </select>

            <br />
            <input type="text form-input" v-model="target" placeholder="Target" />
            <br />
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
                :disabled="!isValidMac || (selectedHours.length <= 0 || selectedDays.length <= 0)">Schedule</button>
        </div>
    </div>
</template>

<script>
import SwitchButton from "@/components/atomic/SwitchButton.vue";

export default {
    data() {
        return {
            selectedInterface: null,
            cronString: '',
            action: '',
            target: '',
            switchState: false,
            interfaces: [],
            hours: Array.from({ length: 24 }, (_, i) => i), // Array of hours from 0 to 23
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Array of days
            selectedHours: [],
            selectedDays: [],
        };
    },
    created() {
        this.fetchInterfaces();
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
        isValidMac() {
            const macRegex = /^$|^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
            return macRegex.test(this.target);
        }
    },
    methods: {
        async fetchInterfaces() {
            try {
              const response = await fetch("/api/interfaces");
              const data = await response.json();
              this.interfaces = data;
            } catch (error) {
              console.error("Error fetching interfaces:", error);
            }
            // this.interfaces = [{ name: "wlan0", mode: "inet", deauth: "false" }, { name: "wlan1", mode: "up", deauth: "false" }, { name: "wlan2", mode: "recon", deauth: "true" }];
        },
        generateCronString() {
            const selectedIndexes = this.selectedDays.map(day => this.days.indexOf(day));
            const hours = this.selectedHours.length > 0 ? this.selectedHours.join(',') : '*';
            const days = selectedIndexes.length > 0 ? this.selectedDays.join(',') : '*';
            this.cronString = `0 ${hours} * * ${days}`;
        },
        sendJob() {
            const jsonData = {
                id: 0,
                cron: this.cronString,
                action: {
                    identifier: this.selectedInterface.name,
                    action: this.action,
                    target: "",
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