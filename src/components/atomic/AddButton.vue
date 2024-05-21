
<template>
  <button @click="addItem" class="btn btn-light btn-sm">
    <img src="../../assets/file-plus.svg" alt="File +" />
    Filter
  </button>
</template>

<script>
export default {
  props: ['apiEndpoint', 'itemID'],
  methods: {
    addItem() {
      const jsonData = {
        target: this.itemID,
        action: "add",
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
    },
  }
}
</script>
