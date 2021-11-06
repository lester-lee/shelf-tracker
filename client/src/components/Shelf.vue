<template>
  <li class="Shelf">
    <h3 class="ShelfLabel">{{ shelf.label }}</h3>
    <ul class="ShelfList">
      <Item v-for="item in items" :key="item.item_id" :item="item" />
      <li class="Item">
        <input class="NewItem" placeholder="New Item" v-model="newItem" />
      </li>
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
  computed: {
    newItem: {
      get() {
        const shelfId = this.$props.shelf.shelf_id;
        return this.$store.state.newItems[shelfId];
      },
      set(newItem) {
        this.$store.commit("updateNewItem", {
          shelfId: this.$props.shelf.shelf_id,
          newItem,
        });
      },
    },
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

<style lang="scss">
.Shelf {
  border-bottom: 1px solid #333;
  padding: 0;
  margin: 0;
  &Label {
    border-bottom: 1px solid #333;
    background: #888;
    color: #fff;
  }
}
</style>
