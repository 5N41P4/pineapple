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
              <button type="button" class="btn btn-light btn-sm" @click="toggleDropdown(ap.bssid)">...</button>
              <div v-if="activeDropdown === ap.bssid" class="custom-dropdown-menu">
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
import RefreshButton from "@/components/atomic/RefreshButton.vue"
import DeleteButton from "@/components/atomic/DeleteButton.vue"
import ResetButton from "@/components/atomic/ResetButton.vue"
import AddApButton from "@/components/atomic/AddButton.vue"
export default {
  data() {
    return {
      accesspoints: [],
      activeDropdown: null,
      apiEndpoint: "/api/accesspoints",
      filterEndpoint: "/api/filter/aps"
    };
  },
  created() {
    this.fetchAccesspoints();
    this.updateTimer();
  },
  methods: {
    toggleDropdown(bssid) {
      this.activeDropdown = this.activeDropdown === bssid ? null : bssid;
    },
    getApiEndpoint() {
      return this.apiEndpoint;
    },
    getFilterEndpoint() {
      return this.filterEndpoint;
    },
    async fetchAccesspoints() {
      try {
        const response = await fetch(
          this.apiEndpoint,
        );
        const data = await response.json();
        // this.accesspoints = [{ "essid": "xep-27452", "bssid": "A4:CE:DA:87:4D:50" }, { "essid": "", "bssid": "9A:E0:39:69:1C:B9" }, { "essid": "", "bssid": "9A:E0:39:69:1C:BB" }, { "essid": "Top_5G", "bssid": "50:E0:39:69:1C:BE" }, { "essid": "", "bssid": "00:00:00:00:00:00" }, { "essid": "2Boys1Router", "bssid": "A0:B5:49:98:E5:48" }, { "essid": "xep-27452", "bssid": "A4:CE:DA:87:4D:58" }, { "essid": "twifi.ch - 0F8D", "bssid": "60:AA:EF:61:0F:8D" }, { "essid": "", "bssid": "60:AA:EF:61:0F:91" }, { "essid": "blablabla", "bssid": "F0:99:BF:0D:E5:9E" }, { "essid": "9S 2.4 GHz", "bssid": "A4:CE:DA:A3:43:28" }, { "essid": "FRITZ!Box 4040 LN", "bssid": "E0:28:6D:AB:BD:D1" }, { "essid": "blablabla", "bssid": "F0:99:BF:0D:E5:9F" }, { "essid": "twifi.ch - 0F8D", "bssid": "60:AA:EF:61:0F:92" }, { "essid": "", "bssid": "00:25:00:FF:94:73" }, { "essid": "", "bssid": "60:AA:EF:61:0F:94" }, { "essid": "Sunrise_5GHz_22F9D9", "bssid": "F8:08:4F:22:F9:E2" }, { "essid": "FRITZ!Box 4040 LN", "bssid": "E0:28:6D:AB:BD:D2" }, { "essid": "Mont Blanc", "bssid": "6C:FF:CE:EC:15:94" }, { "essid": "Sunrise_TV_EC1590", "bssid": "66:FF:CE:EC:15:94" }, { "essid": "", "bssid": "6E:99:61:09:5B:97" }, { "essid": "2Boys1Router", "bssid": "A0:B5:49:98:E5:40" }, { "essid": "9S", "bssid": "A4:CE:DA:A3:43:20" }, { "essid": "ygr-36486", "bssid": "A4:CE:DA:90:2F:30" }, { "essid": "FibreBox_X6-092297", "bssid": "6C:99:61:09:22:95" }, { "essid": "", "bssid": "6E:99:61:09:22:97" }, { "essid": "Sunrise_Wi-Fi_8BF260", "bssid": "B0:FC:88:8B:F2:64" }, { "essid": "Sunrise_TV_8BF260", "bssid": "A6:FC:88:8B:F2:64" }, { "essid": "nua-67352", "bssid": "A0:B5:49:1F:6B:D0" }, { "essid": "FibreBox_X6-095B97", "bssid": "6C:99:61:09:5B:95" }, { "essid": "FibreBox_X6-095B97", "bssid": "96:3C:96:DC:93:CC" }, { "essid": "", "bssid": "96:3C:96:DC:93:CE" }, { "essid": "yallo_7201984", "bssid": "C4:EB:43:11:F2:F3" }, { "essid": "Sunrise_9191302", "bssid": "C4:EB:43:1F:7A:43" }, { "essid": "FRITZ!Box 5530 NA", "bssid": "3C:37:12:F5:D6:7A" }].sort((a, b) => a.essid.localeCompare(b.essid));
        if (data.length > 0) {
          this.accesspoints = data.sort((a, b) => {
            if (a.essid === '' && b.essid != '') return 1;
            if (b.essid === '' && a.essid != '') return -1;
            a.essid.localeCompare(b.essid);
          });
       } else {
        this.accesspoints = [];
       }
      } catch (error) {
        console.error("Error fetching accesspoints:", error);
      }
    },
    updateTimer() {
      setInterval(() => {
        this.fetchAccesspoints();
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
