<template>
  <li class="Shelf">
    <h3 class="ShelfLabel">
      <span>{{ shelf.label }}</span>
      <button class="ShelfDelete" v-on:click="deleteShelf">✖</button>
    </h3>
    <ul class="ShelfList">
      <Item v-for="item in items" :key="item.item_id" :item="item" />
      <li class="Item">
        <input
          class="ItemAdd"
          placeholder="+ Add Item"
          v-model="newItem"
          v-on:keypress.enter="onSubmitNewItem"
        />
      </li>
    </ul>
  </li>
</template>

<script>
import Item from "./Item";

export default {
  name: "Shelf",
  props: ["shelf"],
  components: { Item },
  data() {
    return {
      newItem: "",
    };
  },
  computed: {
    items() {
      const shelfId = this.$props.shelf.shelf_id;
      return this.$store.state.items[shelfId];
    },
  },
  methods: {
    onSubmitNewItem() {
      // Prevent from submitting if new item is blank
      if (!this.newItem) {
        console.info("New item cannot be blank.");
        return;
      }
      // Add item and reset to blank
      const shelfId = this.$props.shelf.shelf_id;
      this.$ShelfService.addItem(this.$store, { label: this.newItem, shelfId });
      this.newItem = "";
    },
    deleteShelf() {
      const shelfId = this.$props.shelf.shelf_id;
      this.$ShelfService.deleteShelf(this.$store, { shelfId });
    },
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
