<template>
  <button @click="resetList" class="btn btn-danger btn-sm"> Reset
    <img src="../../assets/database-slash.svg" alt="Database Slash" />
  </button>
</template>

<script>
export default {
  props: ['apiEndpoint'],
  methods: {
    resetList() {
      const jsonData = {
        identifier: "",
        action: "reset",
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
