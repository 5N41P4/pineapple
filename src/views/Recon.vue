<template>
  <div id="recon" class="container">
    <div class="row">
      <div class="col-lg-6">
        <ReconControl />
      </div>
      <div class="col-lg-6">
        <SecChart />
      </div>
    </div>
    <br>
    <Map title="Recon Map" loadData="recon"/>
    <br>
    <div class="row">
      <div class="col-lg-7" >
        <AccessPoints />
      </div>
      <div class="col-lg-5">
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
import Map from "@/components/DataCards/ForceCard.vue"

export default {
  components: {
    Map,
    ReconControl,
    AccessPoints,
    Clients,
    SecChart,
  },
};
</script>
