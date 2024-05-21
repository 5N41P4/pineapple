<template>
  <button @click="refreshList" class="btn btn-primary btn-sm">
    <img src="../../assets/bootstrap-reboot.svg" alt="Reset" />
    Refresh
  </button>
</template>

<script>
export default {
  props: ['apiEndpoint'],
  methods: {
    refreshList() {
      const jsonData = {
        action: "refresh",
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
}
</script>
