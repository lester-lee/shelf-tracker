<template>
  <li class="Shelving">
    <h2 class="ShelvingLabel">{{ shelving.label }}</h2>
    <ol class="ShelvingList">
      <Shelf v-for="shelf in shelves" :key="shelf.shelf_id" :shelf="shelf" />
    </ol>
  </li>
</template>

<script>
import Shelf from "./Shelf";

export default {
  name: "Shelving",
  props: ["shelving"],
  components: { Shelf },
  computed: {
    shelves() {
      const shelvingId = this.$props.shelving.shelving_id;
      return this.$store.state.shelves[shelvingId];
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
