<template>
  <div id="capture" class="container">
    <div class="row">
      <div class="col-6">
        <CaptureControl />
      </div>
      <div class="col-6">
        <CaptureDownload />
      </div>
    </div>
  </div>
</template>

<script>
import CaptureControl from "../components/CaptureCards/CaptureStart.vue"
import CaptureDownload from "../components/CaptureCards/CaptureDownload.vue"

export default {
  components: {
    CaptureControl,
    CaptureDownload,
  },
};
</script>
