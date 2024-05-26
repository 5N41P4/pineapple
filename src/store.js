// store.js
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    target: {
      accessPoint: null,
      client: null,
    },
    interfaces: [],
    accesspoints: [],
    clients: [],
    capture: { accesspoints: [], clients: [] },
    system: {},
  },
  mutations: {
    setTarget(state, payload) {
      if (payload.accessPoint) {
        state.target.accessPoint = payload.accessPoint;
      }
      if (payload.client) {
        state.target.client = payload.client;
      }
    },
    setAccessPoints(state, accessPoints) {
      state.accesspoints = accessPoints;
    },
    setClients(state, clients) {
      state.clients = clients;
    },
    setCapture(state, capture) {
      state.capture = capture;
    },
    setInterfaces(state, interfaces) {
      state.interfaces = interfaces;
    },
    setSystem(state, system) {
      state.system = system;
    },
  },
  actions: {
    async fetchSystem({ commit }) {
      try {
        const response = await axios.get("/api/system");
        let data = response.data;

        commit("setSystem", data)
      } catch (error) {
        console.error(error);
      }
    },
    async fetchInterfaces({ commit }) {
      try {
        const response = await axios.get("/api/interfaces");
        let data = response.data;
        // let data = [ { name: "wlan0", mode: "inet", deauth: "false" }, { name: "wlan1", mode: "up" , deauth: "false"}, { name: "wlan2", mode: "recon", deauth: "true" },];

        if (!Array.isArray(data)) {
          data = [];
        }

        commit("setInterfaces", data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAccesspoints({ commit }) {
      try {
        const response = await axios.get("/api/accesspoints");
        let data = response.data;
        // let data = [{"bssid":"A0:B5:49:98:E5:48","first seen at":"2024-05-21 14:01:17","last seen at":"2024-05-21 14:02:16","channel":1,"speed":195,"privacy":"WPA2","cipher":"CCMP","auth":"PSK","power":-67,"beacons":86,"ivs":6,"lan ip":"0.0.0.0","id len":12,"essid":"2Boys1Router","key":""}]

        if (Array.isArray(data) && data.length > 0) {
          data = data.sort((a, b) => {
            if (a.essid === "" && b.essid != "") return 1;
            if (b.essid === "" && a.essid != "") return -1;
            return a.essid.localeCompare(b.essid);
          });
        } else {
          data = [];
        }

        commit("setAccessPoints", data);
      } catch (error) {
        console.error("Error fetching accesspoints:", error);
      }
    },
    async fetchClients({ commit }) {
      try {
        const response = await axios.get("/api/clients");
        let data = response.data;
        // let data = [{ "bssid": "00:00:00:00:00:00", "station": "DC:A6:32:51:5E:72", "power": -65 }, { "bssid": "50:E0:39:69:1C:BE", "station": "1C:91:80:D1:D8:BE", "power": -110 }, { "bssid": "50:E0:39:69:1C:BE", "station": "3E:A9:BA:09:11:09", "power":-55 }, { "bssid": "60:AA:EF:61:0F:92", "station": "A8:51:AB:90:32:CB", "power":-1 }]
        if (!Array.isArray(data) || data.length <= 0) {
          data = [];
        }

        commit("setClients", data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    },
    async fetchCapture({ commit }, option) {
      try {
        const response = await axios.get("/api/capture/" + option);
        let data = await response.data;
        // let data = {
        //   "accesspoints": [
        //     {
        //       "bssid": "A6:EA:37:78:9E:23",
        //       "first seen at": "2024-05-21 12:51:15",
        //       "last seen at": "2024-05-21 12:51:45",
        //       "channel": 1,
        //       "speed": 180,
        //       "privacy": "WPA2 OPN",
        //       "cipher": "CCMP",
        //       "auth": "PSK",
        //       "power": -87,
        //       "beacons": 1,
        //       "ivs": 3,
        //       "lan ip": "0.0.0.0",
        //       "id len": 9,
        //       "essid": "Redmi 13C",
        //       "key": ""
        //     }
        //   ],
        //   "clients": [
        //     {
        //       "station": "06:FC:9E:B5:51:DB",
        //       "first seen at": "2024-05-21 12:51:15",
        //       "last seen at": "2024-05-21 12:51:37",
        //       "power": -85,
        //       "packets": 22,
        //       "bssid": "A6:EA:37:78:9E:23",
        //       "probed essids": ""
        //     }
        //   ]
        // }

        console.log(data);

        if (Array.isArray(data.accesspoints) && data.accesspoints.length > 0) {
          data.accesspoints = data.accesspoints.sort((a, b) => {
            if (a.essid === "" && b.essid != "") return 1;
            if (b.essid === "" && a.essid != "") return -1;
            a.essid.localeCompare(b.essid);
          });
        } else {
          data.accesspoints = [];
        }
        if (!Array.isArray(data.clients) || data.clients.length <= 0) {
          data.clients = [];
        }
        commit("setCapture", data);
      } catch (error) {
        console.error("Error fetching api", error);
      }
    },
  },
});
