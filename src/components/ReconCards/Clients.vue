<template>
  <div class="card text-light">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">Clients</h5>
        <div class="btn-group">
          <RefreshButton :apiEndpoint="getApiEndpoint()" />
          <ResetButton :apiEndpoint="getApiEndpoint()" />
        </div>
      </div>
      <br />
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Network</th>
            <th scope="col">Device</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="clients.length > 0">
          <tr v-for="cl in clients" :key="cl.station">
            <td>{{ cl.bssid }}</td>
            <td>{{ cl.station }}</td>
            <td class="dropdown-cell">
              <button type="button" class="btn btn-light btn-sm" @click="toggleDropdown(cl.station)">...</button>
              <div v-if="activeDropdown === cl.station" class="custom-dropdown-menu">
                <AddClButton :apiEndpoint="getFilterEndpoint()" :itemID="cl.station" />
                <DeleteButton :apiEndpoint="getApiEndpoint()" :itemID="cl.station" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import RefreshButton from "../atomic/RefreshButton.vue"
import ResetButton from "../atomic/ResetButton.vue"
import DeleteButton from "../atomic/DeleteButton.vue"
import AddClButton from "../atomic/AddButton.vue"
export default {
  data() {
    return {
      clients: [],
      activeDropdown: null,
      apiEndpoint: "/api/clients",
      filterEndpoint: "/api/filter/clients"
    };
  },
  created() {
    this.fetchClients();
    this.updateTimer();
  },
  methods: {
    getApiEndpoint() {
      return this.apiEndpoint;
    },
    getFilterEndpoint() {
      return this.filterEndpointEndpoint;
    },
    toggleDropdown(station) {
      this.activeDropdown = this.activeDropdown === station ? null : station;
    },
    async fetchClients() {
      try {
        const response = await fetch(
          this.apiEndpoint,
        );
        const data = await response.json();
        //this.clients = [{ "bssid": "00:00:00:00:00:00", "station": "DC:A6:32:51:5E:72" }, { "bssid": "50:E0:39:69:1C:BE", "station": "1C:91:80:D1:D8:BE" }, { "bssid": "50:E0:39:69:1C:BE", "station": "3E:A9:BA:09:11:09" }, { "bssid": "60:AA:EF:61:0F:92", "station": "A8:51:AB:90:32:CB" }];
        this.clients = data.sort((a, b) => a.station.localeCompare(b.station));
      } catch (error) {
        console.error("Error fetching accesspoints:", error);
      }
    },
    updateTimer() {
      setInterval(() => {
        this.fetchClients();
      }, 30000);
    },
  },
  components: {
    ResetButton,
    RefreshButton,
    DeleteButton,
    AddClButton
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
