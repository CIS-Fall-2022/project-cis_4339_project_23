<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
  </main>
</template>
<script>
export default {
  methods: {
    routePush(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
