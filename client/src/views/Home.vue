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
import ShelfService from "@/services/ShelfService";

export default {
  name: "Home",
  components: {
    Shelving,
    Searchbar,
  },
  computed: mapState(["shelving"]),
  created() {
    ShelfService.getAllShelving(this.$store);
  },
};
</script>

<style lang="scss">
#ShelfApp{
  margin-bottom: 80px;
}
</style>