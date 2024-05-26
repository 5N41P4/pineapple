<template>
    <div id="capture" class="container">
        <Target />
        <br>
        <div class="row">
            <div class="col-lg-7">
                <CaptureControl />
            </div>
            <div class="col-lg-5">
                <CaptureDownload @option-selected="fetchOption" />
            </div>
        </div>
        <br>
        <Map title="Capture Map" loadData="capture" />
        <br>
        <div class="row">
            <div class="col-lg-7">
                <AccessPoints />
            </div>
            <div class="col-lg-5">
                <Clients />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Target from "@/components/TargetCard.vue";
import CaptureControl from "@/components/CaptureCards/CaptureStart.vue"
import CaptureDownload from "@/components/CaptureCards/CaptureDownload.vue"
import AccessPoints from "@/components/CaptureCards/CaptureAP.vue";
import Clients from "@/components/CaptureCards/CaptureClient.vue";
import Map from "@/components/DataCards/ForceCard.vue"

export default {
    computed: {
        ...mapState(["capture"]),
    },
    methods: {
        fetchOption(option) {
            this.$store.dispatch("fetchCapture", option);
        },
    },
    components: {
        Target,
        Map,
        CaptureControl,
        CaptureDownload,
        AccessPoints,
        Clients,
    },
};
</script>
