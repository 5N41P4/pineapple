<template>
  <div id="capture" class="container">
    <div class="row">
      <div class="col-lg-7">
        <CaptureControl />
      </div>
      <div class="col-lg-5">
        <CaptureDownload />
      </div>
    </div>
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
import CaptureControl from "@/components/CaptureCards/CaptureStart.vue"
import CaptureDownload from "@/components/CaptureCards/CaptureDownload.vue"
import AccessPoints from "@/components/ReconCards/AccessPoints.vue";
import Clients from "@/components/ReconCards/Clients.vue";

export default {
  components: {
    CaptureControl,
    CaptureDownload,
    AccessPoints,
    Clients,
  },
};
</script>
