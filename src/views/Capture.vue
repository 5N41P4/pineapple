<template>
    <div id="capture" class="container">
        <div class="row">
            <div class="col-lg-7">
                <CaptureControl />
            </div>
            <div class="col-lg-5">
                <CaptureDownload @option-selected="fetchAPI" />
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-lg-7">
                <AccessPoints :accesspoints="accesspoints"/>
            </div>
            <div class="col-lg-5">
                <Clients :clients="clients"/>
            </div>
        </div>
    </div>
</template>

<script>
import CaptureControl from "@/components/CaptureCards/CaptureStart.vue"
import CaptureDownload from "@/components/CaptureCards/CaptureDownload.vue"
import AccessPoints from "@/components/CaptureCards/CaptureAP.vue";
import Clients from "@/components/CaptureCards/CaptureClient.vue";

export default {
    data() {
        return {
            accesspoints: [],
            clients: [],
        }
    },
    methods: {
        async fetchAPI(option) {
            try {
                const response = await fetch(
                    "/api/capture/" + option,
                );
                const data = await response.json();
                if (data.accesspoints.length > 0) {
                    this.accesspoints = data.accesspoints.sort((a, b) => {
                        if (a.essid === '' && b.essid != '') return 1;
                        if (b.essid === '' && a.essid != '') return -1;
                        a.essid.localeCompare(b.essid);
                    });
                } else {
                    this.accesspoints = [];
                }
                if (data.clients.length > 0) {
                    this.clients = data.clients;
                } else {
                    this.clients = [];
                }
            } catch (error) {
                console.error("Error fetching api", error);
            }
            // this.accesspoints = [{ "essid": "xep-27452", "bssid": "A4:CE:DA:87:4D:50" }, { "essid": "", "bssid": "9A:E0:39:69:1C:B9" }, { "essid": "", "bssid": "9A:E0:39:69:1C:BB" }, { "essid": "Top_5G", "bssid": "50:E0:39:69:1C:BE" }, { "essid": "", "bssid": "00:00:00:00:00:00" }, { "essid": "2Boys1Router", "bssid": "A0:B5:49:98:E5:48" }, { "essid": "xep-27452", "bssid": "A4:CE:DA:87:4D:58" }, { "essid": "twifi.ch - 0F8D", "bssid": "60:AA:EF:61:0F:8D" }, { "essid": "", "bssid": "60:AA:EF:61:0F:91" }, { "essid": "blablabla", "bssid": "F0:99:BF:0D:E5:9E" }, { "essid": "9S 2.4 GHz", "bssid": "A4:CE:DA:A3:43:28" }, { "essid": "FRITZ!Box 4040 LN", "bssid": "E0:28:6D:AB:BD:D1" }, { "essid": "blablabla", "bssid": "F0:99:BF:0D:E5:9F" }, { "essid": "twifi.ch - 0F8D", "bssid": "60:AA:EF:61:0F:92" }, { "essid": "", "bssid": "00:25:00:FF:94:73" }, { "essid": "", "bssid": "60:AA:EF:61:0F:94" }, { "essid": "Sunrise_5GHz_22F9D9", "bssid": "F8:08:4F:22:F9:E2" }, { "essid": "FRITZ!Box 4040 LN", "bssid": "E0:28:6D:AB:BD:D2" }, { "essid": "Mont Blanc", "bssid": "6C:FF:CE:EC:15:94" }, { "essid": "Sunrise_TV_EC1590", "bssid": "66:FF:CE:EC:15:94" }, { "essid": "", "bssid": "6E:99:61:09:5B:97" }, { "essid": "2Boys1Router", "bssid": "A0:B5:49:98:E5:40" }, { "essid": "9S", "bssid": "A4:CE:DA:A3:43:20" }, { "essid": "ygr-36486", "bssid": "A4:CE:DA:90:2F:30" }, { "essid": "FibreBox_X6-092297", "bssid": "6C:99:61:09:22:95" }, { "essid": "", "bssid": "6E:99:61:09:22:97" }, { "essid": "Sunrise_Wi-Fi_8BF260", "bssid": "B0:FC:88:8B:F2:64" }, { "essid": "Sunrise_TV_8BF260", "bssid": "A6:FC:88:8B:F2:64" }, { "essid": "nua-67352", "bssid": "A0:B5:49:1F:6B:D0" }, { "essid": "FibreBox_X6-095B97", "bssid": "6C:99:61:09:5B:95" }, { "essid": "FibreBox_X6-095B97", "bssid": "96:3C:96:DC:93:CC" }, { "essid": "", "bssid": "96:3C:96:DC:93:CE" }, { "essid": "yallo_7201984", "bssid": "C4:EB:43:11:F2:F3" }, { "essid": "Sunrise_9191302", "bssid": "C4:EB:43:1F:7A:43" }, { "essid": "FRITZ!Box 5530 NA", "bssid": "3C:37:12:F5:D6:7A" }].sort((a, b) => a.essid.localeCompare(b.essid));
            //this.clients = [{ "bssid": "00:00:00:00:00:00", "station": "DC:A6:32:51:5E:72" }, { "bssid": "50:E0:39:69:1C:BE", "station": "1C:91:80:D1:D8:BE" }, { "bssid": "50:E0:39:69:1C:BE", "station": "3E:A9:BA:09:11:09" }, { "bssid": "60:AA:EF:61:0F:92", "station": "A8:51:AB:90:32:CB" }];
        },
    },
    components: {
        CaptureControl,
        CaptureDownload,
        AccessPoints,
        Clients,
    },
};
</script>
