<template>
  <div class="card text-light">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">{{ title }}</h5>
        <SwitchButton v-if="isWhitelistFetched" @switchStateChanged="handleSwitchChanged" label="Whitelist"
          :initialSwitchState="initialSwitchState" />
      </div>
      <br />
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">MAC</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody v-if="filter.identifier && filter.identifier.length > 0">
          <tr v-for="id in filter.identifier" :key="id">
            <td>{{ id }}</td>
            <td class="dropdown-cell">
              <button type="button" class="btn btn-light btn-sm" @click="toggleDropdown(id)">...</button>
              <div v-if="activeDropdown === id" class="custom-dropdown-menu">
                <DeleteButton :apiEndpoint="apiEndpoint" :itemID="id" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div class="d-flex justify-content-between">
        <span />
        <ResetButton :apiEndpoint="apiEndpoint" />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from "../atomic/DeleteButton.vue"
import ResetButton from "../atomic/ResetButton.vue"
import SwitchButton from "../atomic/SwitchButton.vue"
export default {
  props: ['title', 'apiEndpoint'],
  data() {
    return {
      filter: {},
      activeDropdown: null,
      isWhitelistFetched: false,
    };
  },
  computed: {
    initialSwitchState() {
      return this.filter.isWhitelist;
    }
  },
  created() {
    this.fetchAccesspoints().then(() => {
      this.switchState = this.filter.isWhitelist === 'true' ? true : false; // Assuming string value
      this.isWhitelistFetched = true;
    });
  },
  methods: {
    toggleDropdown(id) {
      this.activeDropdown = this.activeDropdown === id ? null : id;
    },
    async fetchAccesspoints() {
      try {
        const response = await fetch(
          this.apiEndpoint,
        );
        const data = await response.json();
        this.filter = data;
      } catch (error) {
        console.error("Error fetching Filter:", error);
      }
      //      this.filter = { "isWhitelist": true, "identifier": ["AP1", "AP2", "AP3"] }
      //      console.log("TestData loaded")
    },
    handleSwitchChanged(newVal) {
      const jsonData = {
        identifier: "",
        action: "switch",
      };
      fetch(this.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => console.log("Data sent successfully:", data))
        .catch((error) => console.error("Error sending data:", error));
      location.reload()
    }
  },
  components: {
    DeleteButton,
    ResetButton,
    SwitchButton
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
  margin-top: 1rem;
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
