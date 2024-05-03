<template>
  <div class="card text-light">
    <div class="card-body">
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
      <SwitchButton @switchStateChanged="handleSwitchChanged" label="DeAuth" />
      <br />
      <div class="row row-sm2">
        <button id="start" @click="sendStart" v-show="selectedInterface && selectedInterface.mode != 'recon'"
          class="btn btn-primary">
          Start
        </button>
      </div>
      <div class="row row-sm2">
        <button id="stop" @click="sendStop" v-show="selectedInterface && selectedInterface.mode == 'recon'"
          class="btn btn-danger">
          Stop
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchButton from "../atomic/SwitchButton.vue"
export default {
  data() {
    return {
      interfaces: [],
      selectedInterface: null,
    };
  },
  created() {
    this.fetchInterfaces();
  },
  methods: {
    async fetchInterfaces() {
            try {
              const response = await fetch("/api/interfaces");
              const data = await response.json();
    //  this.interfaces = [ { name: "wlan0", mode: "inet" }, { name: "wlan1", mode: "up" }, { name: "wlan2", mode: "recon" },];
              this.interfaces = data;
           } catch (error) {
              console.error("Error fetching interfaces:", error);
            }
    },
    sendStart() {
      const jsonData = {
        identifier: this.selectedInterface.name,
        action: "recon",
      };
      fetch("/api/interfaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Data sent successfully:", data))
        .catch((error) => console.error("Error sending data:", error));
    },
    sendStop() {
      const jsonData = {
        identifier: this.selectedInterface.name,
        action: "stop",
      };
      fetch("/api/interfaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Data sent successfully:", data))
        .catch((error) => console.error("Error sending data:", error));
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
