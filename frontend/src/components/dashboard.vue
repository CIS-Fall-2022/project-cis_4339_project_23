<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <!-- Display Found Data -->
    <div class="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-10">
      <div class="flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-1 text-left">Event Name</th>
              <th class="p-5 text-center">Event Date</th>
              <th class="p-5 text-center">Number Of Attendees</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
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

export default {
  data() {
    return {
      queryData: [],
      //Parameter for search to occur
      searchBy: "",
      eventName: "",
      eventDate: "",
      numberofattendees: "",
    };
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/eventdata/eventSignUp`;
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
    window.scrollTo(0, 0);
  },
  methods: {
    formattedDate(datetimeDB) {
      return DateTime.fromISO(datetimeDB).plus({ days: 1 }).toLocaleString();
    },
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
