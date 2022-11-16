<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Clients Served in Last 2 Months</h1>
    </div>
    <!-- Display Found Data -->
    <div id="_divide">
            <AttendeesChartVue
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendees"
            ></AttendeesChartVue>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
    </div>
    <div class="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-10">
      <div class="flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead id="_container" class="text-xl">
            <tr>
              <th class="p-1 text-left">Event Name</th>
              <th class="p-5 text-center">Event Date</th>
              <th class="p-5 text-center">Number Of Attendees</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-red -300">
            <tr v-for="event in queryData" :key="event._id">
              <td class="p-2 text-left">{{ event.eventName }}</td>
              <td class="p-2 text-center">{{ formattedDate(event.date) }}</td>
              <td class="p-2 text-center">{{ event.numberofattendees }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import { DateTime } from "luxon";
import axios from "axios";
import AttendeesChartVue from "./AttendeesChart.vue";

export default {
  name: 'AttendeesChart',
  components:{
    AttendeesChartVue
  },
  
  data() {
    return {
      queryData: [],
      labels: [],
      attendees: [],
      //Error checking
      loading: false,
      error: null,
      //Parameter for search to occur
      searchBy: "",
      eventName: "",
      eventDate: "",
      numberofattendees: "",
    }
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = import.meta.env.VITE_ROOT_API + `/eventdata/eventSignUp`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.eventName);
        this.attendees = response.data.map((item) => item.numberofattendees);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/eventSignUp`;
   
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    this.fetchData();
  }
}
</script>

<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
#_divide{
  padding-bottom: 50px;
}
</style>