<template>
  <div id="recon" class="container">
    <div class="row">
      <div class="col-6">
        <ReconControl />
      </div>
      <div class="col-6">
        <SecChart />
      </div>
    </div>
    <br>
    <div class="row">
      <div class="col-7" >
        <AccessPoints />
      </div>
      <div class="col-5">
        <Clients />
      </div>
    </div>
  </div>
</template>

<script>
import ReconControl from "@/components/ReconCards/ReconStart.vue"
import AccessPoints from "@/components/ReconCards/AccessPoints.vue"
import Clients from "@/components/ReconCards/Clients.vue"
import SecChart from "@/components/ReconCards/SecChart.vue"
import CaptureControl from "@/components/CaptureCards/CaptureStart.vue"
import CaptureDownload from "@/components/CaptureCards/CaptureDownload.vue"

export default {
  components: {
    ReconControl,
    AccessPoints,
    Clients,
    SecChart,
    CaptureControl,
    CaptureDownload,
  },
};
</script>
