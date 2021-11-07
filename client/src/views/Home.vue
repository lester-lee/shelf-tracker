<template>
  <main id="ShelfApp">
    <ul id="ShelvingWrapper">
      <Shelving v-for="s in shelving" :key="s.shelving_id" :shelving="s" />
      <li class="Shelving">
        <h2 class="ShelvingLabel">
          <input
            class="ShelvingAdd"
            placeholder="+ Add Shelving"
            v-model="newShelving"
            v-on:keypress.enter="onSubmitNewShelving"
          />
        </h2>
      </li>
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
  data() {
    return {
      newShelving: "",
    };
  },
  computed: {
    ...mapState(["shelving"]),
  },
  created() {
    this.$ShelfService.getAllShelving(this.$store);
  },
  methods: {
    onSubmitNewShelving() {
      // Prevent from submitting if new shelving is blank
      if (!this.newShelving) {
        console.info("New shelving cannot be blank.");
        return;
      }
      // Add shelving and reset to blank
      this.$ShelfService.addShelving(this.$store, { label: this.newShelving });
      this.newShelving = "";
    },
  },
};
</script>

<style lang="scss">
#ShelfApp {
  margin-bottom: 80px;
}
</style>
