<template>
  <section class="Shelving">
    <h2 class="ShelvingLabel">{{ shelving.label }}</h2>
    <ol class="ShelvingList">
      <!-- <Shelf v-for="shelf in shelves" :key="shelf.shelf_id" /> -->
    </ol>
  </section>
</template>

<script>
import Shelf from "./Shelf";

export default {
  name: "Shelving",
  props: ["shelving"],
  components: {Shelf},
};
</script>

<style></style>
