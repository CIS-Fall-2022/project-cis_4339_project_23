<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js'
//we have to register the registerables with Chart object
Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  //establish Chart object af ter mounting the component
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendees",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
            y: {
                min: 0
            }
        }
      }
    });
  },
};
</script>