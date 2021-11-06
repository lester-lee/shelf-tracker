<template>
  <li class="Shelving">
    <h2 class="ShelvingLabel">{{ shelving.label }}</h2>
    <ol class="ShelvingList">
      <Shelf v-for="shelf in shelves" :key="shelf.shelf_id" :shelf="shelf" />
    </ol>
  </li>
</template>

<script>
import ShelfService from "@/services/ShelfService";
import Shelf from "./Shelf";

export default {
  name: "Shelving",
  props: ["shelving"],
  components: { Shelf },
  data() {
    return {
      shelves: [],
    };
  },
  methods: {
    getShelves() {
      const shelving = this.$props.shelving;
      console.log(
        `Get all shelves from shelving ${shelving.label}#${shelving.shelving_id}`
      );
      ShelfService.getShelvesByShelving(shelving.shelving_id)
        .then((response) => (this.shelves = response.data))
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getShelves();
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
