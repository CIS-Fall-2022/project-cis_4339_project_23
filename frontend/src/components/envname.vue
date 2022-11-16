<template>
  <main>
    <div>
      <h1 v-for="info in queryData" :key="info._id">{{info.orgName}}</h1>
    </div>
  </main>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      queryData: [],
      orgName: "",
    }
  },
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + `/primarydata/info`;
   
    axios.get(apiURL).then((resp) => {
      this.queryData = resp.data;
    });
  }
};
</script>
