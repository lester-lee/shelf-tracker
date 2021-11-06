<template>
  <li class="Shelf">
    <h3 class="ShelfLabel">{{ shelf.label }}</h3>
    <ul class="ShelfList">
      <Item v-for="item in items" :key="item.item_id" :item="item" />
    </ul>
  </li>
</template>

<script>
import ShelfService from "@/services/ShelfService";
import Item from "./Item";

export default {
  name: "Shelf",
  props: ["shelf"],
  components: { Item },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    getItems() {
      const shelf = this.$props.shelf;
      console.log(`Get all items from shelf ${shelf.label}#${shelf.shelf_id}`);
      ShelfService.getItemsByShelf(shelf.shelf_id)
        .then((response) => (this.items = response.data))
        .catch((e) => console.log(e));
    },
  },
  created() {
    this.getItems();
  },
};
</script>

<style></style>
