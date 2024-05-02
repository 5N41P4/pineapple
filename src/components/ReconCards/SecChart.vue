<template>
  <div class="card mb-3 text-light">
    <div class="card-body">
      <h5 class="card-title">Securtiy Overview</h5>
      <div>
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  components: {
    Chart,
  },
  mounted: function () {
    this.fetchData();
    this.updateTimer();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('/api/security');
        const data = await response.json();
        this.renderPieChart(data);
      } catch (error) {
        console.error(error);
      }
    },
    renderPieChart(data) {
      const ctx = document.getElementById('pieChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            "WEP",
            "WPA",
            "WPA2",
            "WPA3"
          ],
          datasets: [
            {
              data: [data.wep, data.wpa, data.wpa2, data.wpa3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 150, 179, 0.5)",
                "rgba(255, 238, 136, 0.5)",
                "rgba(144, 238, 144, 0.5)"
              ],
              borderColor: "white",
              borderWidth: 1
            }
          ]
        },

      });
    },
    updateTimer() {
      setInterval(() => {
        this.fetchData();
      }, 20000);
    },
  },
};

</script>

<style scoped>
.card {
  background-color: #434D49;
}

h1 {
  text-align: center;
}
</style>
