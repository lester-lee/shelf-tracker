<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Shelving v-for="s in shelving" :key="s.shelving_id" :shelving="s" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import HelloWorld from "@/components/HelloWorld";
import Shelving from "@/components/Shelving";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Shelving,
  },
  computed: mapState(["shelving"]),
  created() {
    this.$store.dispatch("getAllShelving");
  },
};
</script>
