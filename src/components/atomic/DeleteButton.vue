<template>
  <button @click="deleteItem" class="btn btn-danger btn-sm">
    <img src="../../assets/database-x.svg" alt="Database X" />
    Delete
  </button>
</template>

<script>
export default {
  props: ['apiEndpoint', 'itemID'],
  methods: {
    deleteItem() {
      const jsonData = {
        identifier: this.itemID,
        action: "delete",
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
