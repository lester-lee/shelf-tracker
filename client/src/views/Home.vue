<template>
  <main id="ShelfApp" :class="this.editMode ? '--Edit' : ''">
    <ul id="ShelvingWrapper">
      <Shelving v-for="s in shelving" :key="s.shelving_id" :shelving="s" />
      <li class="Shelving ShelvingAdd">
        <h2 class="ShelvingLabel">
          <input
            placeholder="+ Add Shelving"
            type="text"
            v-model="newShelving"
            @keypress.enter="onSubmitNewShelving"
          />
        </h2>
      </li>
    </ul>
    <footer>
      <Searchbar />
      <button @click="toggleEditMode">🖉</button>
    </footer>
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
      editMode: false,
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
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style lang="scss">
#ShelfApp {
  margin-bottom: 80px;
}
footer {
  width: 100%;
  height: 50px;

  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: $--greyLight-1;
}
</style>
