<template>
  <div class="card text-light">
    <div class="card-body">
      <h5 class="card-title">Download</h5>
      <div class="row row-sm2">
        <select class="col form-dropdown" v-model="selectedFile" id="file">
          <option v-for="file in files" :key="file" :value="file">
            {{ file }}
          </option>
        </select>
      </div>
      <div class="row row-sm2">
        <button @click="downloadFile" :disabled="!selectedFile" class="btn btn-primary">
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      selectedFile: null,
    };
  },
  created() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await fetch("/api/captures");
        const data = await response.json();
        this.files = data.files;
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    //      this.interfaces = [ { name: "wlan0", mode: "inet" }, { name: "wlan1", mode: "up" }, { name: "wlan2", mode: "recon" },];
    },
    async downloadFile() {
      const response = await fetch("/captures/" + this.selectedFile + "/-01.cap");
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = this.selectedFile + ".cap";
      link.click();
      URL.revokeObjectURL(link.href); // Revoke object URL after download
    },
  }
};
</script>

<style scoped>
.card {
  background-color: #434d49;
}

.btn-primary {
  background-color: #36bf8d;
  border-color: #36bf8d;
  margin-top: 0.5rem;
}
</style>
