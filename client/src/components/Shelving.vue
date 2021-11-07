<template>
  <li class="Shelving">
    <h2 class="ShelvingLabel">
      {{ shelving.label }}
      <button class="ShelvingDelete" v-on:click="deleteShelving">✖</button>
    </h2>
    <ol class="ShelvingList">
      <Shelf v-for="shelf in shelves" :key="shelf.shelf_id" :shelf="shelf" />
      <li class="Shelf">
        <h2 class="ShelfLabel">
          <input
            class="ShelfAdd"
            placeholder="+ Add Shelf"
            v-model="newShelf"
            v-on:keypress.enter="onSubmitNewShelf"
          />
        </h2>
      </li>
    </ol>
  </li>
</template>

<script>
import Shelf from "./Shelf";

export default {
  name: "Shelving",
  props: ["shelving"],
  components: { Shelf },
  data() {
    return {
      newShelf: "",
    };
  },
  computed: {
    shelves() {
      const shelvingId = this.$props.shelving.shelving_id;
      return this.$store.state.shelves[shelvingId];
    },
  },
  methods: {
    onSubmitNewShelf() {
      if (!this.newShelf) {
        console.info("New shelf cannot be blank.");
        return;
      }
      const shelvingId = this.$props.shelving.shelving_id;
      this.$ShelfService.addShelf(this.$store, {
        label: this.newShelf,
        shelvingId,
      });
      this.newShelf = "";
    },
    deleteShelving() {
      const shelvingId = this.$props.shelving.shelving_id;
      this.$ShelfService.deleteShelving(this.$store, { shelvingId });
    },
  },
};
</script>

<style lang="scss">
.Shelving {
  border: 2px solid #333;
  overflow: auto;
  max-width: 80vw;
  margin: 0 auto;
  &Label {
    border-bottom: 2px solid #333;
    background-color: #333;
    color: #fff;
  }
}
</style>
