<template>
  <div id="Filters" class="container">
    <div class="row">
      <div class="col-6">
        <Filter title="Accesspoints" apiEndpoint="/api/filter/aps" />
      </div>
      <div class="col-6">
        <Filter title="Clients" apiEndpoint="/api/filter/clients" />
      </div>
    </div>
    <div class="col">
    </div>
  </div>
</template>

<script>
import Filter from "../components/ReconCards/Filter.vue"

export default {
  components: {
    Filter
  },
};
</script>
