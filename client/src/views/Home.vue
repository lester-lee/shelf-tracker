<template>
  <main id="ShelfApp">
    <ul id="ShelvingWrapper">
      <Shelving v-for="s in shelving" :key="s.shelving_id" :shelving="s" />
    </ul>
    <Searchbar />
  </main>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Shelving from "@/components/Shelving";
import Searchbar from "@/components/Searchbar";

export default {
  name: "Home",
  components: {
    Shelving,
    Searchbar,
  },
  computed: mapState(["shelving"]),
  created() {
    this.$store.dispatch("getAllShelving");
  },
};
</script>
