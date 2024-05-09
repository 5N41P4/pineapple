<template>
  <div class="card text-light">
    <div class="card-body">
      <h5 class="card-title">Files</h5>
      <div class="row">
        <select class="col form-dropdown" v-model="selectedFile" id="file">
          <option v-for="file in files" :key="file" :value="file">
            {{ file }}
          </option>
        </select>
      </div>
      <br>
      <div class="d-flex btn-group">
        <button @click="downloadFile" :disabled="!selectedFile" class="btn btn-primary">
          Download
        </button>
        <DeleteButton :disabled="!selectedFile" :apiEndpoint="getApiEndpoint()" :itemID="getSelectedFile()" />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteButton from "@/components/atomic/DeleteButton.vue";

export default {
  data() {
    return {
      files: [],
      selectedFile: null,
      apiEndpoint: "/api/captures"
    };
  },
  created() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      try {
        const response = await fetch(this.getApiEndpoint());
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
    getApiEndpoint() {
      return this.apiEndpoint
    },
    getSelectedFile() {
      return this.selectedFile
    }
  },
  components: {
    DeleteButton
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
}
</style>
