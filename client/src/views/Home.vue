<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
const ShelfService = require("@/services/ShelfService");
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created() {
    ShelfService.getAllItems()
      .then(response => response.data)
      .then(json => console.log('json :>> ', json))
  }
};
</script>
